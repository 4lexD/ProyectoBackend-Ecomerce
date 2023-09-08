import logger from "../../shared/pino/logger.js";

const errorHandler = (err,req,res,next)=>{
    if (err?.message.includes('Not Found'))
    {
        logger.error(err.stack);
        return res.status(404).json({ message: err.message });
    }
    else if (err?.name.includes('ZodError'))
    {
        logger.error(err.stack);
        return res.status(400).json({ message: err.issues });
    }
  
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
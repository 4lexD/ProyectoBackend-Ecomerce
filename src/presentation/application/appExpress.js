import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRouter from '../../presentation/routes/productsRouter.js';
import cartRouter from '../../presentation/routes/cartRouter.js';
import userRouter from '../../presentation/routes/userRouter.js';
import sessionRouter from '../../presentation/routes/sessionRouter.js';
import roleRouter from '../../presentation/routes/roleRouter.js';
import errorHandler from '../../presentation/middlewares/errorHandler.js';
import config from '../../config/config.js';
import logger from "../../shared/pino/logger.js";


const {PORT} = config;
class AppExpress{
    init(){
        this.app= express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    build(){
        this.app.use("/api/products", productRouter);
        this.app.use("/api/carts", cartRouter);
        this.app.use("/api/users", userRouter);
        this.app.use("/api/session",sessionRouter);
        this.app.use("/api/roles",roleRouter);
        this.app.use(errorHandler);
    }

    callback(){
        return this.app;
    }

    close(){
        return this.app.close();
    }

    listen(){
        return this.app.listen(PORT, ()=>{
            logger.info(`server runing on http://localhost:${PORT}`);
        });
    }
};

export default AppExpress;

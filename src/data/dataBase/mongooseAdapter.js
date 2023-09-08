import mongoose from "mongoose";
import logger from "../../shared/pino/logger.js";
logger
class MongooseAdapter{

    async init(uri){
        this.connection = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info('Connected to MongoDB');
    }

    async close(){
        await this.connection.disconnect();
    }

    async drop()
    {
      await this.connection.dropDatabase();
    }
}

export default MongooseAdapter;
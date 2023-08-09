import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRouter from '../../presentation/routes/productsRouter.js';
import cartRouter from '../../presentation/routes/cartRouter.js';
import userRouter from '../../presentation/routes/userRouter.js';
import sessionRouter from '../../presentation/routes/sessionRouter.js';
import roleRouter from '../../presentation/routes/roleRouter.js';
import errorHandler from '../../presentation/middlewares/errorHandler.js';
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUiExpress from 'swagger-ui-express'
import swaggerOptions from '../../config/swaggerConfig.js';



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
        this.app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsdoc(swaggerOptions)));
        this.app.use(errorHandler);
    }

    callback(){
        return this.app;
    }

    close(){
        return this.app.close();
    }

    listen(){
        return this.app.listen(process.env.PORT, ()=>{
            console.log(`server runing on http://localhost:${process.env.PORT}`);
        });
    }
};

export default AppExpress;

import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import DataBase from '../../config/mongoClient.js';

import productRouter from '../../presentation/routes/productsRouter.js';
import cartRouter from '../../presentation/routes/cartRouter.js';
import userRouter from '../../presentation/routes/userRouter.js';
import sessionRouter from '../../presentation/routes/sessionRouter.js';

import errorHandler from '../../presentation/middlewares/errorHandler.js';


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
        this.app.use(errorHandler);
    }

    listen(){
        return this.app.listen(process.env.PORT, ()=>{
            console.log(`server runing on http://localhost:${process.env.PORT}`);
            DataBase.connect();
        });
    }
};

export default AppExpress;

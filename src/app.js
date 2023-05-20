import express from 'express'
import 'dotenv/config';
import DataBase from './config/mongoClient.js';
import cors from 'cors'
import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './routes/userRouter.js';
import sessionRouter from './routes/sessionRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use(session({
    store:MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        mongoOptions: {useNewUrlParser:true, useUnifiedTopology:true},
        ttl:11
    }),
    secret:process.env.SECRET || 'S3cr3t' ,
    resave:false,
    saveUninitialized:false
}));
app.use("/api/users", userRouter);
app.use("/api/session",sessionRouter);

const httpServer = app.listen(port, ()=> {
    console.log(`server runing on http://localhost:${port}`);

    DataBase.connect();
}); 
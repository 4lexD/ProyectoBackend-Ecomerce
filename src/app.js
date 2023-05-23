import express from 'express'
import 'dotenv/config';
import DataBase from './config/mongoClient.js';
import cors from 'cors'
import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
import sessionRouter from './routes/sessionRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/api/session",sessionRouter);
app.use(errorHandler);

const httpServer = app.listen(port, ()=> {
    console.log(`server runing on http://localhost:${port}`);
    DataBase.connect();
}); 
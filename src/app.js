import express from 'express'
import 'dotenv/config';
import DataBase from './config/mongoClient.js';
import cors from 'cors'
import productRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const httpServer = app.listen(port, ()=> {
console.log(`server runing on http://localhost:${port}`);
DataBase.connect();
});
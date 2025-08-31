import express from "express";
import cors from "cors";
import 'dotenv/config';  

import connectCloudinary from "./config/cloudnary.js";
import DBConnect from './config/mongoDB.js';
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import CartROute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

DBConnect()
connectCloudinary()
//App config

const app = express()
const port = process.env.PORT || 5000

// middlewares

app.use(express.json());
app.use(cors()); // access the backend from any IP

// api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart' ,CartROute)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
res.send('api working')
});



app.listen(port,()=> console.log(`server is started on ${port}`));
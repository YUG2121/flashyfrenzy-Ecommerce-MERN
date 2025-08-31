import express from 'express';
import { addToCart,UpdateCart,GetUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/Auth.js';


const CartROute = express.Router()

CartROute.post('/get',authUser, GetUserCart)
CartROute.post('/add',authUser, addToCart)
CartROute.post('/update',authUser, UpdateCart)



export default CartROute
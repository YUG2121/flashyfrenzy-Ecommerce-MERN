import express from 'express';
import {PlaceOrder,PlaceOrderStripe,PlaceOrderRazorpay,allOrder,userOrder,updateStatus, VerfiyStrip} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/Auth.js'
const orderRouter = express.Router()

//admn features
orderRouter.post('/list',adminAuth,allOrder);
orderRouter.post('/status',adminAuth,updateStatus)
//payment features
orderRouter.post('/place',authUser,PlaceOrder);
orderRouter.post('/stripe',authUser,PlaceOrderStripe)
orderRouter.post('/razorpay',authUser,PlaceOrderRazorpay)

//user features

orderRouter.post('/userorders',authUser,userOrder)
//verfiy payment
orderRouter.post('/verifystripe',authUser,VerfiyStrip)


export default orderRouter
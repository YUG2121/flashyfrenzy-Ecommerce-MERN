import { response } from "express";
import orderModel from "../models/ordermodel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//globale variable
const currency = "inr";
const deliveryCharge = 10;

//gateway initliation
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order using COD method
const PlaceOrder = async (req, res, next) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // its clear the cart data
    await userModel.findByIdAndUpdate(userId, { CartData: {} });

    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// placing order using stripe
const PlaceOrderStripe = async (req, res) => {
  try {
    const { userId, address, amount, items } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
       currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//verify stripe
const VerfiyStrip =async (req,res) => {
    const {orderId,success,userId} = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{CartData:{}})
            res.json({
                success:true
            })
        }else{
            await orderModel.findByIdAndDelete(orderId)
             res.json({
                success:false
            })
        }
    } catch (error) {
          console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
    }
}

// placing order using Razorpay
const PlaceOrderRazorpay = async () => {};

// all order data for admin panel
const allOrder = async (req, res) => {
  try {
    const order = await orderModel.find({});
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//user Order data for front end
const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const order = await orderModel.find({ userId });
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// update order status from admin panel

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId,{ status });

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  PlaceOrder,
  PlaceOrderStripe,
  PlaceOrderRazorpay,
  allOrder,
  userOrder,
  updateStatus,
  VerfiyStrip
};

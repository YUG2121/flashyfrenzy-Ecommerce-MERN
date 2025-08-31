// add products to user cart

import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemID, size } = req.body;

     // ✅ Prevent undefined keys in DB
    if (!itemID || !size) {
      return res.json({
        success: false,
        message: "Missing itemID or size",
      });
    }
    const userData = await userModel.findById(userId);
    let CartData = await userData.CartData;

    if (CartData[itemID]) {
      if (CartData[itemID][size]) {
        CartData[itemID][size] += 1;
      } else {
        CartData[itemID][size] = 1;
      }
    } else {
      CartData[itemID] = {};
      CartData[itemID][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { CartData });
    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update user cart
const UpdateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let CartData = await userData.CartData;
    CartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { CartData });
    res.json({
      success: true,
      message: "Cart upadated",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//get user cart
const GetUserCart = async (req, res) => {
  try {

    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let CartData = await userData.CartData;
    res.json({
      success: true,
      CartData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, UpdateCart, GetUserCart };

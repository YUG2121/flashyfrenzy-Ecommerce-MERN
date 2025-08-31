import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContex";
import Title from "./Title";
const CartTotal = () => {
  const { currency, Delivery_fees, GetCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full pr-10">
      <div className=" text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between ">
          <p>Subtotal</p>
          <p>
            {currency} {GetCartAmount()}.00
          </p>
        </div>
       
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {Delivery_fees}.00
          </p>
        </div>
         <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {GetCartAmount() === 0 ? 0 : GetCartAmount() + Delivery_fees}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

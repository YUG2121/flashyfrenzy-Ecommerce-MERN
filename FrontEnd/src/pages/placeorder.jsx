import React, { useContext, useState } from "react";
import Title from "../componet/Title";
import CartTotal from "../componet/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContex.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { backendurl } from "../../../Admin/src/App.jsx";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    token,
    cartItems,
    setCartItems,
    GetCartAmount,
    Delivery_fees,
    products,
  } = useContext(ShopContext);

  const [fromData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormdata((data) => ({ ...data, [name]: value }));
  };

  const onSubmithandler = async (event) => {
    event.preventDefault();

    try {
      let orderItem = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            ); // its create a copy of anyobject diffrent variable
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }
      let OrderData = {
        address: fromData,
        items: orderItem,
        amount: GetCartAmount() + Delivery_fees,
      };

      switch (method) {
        //api call for COD order
        case "cod":
          const response = await axios.post(
            backendurl + "/api/order/place",
            OrderData,
            { headers: { token } }
          );
          console.log(response);

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }

          break;
          case "stripe":
          const responseStripe = await axios.post(backendurl+'/api/order/stripe',OrderData,{headers:{token}})
          if (responseStripe.data.success) {
            const{session_url} = responseStripe.data
            window.location.replace(session_url)
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  return (
    <form
      onSubmit={onSubmithandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t "
    >
      {/* left side */}
      <div className=" flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY "} text2={" INFORMATION"} />
        </div>
        <div className=" flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={fromData.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={fromData.lastName}
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={fromData.email}
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={fromData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className=" flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={fromData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={fromData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className=" flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={fromData.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={fromData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={fromData.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* right side */}

      <div className="mt-8 mr-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={" PAYMENT "} text2={" METHOD "} />

          {/* payment methods selction */}
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-blue-900" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2  px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-blue-900" : ""
                }`}
              ></p>
              <p className=" text-gray-500 text-sm font-medium mx-3 ">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className=" w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;

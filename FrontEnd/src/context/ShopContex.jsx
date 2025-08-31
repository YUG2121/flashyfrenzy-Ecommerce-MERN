import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../../../Admin/src/App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const Delivery_fees = 49;

  // Use environment variable consistently
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // Add item to cart
  const addToCart = async (itemID, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemID]) {
      cartData[itemID][size] = cartData[itemID][size] ? cartData[itemID][size] + 1 : 1;
    } else {
      cartData[itemID] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/add`,
          { itemID, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const GetCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((subTotal, qty) => subTotal + qty, 0);
    }, 0);
  };

  const GetCartAmount = () => {
    let totalAmount = 0;
    for (const productID in cartItems) {
      const itemInfo = products.find((p) => p._id === productID);
      if (!itemInfo) continue;
      for (const size in cartItems[productID]) {
        totalAmount += cartItems[productID][size] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemID][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendURL}/api/cart/update`,
          { itemID, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`);
      if (response.data.success) setProducts(response.data.product);
      else toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (userToken) => {

    if (!token) return; // guard

  try {
    const response = await axios.post(
      backendurl+ "/api/cart/get",
      {},
      { headers: { token } } // send token in headers
    );

    console.log("User Cart:", response.data);

    if (response.data.success) {
      setCartItems(response.data.CartData);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Cart fetch error:", error);
    toast.error(error.message);
  }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    Delivery_fees,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    GetCartCount,
    GetCartAmount,
    updateQuantity,
    navigate,
    backendURL,
    token,
    setToken,
    setCartItems,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

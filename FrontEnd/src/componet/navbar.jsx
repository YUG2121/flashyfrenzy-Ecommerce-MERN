import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContex";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch,GetCartCount,navigate ,token,setToken, setCartItems} = useContext(ShopContext)
 const logout = () =>{
   navigate("/login")
  localStorage.removeItem('token');
  setToken('');
  setCartItems({});
 }  
  return (
    <div className=" mx-10 flex items-center justify-between py-5  font-medium">
    <Link to='/'>  <img src={assets.logo} className="w-36 mr-5 " alt="" /></Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 mx-2">
          <p className="text-[#1C352D]">HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 ">
          <p className="text-[#1C352D]"> COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 ">
          <p className="text-[#1C352D]">ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
          <p className="text-[#1C352D]">CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-3 ">
        <img onClick={() =>setShowSearch(true)} src={assets.search_icon} alt="" className=" w-5 cursor-pointer" />
        <div className="group relative">
       <img
            src={assets.profile_icon}
            className=" w-5 cursor-pointer m-3"
            alt=""
            onClick={()=> token ? null :navigate('/login')}
          />
          {/* dropdown  */}
              {token && <div className=" group-hover:block hidden absolute dropdown-menu right-0 pt-4 pl-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-300 text-gray-500 rounded-lg">
              <p onClick={()=> navigate('/orders')} className=" cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className=" cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>}
          
        </div>
        <Link to="/cart" className=" relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className=" absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {GetCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden ml-4"
          alt=""
        />
      </div>
      {/* sidebar menu for small decice */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className=" flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p className=" cursor-pointer">Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

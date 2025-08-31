import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContex";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../componet/Title";
import ProductItem from "../componet/ProductItem";

const Collection = () => {
  const { products ,Search,ShowSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category,SetCategory] = useState([])
  const [subCategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('relavent')

// for category MEN,women category//
const togglecategory = (e) =>{

  if(category.includes(e.target.value)){
    SetCategory(prev => prev.filter(item => item !== e.target.value))
  }else{
    SetCategory(prev => [...prev,e.target.value])
  }


}
// for subCategory TopWear bottomwear
const toggleSubCategory = (e) =>{

  if(subCategory.includes(e.target.value)){
    setSubCategory(prev => prev.filter(item => item !== e.target.value))
  }
  else{
    setSubCategory(prev => [...prev,e.target.value])
  }
}

// applying filter to change category
const applyFIlter =() =>{
  let productCopy = products.slice();

  if(category.length > 0){
    productCopy = productCopy.filter(item => category.includes(item.category));
  }
  if(subCategory.length > 0){
    productCopy = productCopy.filter(item => subCategory.includes(item.SubCategory))
  }

  setFilterProduct(productCopy)
}


//sorting product//
const sortProduct = () =>{

let FpCopy = filterProduct.slice();
switch(sortType){

  case 'low-high':
    setFilterProduct(FpCopy.sort((a,b) => (a.price - b.price)));
    break
  case 'high-low':
    setFilterProduct(FpCopy.sort((a,b) => (b.price - a.price)));
    break
    default :
    applyFIlter()
    break;
}
}

console.log(products)
useEffect(() =>{
    applyFIlter()
},[category,subCategory,products,Search,ShowSearch ])
  

useEffect(() =>{
sortProduct();
},[sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* filter column */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-[#1C352D]"
          onClick={() => setShowFilter(!showFilter)}
        >
          <img
            className={`h-3 sm:hidden ${showFilter ? " rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
          FILTERS
        </p>
        {/* categorie filter */}
        <div
          className={`border border-[#F5C9B0] py-3 pl-5 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={togglecategory}/>
              MEN
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={togglecategory} />
              WOMEN
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kid"} onChange={togglecategory}/>
              KIDS
            </p>
          </div>
        </div>
        {/* subcategory/ filter */}
        <div
          className={`border border-[#F5C9B0] pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory}/>
              TOPWEAR
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"}onChange={toggleSubCategory} />
              BOTTOMWEAR
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory}/>
              WINTERWEAR
            </p>
          </div>
        </div>
      </div>
      {/* You can add the product grid or other columns here */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={" COLLECTIONS"} />
          {/* product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort By : Relavent</option>
            <option value="low-high">Sort By : low to high</option>
            <option value="high-low">Sort By : high to low</option>
          </select>
        </div>
        {/* map product */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map((product, index) => (
            <ProductItem
              key={index}
              name={product.name}
              price={product.price}
              image={product.image}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;

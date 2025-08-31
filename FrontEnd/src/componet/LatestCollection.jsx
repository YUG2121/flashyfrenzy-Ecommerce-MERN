import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContex";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0,10));
  },[products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={" COLLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae,
          minus officiis doloribus odit unde doloremque corrupti. Quia pariatur
          itaque sequi dolore, explicabo nostrum cupiditate culpa alias veniam
          dolorum adipisci odio.
        </p>
      </div>
      {/* rendering product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
    
        {latestProduct.map((product,index) => (
        <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}  />
       
       ))}</div>
    </div>
  );
};

export default LatestCollection;

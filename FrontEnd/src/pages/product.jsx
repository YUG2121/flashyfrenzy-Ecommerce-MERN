import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContex';
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import Relatedproduct from '../componet/Relatedproduct';

const Product = () => {

  const {productID} = useParams(); //using this hook we get its product id
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image ,SetImage] = useState('')
  const [size,SetSize] = useState('')

const fatchProductData = () => {
  console.log("Products from context:", products);   // Debug
  console.log("Product ID from URL:", productID);    // Debug

  const foundProduct = products.find((item) => item._id === productID);
  console.log("Found product:", foundProduct);       // Debug

  if (foundProduct) {
    setProductData(foundProduct);
    SetImage(foundProduct.image[0]);
  }
};

  useEffect(() =>{

    fatchProductData();
  },[productID])
  

  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
              onClick={() =>SetImage(item)}
                src={item}
                key={index}
                alt=""
                className="w-20 h-20 sm:w-full sm:h-24 mb-0 sm:mb-3 flex-shrink-0 cursor-pointer object-cover rounded-md border border-gray-200"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ))}
          </div>
          <div className="w-full sm:w-[77%] flex items-center justify-center">
            <img
              src={image}
              className="w-full max-w-xs sm:max-w-xl md:max-w-2xl h-auto object-contain rounded-lg shadow-md"
              alt=""
            />
          </div>
        </div>
        {/* product info */}
        <div className='flex-1'>
              <h1 className='font-medium text-2xl mt-2'>
                {productData.name}
              </h1>
              <div className='flex items-center gap-1 mt-2 '>
                    <img src={assets.star_icon} alt="" className="w-3 5" />
                    <img src={assets.star_icon} alt="" className="w-3 5" />
                    <img src={assets.star_icon} alt="" className="w-3 5" />
                    <img src={assets.star_icon} alt="" className="w-3 5" />
                    <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                    <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
              <p className='mt-5 md:w-4/5 text-gray-500'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                      <p>Select Size</p>
                      <div className='flex gap-2'>
                        {productData.sizes.map((item ,index) => (
                          <button onClick={() => SetSize(item)} className={`border py-2 px-4 bg-gray-300 ${item == size ? 'border-orange-500' : ''}`} key={index}>{item} </button>
                        ))}
                      </div>
              </div>
        <button onClick={() => addToCart(productData._id,size)} className=' bg-gray-800 text-white px-8 py-3 text-sm active:bg-gray-700 '>ADD TO CART</button>
        <hr className='mt-8  sm:w-4/5'/>
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '>
          <p className='font-bold text-gray-700'>100% Orignal Product</p>
          <p className='font-bold text-gray-700'>Cash On Delivery is Available on this product.  </p>
          <p className='font-bold text-gray-700'>Easy Return And Exchange Policy Within 7 Days</p>
        </div>
        </div>
      </div>
      
      {/* // description and review */}
      
      <div className='mt-20'>
        <div className='flex '>
          <p className='border px-5 py-3 text-sm'>Description</p>
          <p className='border px-5 py-3 text-sm'>Review (122)</p>
        </div>
        <div className=' flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 '>
          <p>
            {productData.longDescription ||
              "Experience unmatched quality and style with this exceptional product. Designed for those who value both aesthetics and functionality, it features premium materials that ensure long-lasting durability. The modern design seamlessly fits into any wardrobe, making it perfect for a variety of occasions. Whether you're heading to work, a casual outing, or a special event, this product adapts to your needs and keeps you comfortable all day long. With attention to detail in every stitch, it promises not only a great look but also a superior feel. Enjoy the confidence that comes with wearing a product crafted to the highest standards."}
          </p>
          <p>
            <strong className='font-extrabold'>Best Things About This Product:</strong>
            <br />
            - Crafted from high-quality, durable materials<br />
            - Modern and versatile design suitable for any occasion<br />
            - Comfortable fit for all-day wear<br />
            - Easy to care for and maintain<br />
            - Backed by a hassle-free return and exchange policy<br />
            - Trusted by hundreds of satisfied customers
          </p>
        </div>
      </div>

      {/* display related product */}
      <Relatedproduct category={productData.category} subcategory={productData.Subcategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
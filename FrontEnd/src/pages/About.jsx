import React from 'react'
import Title from '../componet/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewLetterbox from '../componet/NewLetterbox'

const About = () => {
  return (
    <div> 
        <div className='text-2xl text-center pt-8 border-t'>
            <Title text1={'ABOUT'} text2={'US'}/>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
              <img src={assets.about_img}  className='w-full md:max-w-[450px]' alt="" />
              <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
               <p>
                Welcome to our e-commerce platform, your one-stop destination for quality products and exceptional service. Our mission is to make online shopping easy, enjoyable, and accessible for everyone. We carefully curate our product selection to ensure that you have access to the latest trends, top brands, and unbeatable deals, all in one convenient place. Our team is passionate about delivering a seamless shopping experience, from browsing to checkout, and we are committed to providing outstanding customer support every step of the way.
               </p>
               <p>
                At the heart of our business is a dedication to customer satisfaction. We believe in building lasting relationships with our customers by offering reliable shipping, secure payment options, and hassle-free returns. Whether you are shopping for yourself or searching for the perfect gift, we strive to exceed your expectations with every order. 
                </p>
              <b className='text-gray-800'></b>
  <p>
    Thank you for choosing us as your trusted online retailer—we look forward to serving you and making your shopping experience truly exceptional.
  </p>
              </div>
        </div>

<div className='text-xl py-4'>
<Title text1={'WHY'} text2={'CHOOSE US'}/>
</div>
<div className='flex flex-col md:flex-row text-sm mb-20 '>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Quality Assutance:</b>
<p className='text-gray-600'> Implemented Quality Assurance for the e-commerce website by testing functionality, performance, and security to ensure a smooth and reliable shopping experience.”</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Convenience:</b>
<p className='text-gray-600'> Designed the e-commerce website with customer convenience in mind, ensuring easy navigation, quick checkout, and a seamless shopping experience across all devices.”</p>
</div>
<div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
<b>Exceptional Customer Service:</b>
<p className='text-gray-600'> “Focused on providing exceptional customer service through quick response, easy returns, secure transactions, and constant support to build trust and satisfaction.”</p>
</div>
</div>
<NewLetterbox/>
    </div>
  )
}

export default About
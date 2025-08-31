import React from 'react'
import { assets } from '../assets/frontend_assets/assets'


const Footer = () => {
  return (
    <div>
        <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
            <div className=''>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, ut? Placeat nostrum voluptates minima assumenda cupiditate eos illo et laboriosam incidunt delectus repellendus culpa totam eaque fugit, dolores dignissimos id.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600 underline cursor-pointer'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>DELIVERY</li>   
                    <li>PRIVACY POLICY</li>   
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH!</p>
                <ul className='flex flex-col gap-1 text-gray-700 underline cursor-pointer'>
                    <li>91+2120001210</li>
                    <li>Flashefrenzy@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr className='font-bold' />
        <p className=' text-sm text-center text-gray-600'>© 2025 Flashy Frenzy IND, All rights reserved.</p>
    </div>

  )
}

export default Footer
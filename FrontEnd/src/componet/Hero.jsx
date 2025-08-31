import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className=' w-full flex flex-col sm:flex-row border border-gray-400'>
        {/* hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 '>
        <div className='text-gray-800'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-8 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>OUR BEST SELLER</p>
            </div>
                    <h1 className=' prata-regular pl-10 text-3xl sm:py-3 lg:text-5xl leading-relaxed '>Latest Arrivals</h1>
        <div className='flex items-center gap-2'>
            
            <p className='font-semibold text-sm md:text-base'>SHOP NOW </p>   
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
        </div>
        </div>
        </div>
        {/* hero right side */}
        <img src={assets.hero_img} className='w-fit sm:w-1/2 h-[650px]' alt="" />
    </div>
  )
}

export default Hero
import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
return (
    <div className='flex flex-col sm:flex-row items-center justify-center text-center gap-10 sm:gap-40 py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt="" className='w-12 mb-5 mx-auto' />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <img src={assets.quality_icon} alt="" className='w-12 mb-5 mx-auto' />
            <p className='font-semibold'>7 Days Return Policy </p>
            <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div>
            <img src={assets.support_img} alt="" className='w-12 mb-5 mx-auto' />
            <p className='font-semibold'>Best customer Support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </div>
)
}

export default OurPolicy
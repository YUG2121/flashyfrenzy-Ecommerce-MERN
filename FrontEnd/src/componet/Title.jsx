import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='text-[#1C352D]'>{text1 +' ' }<span className='text-[#A6B28B] font-medium'>{text2 }</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#F5C9B0]'></p>
    </div>
  )
}

export default Title

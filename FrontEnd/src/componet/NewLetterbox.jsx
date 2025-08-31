import React from 'react'

const NewLetterbox = () => {

    const OnSubmitHandle = (event) =>{
       event.preventDefault()
    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & Get 20% OFF!</p>
        <p className='text-gray-400 mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam rem eos tenetur enim, veritatis mollitia ad nihil praesentium nisi esse. Corrupti et fugit vitae? Explicabo temporibus aliquam magnam necessitatibus delectus.</p>
       <form onSubmit={OnSubmitHandle} className='w-full flex items-center sm:w-1/2 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required/>
       <button type='submit' className='bg-gray-900 text-white text-xs px-10 py-4'>SUBSCRIBE!</button>
       </form>
    </div>
  )
}

export default NewLetterbox
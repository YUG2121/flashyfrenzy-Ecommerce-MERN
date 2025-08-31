import React, { useState } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

const [email , SetEmail] = useState('')
const [password , Setpassword] = useState('')
    
    const onSubmitHandler = async (e)=>{
    try {
    e.preventDefault()
    const response = await axios.post(backendurl + '/api/user/admin',{email,password})
       if (response.data.success) {
    setToken(response.data.token);
}
else{
         toast.error(response.data.message)
        }
    
    } catch (error) {
    console.log(error);
    toast.error(error.message)
    
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-[url(assets/backgroundImage.jpg)] '>
        <div className=' bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className=' text-2xl font-bold mb-4'>Admin Panel</h1>
            <form action="" onSubmit={onSubmitHandler}>
                <div className=' mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700'>
                    Email Address
                    </p>
                    <input onChange={(e)=> SetEmail(e.target.value)} value={email}  className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com ' required />
                </div>
                <div className=' mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700'>
                    Password
                    </p>
                    <input onChange={(e)=> Setpassword(e.target.value)} value={password} className=' rounded-md w-full px-3 py-2 border border-gray-300 outline-none'  type="password" placeholder='Enter Your Password' required />
                </div>
                <button className=' cursor-pointer bg-black text-white mt-2 w-full py-2 px-4 rounded-md' type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login
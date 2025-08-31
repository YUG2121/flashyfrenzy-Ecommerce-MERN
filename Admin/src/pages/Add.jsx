import React, { use, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

function Add({token}) {
    const[image1 ,setImage1] = useState(false)
    const[image2 ,setImage2] = useState(false)
    const[image3 ,setImage3] = useState(false)
    const[image4 ,setImage4] = useState(false)

    const [name,SetName] = useState("")
    const[description,setDescription] = useState("");
    const [price,Setprice] = useState("");
    const [Category,SetCategory] = useState("Men");
    const [SubCategory,setSubCategory]=useState("Topwear");
    const [bestseller,Setbestseller] = useState(false);
    const[Sizes,SetSize] = useState([])


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData()

            formData.append("name" ,name)
            formData.append("description" ,description)
            formData.append("price" ,price)
            formData.append("category", Category);
            formData.append("SubCategory", SubCategory);
            formData.append("bestseller", JSON.stringify(bestseller))   
            formData.append("sizes" ,JSON.stringify(Sizes))

           image1 && formData.append("image1",image1)
           image2 && formData.append("image2",image2)
           image3 && formData.append("image3",image3)
           image4 && formData.append("image4",image4)


           const response = await axios.post(backendurl + "/api/product/add" , formData, {headers: {token} })
         
           if (response.data.success) {
            toast.success(response.data.message)
            SetName('')
            setDescription('')
            setImage1(false)
            setImage2(false)
            setImage3(false)
            setImage4(false)
            Setprice('')
           }else{
            toast.error(response.data.message)
           }
        } catch (error) {
             console.error("Add product failed:", error);
        }

    }
     return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3  '>
        <div>
            <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2 '>
            <label htmlFor="image1">
                <img className='w-20' src={!image1 ? assets.upload_area :URL.createObjectURL(image1)} alt="" />
                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
                <img className='w-20' src={!image2 ?  assets.upload_area :URL.createObjectURL(image2)} alt="" />
                <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
                <img className='w-20' src={!image3 ? assets.upload_area :URL.createObjectURL(image3)} alt="" />
                <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
                <img className='w-20' src={!image4 ? assets.upload_area :URL.createObjectURL(image4)} alt="" />
                <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
        </div>
        </div>
        <div className='w-full'>
            <p className='mb-2'>Product name</p>
            <input onChange={(e) => SetName(e.target.value)} value={name} type="text"  placeholder='Type here' className='border px-3 py-2 w-full max-w-[400px] border-pink-300 rounded-xl text-sm' />
        </div>
        <div className='w-full'>
            <p className='mb-2'>Product discription</p>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text"  placeholder='Write content here' className='border px-3 py-2 w-full max-w-[400px] border-pink-300 rounded-xl text-sm' />
        </div>
        <div className='flex flex-col sm:flex-row w-full sm:gap-8 gap-4 '>
            <div className='text-center'>
                <p  className='mb-2' >Product Category</p>
                <select onChange={(e)=> SetCategory(e.target.value)}  value={Category} className=' w-full px-3 py-2 border border-pink-300 rounded-xl text-sm'>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kid</option>
                </select>
            </div>
            <div className='text-center'>
                <p className='mb-2' >Sub Category</p>
                <select onChange={(e) => setSubCategory(e.target.value)} value={SubCategory} className=' w-full px-3 py-2 border border-pink-300 rounded-xl text-sm'>
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                </select>
            </div>
<div>
    <p className='mb-2'>Product Price</p>
    <input onChange={(e) => Setprice(e.target.value)} value={price} type="number" placeholder='$25' className=' w-full px-3 py-2 border sm:w-[120px] border-pink-300 rounded-xl text-sm text-center' />
</div>
        </div>
<div>
    <p className='mb-2'>Product Sizes</p>
    <div className='flex gap-3'>
        <div onClick={() => SetSize(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev,'S'] ) } >
            <p className={`px-3 py-1 cursor-pointer ${Sizes.includes('S') ? "bg-pink-100 " : "bg-slate-200" }`} >S</p>
        </div>
        <div onClick={() => SetSize(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M" ]) }>
            <p className={`px-3 py-1 cursor-pointer ${Sizes.includes("M") ? "bg-pink-100 " : "bg-slate-200" }`} >M</p>
        </div>
        <div onClick={() => SetSize(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, "L" ]) } >
            <p className={`px-3 py-1 cursor-pointer ${Sizes.includes('L') ? "bg-pink-100 " : "bg-slate-200" }`} >L</p>
        </div>
        <div onClick={() => SetSize(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, "XL" ]) }>
            <p className={`px-3 py-1 cursor-pointer ${Sizes.includes('XL') ? "bg-pink-100 " : "bg-slate-200" }`} >XL</p>
        </div>
        <div onClick={() => SetSize(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev,"XXL"] ) } >
            <p className={`px-3 py-1 cursor-pointer ${Sizes.includes('XXL') ? "bg-pink-100 " : "bg-slate-200" }`} >XXL</p>
        </div>
    </div>
</div>
<div className='flex gap-2 mt-2'>
    <input onChange={() => Setbestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
    <label  className=" cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
</div>
<button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add
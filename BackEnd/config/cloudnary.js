import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async ()=>{

 cloudinary.config({
    cloud_name: process.env.CLOUNDNIRY_NAME,
    api_key: process.env.CLOUDNIRY_API_KEY,
    api_secret: process.env.CLOUDNIRY_API_SECERT
 })


} 

export default connectCloudinary;
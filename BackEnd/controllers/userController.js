// route for user login
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const createToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECERT);
};
const loginUser = async (req, res) => {


try {
    
    const {email,password} =req.body;
    const user = await userModel.findOne({email})

    if(!user){
         return res.json({
        success: false,
        message: "user doesn't exists",
      });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (isMatch) {
         const token = createToken(user._id)
         res.json({
            success:true,
            token
         })
    }else{
       res.json({
            success:false,
            message:'invalid credentials'
         }) 
    }

} catch (error) {
     console.log(error);
    res.json({
      success: false,
      message:error.message
    });
}

};

// route for user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking user exists or not
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }
    // checking email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter valid email",
      });
    }
    //
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }

    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashpassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message:error.message
    });
  }
};

//route for admin login
const AdminLogin = async (req, res) => {

    try {
      const{email,password}= req.body;
      if (email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = JWT.sign(email+password,process.env.JWT_SECERT);
        res.json({
          success:true,
          token
        }
        )
      }else{
        res.json({
          success:false,
          message:"Invalid credentials"
        }) 
      }
    } catch (error) {
       console.log(error);
    res.json({
      success: false,
      message:error.message
    });
    }
};

export { loginUser, registerUser, AdminLogin };

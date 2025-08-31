import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContex";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {token,setToken ,navigate,backendURl} = useContext(ShopContext)

  const [name,setname] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const submitHandler = async (event)  =>{
    event.preventDefault();


    try {
     
      if (currentState === 'Sign Up') {
         const response = await axios.post(backendURl + '/api/user/register' ,{name,email,password})
        if (response.data.success ) {
          setToken(response.data.token)
          console.log(response.data.token);
          
          localStorage.setItem('token' ,response.data.token)
        }else{
          toast.error(response.data.message)
        }
         
      }else{
        const response = await axios.post(backendURl + '/api/user/login' ,{email,password})
     if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token' ,response.data.token) //saving in local stroage
     }else{
          toast.error(response.data.message)
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }


  useEffect(() =>{
if (token) {
  navigate('/')
}

  },[token])

  return (
    <form
    onSubmit={submitHandler}
      className=" flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10 ">
        <p className=" prata-regular text-3xl">{currentState} </p>
        <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={(e) => setname(e.target.value )}
          value={name}
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
         onChange={(e) => setEmail(e.target.value )}
          value={email}
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
         onChange={(e) => setPassword(e.target.value )}
          value={password}
      />
      <div className=" w-full flex justify-between text-sm mt-[-8px] ">
        <p className=""> Forgot Your Password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            {" "}
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 rounded-xl ">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
 
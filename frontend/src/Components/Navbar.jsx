import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useauth } from '../context/Authprovider'
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
  const [authuser,setauthuser]=useauth();
  console.log(authuser)
  // const logoutclick=()=>{
  //   try {
  //     setauthuser({...authuser,user:null,})
  //     localStorage.removeItem("userinfo");
  //     alert("logout successfull")
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 100);
     
  //   } catch (error) {
  //     alert("error: "+error.message)
  //   }
  // }

  const logoutclick=async()=>{
    try {
      await axios.get("https://password-mernapp.onrender.com/user/logout",{
        withCredentials:true
      })
      toast.success("logout successfull")
      localStorage.removeItem("jwt");
      <Navigate to={"/login"}/>
    } catch (error) {
      toast.error("error in logging out")
    }
  }
  return (
    
    <div className="nav flex bg-blue-900 text-white justify-around items-center sticky top-0 ">
        <div className="logo flex items-center flex-col md:flex-row">
            <img src="https://tse3.mm.bing.net/th?id=OIG1.iDElHlNHz.yOu1rUu5Ru&pid=ImgGn" alt="" className='md:w-20 md:h-20 rounded-full py-2 w-10 h-10'/>
            <span className='text-white font-bold text-base md:text-2xl cursor-pointer px-2'> &lt;Word</span>
            <span className='text-blue-600 font-bold text-base md:text-2xl cursor-pointer'> Wrap&gt;</span>
        </div>
        
        <ul className='flex justify-center items-center text-white font-semibold '> 
           <NavLink to="/"><li className='bg-blue-500 text-base md:text-xl mx-1 md:mx-4 px-1 md:px-2 py-2 md:py-1 rounded-2xl cursor-pointer text-white hover:bg-blue-600 font-semibold hover:font-bold hover:transition-none'>Home</li></NavLink>
           <NavLink to="/about"><li className='bg-blue-500 text-base md:text-xl mx-1 md:mx-4 px-1 md:px-2 py-2 md:py-1 rounded-2xl cursor-pointer text-white hover:bg-blue-600 font-semibold hover:font-bold hover:transition-none'>About</li></NavLink>
           <NavLink to="/contact"><li className='bg-blue-500 text-base md:text-xl mx-1 md:mx-4 px-1 md:px-2 py-2 md:py-1 rounded-2xl cursor-pointer text-white hover:bg-blue-600 font-semibold hover:font-bold hover:transition-none'>Contact</li></NavLink>
           { authuser ? <div className='userlogout flex text-white justify-center items-center'><p className='bg-blue-500 text-sm md:text-xl mx-1 md:mx-4 px-0 md:px-2 md:py-1 py-1 rounded-2xl text-center  text-white hover:bg-blue-600 font-semibold hover:font-bold hover:transition-none'>"Hello User"</p><NavLink to="/login"><li onClick={logoutclick} className='bg-blue-500 text-base md:text-xl mx-1 md:mx-4 px-1 md:px-2 md:py-1 py-2 rounded-2xl cursor-pointer text-white hover:bg-blue-600 font-semibold hover:font-bold hover:transition-none'>Logout</li></NavLink></div>:
            <NavLink to="/login"><li  className='bg-blue-500 text-base md:text-xl mx-1 md:mx-4 px-1 md:px-2 md:py-1 py-2 rounded-2xl cursor-pointer text-white hover:bg-blue-600 font-semibold hover:font-bold hover:transition-none'>Login</li></NavLink> 
           }
           
           
        </ul>
    </div>
    
  )
}

export default Navbar

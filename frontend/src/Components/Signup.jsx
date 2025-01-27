import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'

const Signup = () => {

  const  [signd, setsignd] = useState({username:"",email:"",password:""})
  const [tsignup, settsignup] = useState([]);
  const navigateto=useNavigate();
  const handlechange=(e)=>{
    setsignd({...signd,[e.target.name]:e.target.value})
    console.log({...signd,[e.target.name]:e.target.value})
  }
  // const handleclick=async ()=>{
  //   const userinfo={
  //     username:signd.username,
  //     email:signd.email,
  //     password:signd.password
  //   }
  //   await axios.post("https://password-mernapp-1.onrender.com/user/signup",userinfo)
  //   .then((res)=>{
  //     console.log(`${res.data}`)
  //     if(res.data){
  //         toast('Saved!!', {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
        
  //       });
  //       alert("helloooooo")
  //     }
  //     localStorage.setItem("userinfo",JSON.stringify(res.data.user));
  //   }).catch((err)=>{
  //      if(err.response){
  //       console.log(err)
  //      alert("error: "+ err.response.data.message)
  //      }
  //   })
  //   setsignd({username:"", email:"",password:""});
  //   //console.log([...tsignup],{...signd})
  // }


  // handleclick2

  const handleclick=async()=>{
       
     try {
      const userinfo={
        username:signd.username,
        email:signd.email,
        password:signd.password
      }
      console.log(userinfo)
      const {data}=await axios.post("https://password-mernapp-1.onrender.com/user/signup",
        userinfo,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data)
      toast.success(data.message || "user registered successfully now login ")
      setTimeout(() => {
        navigateto("/login")
      }, 3000);
     
      
       
      
      
      localStorage.setItem("jwt",data.token);
      setsignd({username:"",email:"",password:""});
      
      
      

     } catch (error) {
      console.log(error)
      toast.error(error.response.data.message || "user signup failed")
     }
  }


  return (
  <>
     <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  />
  {/* Same as */}
  <ToastContainer />
  <div className="login h-screen flex justify-center items-center">
    <div className="lpage h-3/5 bg-blue-500 border border-slate-900 w-5/6 md:w-2/5 text-white text-center text-2xl font-bold ">
       Signup
       <hr className='w-16 h-3 mx-auto mt-1  hover:font-bold'/>
       <div className='text-start px-3 py-3 text-lg'>
       <p>Username</p>
       <hr className='w-20 h-3  mt-1  hover:font-bold'/>
        <input type="text" placeholder='enter your username'  id="" className='text-black text-lg px-5 py-1 ' name="username" value={signd.username} onChange={handlechange} /></div>
        <div className='text-start px-3 py-3 text-lg'>
       <p>Email</p>
       <hr className='w-16 h-3  mt-1  hover:font-bold'/>
        <input type="text" placeholder='enter your Email'  id="" className='text-black text-lg px-5 py-1 '  name="email" value={signd.email} onChange={handlechange}  /></div>
        <div className='text-start px-3 py-3 text-lg'>
       <p>Password</p>
       <hr className='w-20 h-3  mt-1  hover:font-bold'/>
        <input type="text" placeholder='enter your password'  id="" className='text-black text-lg px-5 py-1 ' name="password" value={signd.password} onChange={handlechange}  /></div>
        <div className='flex px-2 justify-around'>
    {/* <NavLink to="/login"> */}
    <button  onClick={handleclick} className=' bg-red-500 text-white font-semibold px-5 rounded-3xl py-2 text-xl hover:font-bold hover:bg-red-600'>Submit</button>
    {/* </NavLink> */}
    <NavLink to="/login"><button className=' bg-red-500 text-white font-semibold px-5 rounded-3xl py-2 text-xl hover:font-bold hover:bg-red-600'>Login</button></NavLink>
        </div>
    
        
    </div>
    

   </div>
  </>
  )
}

export default Signup

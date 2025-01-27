import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
const Login = () => {
  const  [signd, setsignd] = useState({email:"",password:""})
  const [tsignup, settsignup] = useState([]);
  const navigateto=useNavigate();
  const handlechange=(e)=>{
    setsignd({...signd,[e.target.name]:e.target.value})
    console.log({...signd,[e.target.name]:e.target.value})
  }

  // const handleclick=async ()=>{
  //   const userinfo={
  //     email:signd.email,
  //     password:signd.password
  //   }
  //   await axios.post("http://localhost:3000/user/login",userinfo)
  //   .then((res)=>{
  //     console.log(`${res.data}`)
  //     if(res.data){
  //        alert("Login successfull")
  //       //  setTimeout(() => {
  //       //   window.location.reload()
  //       //  }, 1000);
  //     }
  //     localStorage.setItem("userinfo",JSON.stringify(res.data.user));
  //   }).catch((err)=>{
  //      if(err.response){
  //       console.log(err)
  //      alert("error: "+ err.response.data.message)
  //      }
  //   })
  //   setsignd({ email:"",password:""});
  //   //console.log([...tsignup],{...signd})
  //   }

  const handleclick=async()=>{
       
    try {
     const userinfo={
       email:signd.email,
       password:signd.password
     }
     console.log(userinfo)
     const {data}=await axios.post("https://password-mernapp.onrender.com/user/login",
       userinfo,{
       withCredentials:true,
       headers:{
         "Content-Type":"application/json"
       }
     })
     console.log(data)
   
   
     localStorage.setItem("jwt",data.token);
     setsignd({email:"",password:""});
     toast.success("user login successfull")
        //     toast('Saved!!', {
        // position: "top-right",
        // autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        // progress: undefined,
        // theme: "dark",
        
        // });
       setTimeout(() => {
        navigateto("/")
       }, 3000);
         
      

    } catch (error) {
     console.log(error)
     toast.error(error.response.data.message || "user login failed")
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
       Login
       <hr className='w-16 h-3 mx-auto mt-1  hover:font-bold'/>
        <div className='text-start  px-2 py-2  md:px-3 md:py-3 text-lg'>
       <p>Email</p>
       <hr className='w-16 h-3  mt-1  hover:font-bold'/>
        <input type="text" placeholder='enter your Email' name="email" value={signd.email} onChange={handlechange} id="" className='text-black text-lg px-5 py-1 ' /></div>
        <div className='text-start px-3 py-3 text-lg'>
       <p>Password</p>
       <hr className='w-20 h-3 mt-1  hover:font-bold'/>
        <input type="text" placeholder='enter your password'  name="password" value={signd.password} onChange={handlechange} id="" className='text-black text-lg px-5 py-1 ' /></div>
        {/* <NavLink to="/"> */}
        <button onClick={handleclick

        } className=' bg-red-500 mt-5 text-white font-semibold px-5 rounded-3xl py-2 text-xl hover:font-bold hover:bg-red-600'>Login</button>
        {/* </NavLink> */}
        <span className='flex text-lg text-end'><p className='px-4'>Haven't signup??</p>
        <NavLink to="/signup"><li className='cursor-pointer  list-none text-black bg-transparent hover:font-xl'>Signup
        <hr className='w-16 h-1  mt-1  hover:font-bold bg-blue-600'/>
        </li>
        </NavLink></span>
    </div>
    

   </div>
   </>
  )
}

export default Login

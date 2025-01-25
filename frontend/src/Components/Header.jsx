import React, { useRef } from 'react'
import { useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const ref = useRef()
    
  const navigateto=useNavigate();
useEffect(() => {
 fetchpasswords();
}, [])


  const passwordref=useRef();
    const [details, setdetails] = useState({website:"",username:"",password:""})
    const [totaldetails, settotaldetails] = useState([])
    // useEffect(() => {
    //  let tpasswords=localStorage.getItem("tpasswords");
    //  if(tpasswords){
    //   settotaldetails(JSON.parse(tpasswords))
    //  }
    // }, [])
    const fetchpasswords=async()=>{
      try {
        const response=await axios.get("http://localhost:3000/pass/gpass",{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        })
        console.log(response.data)
        console.log("hiubiubiububub")
        settotaldetails(response.data.tpassword)
      } catch (error) {
        console.log("error in fetching the passwords")
      }
  }
  const passwordcheck = () => {
    passwordref.current.type="password"
    console.log(ref.current.src)
    
    if (ref.current.src == "https://th.bing.com/th/id/OIP.DY-ROZnSpAlkpnowXmmz-gHaHa?rs=1&pid=ImgDetMain") {
      passwordref.current.type="text"
      ref.current.src = "https://cdn2.iconfinder.com/data/icons/security-335/512/Show_password_icon_eye_symbol_vector_vision-512.png"
    }
    else {
      ref.current.src = "https://th.bing.com/th/id/OIP.DY-ROZnSpAlkpnowXmmz-gHaHa?rs=1&pid=ImgDetMain"
    }
  }

    const handlechange=(e)=>{
        setdetails({...details,[e.target.name]:e.target.value})
        console.log({...details,[e.target.name]:[e.target.value]})
    }
    const handleclick=async ()=>{
    
   
      //  localStorage.setItem("tpasswords",JSON.stringify([...totaldetails,{...details}]))
      //  console.log([...totaldetails,{...details}])
      try {
        const response=await axios.post("http://localhost:3000/pass/password",{
          website:details.website,
          username:details.username,
          password:details.password
        },{
          withCredentials:true
        })
        settotaldetails([...totaldetails,response.data])
        setdetails({website:"",username:"",password:""})
        toast.success( "Password saved successfully")
        
      } catch (error) {
        toast.error(error.response.data.message || "error in saving a new password")
        console.log("error in saving a new password")
      }
       
      //  alert("SAVED SUCCESSFULLY")
      // setTimeout(() => {
      //   navigateto("/")
      //  }, 3000);
      setTimeout(() => {
        window.location.reload()
      }, 3000);
      
    }
    const deletedetails=async (id)=>{
      if(confirm('Do you really want to delete')){
        // toast('Deleted successfully', {
        //   position: "top-right",
        //   autoClose:"3000",
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        
        //   });
          // settotaldetails(totaldetails.filter(item=>item.username!==username))
          // localStorage.setItem("tpasswords",JSON.stringify(totaldetails.filter(item=>item.username!==username)))

          try {
            await axios.delete(`http://localhost:3000/pass/delete/${id}`,{
              withCredentials:true,
            });
            settotaldetails(totaldetails.filter(item=>item._id!==id)) 
            toast.success("Password deleted successfully")
          } catch (error) {
            console.log("error in deleting the password")
            toast.error("error in deleting the password")
          }

          // setTimeout(() => {
          //   window.location.reload()
          // }, 3000);
      }
    }
    const editdetails= (id)=>{
         
      let a=totaldetails.filter(i=>i._id===id)[0];
      toast.success("your password will be deleted for lifetime so save it again")
      deletedetails(id);
      setdetails({website:a.website,username:a.username,password:a.password})
      settotaldetails(totaldetails.filter(item=>item._id!==id)) 

    }

    // const editdetails=async(id)=>{
    //   const p=totaldetails.find((item)=>item._id===id)
    //   try {
    //     const response=await axios.post(`http://localhost:3000/pass/update/${id}`,{
    //       ...p,
          
    //     },
    //   {
    //     withCredentials:true
    //   })
     
    //   settotaldetails(totaldetails.map((item)=>item._id===id?response.data:item))
    //   } catch (error) {
    //     console.log("Failed to fetch the passwords")
    //   }
    // }
    const copytext=(text) => {
      toast('Copied to Clipboard', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
     navigator.clipboard.writeText(text)
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
theme="light"/>
{/* Same as */}
<ToastContainer />

    <div className='bg-blue-300 py-5 px-4 mt-5 max-w-[60vw] mx-auto flex flex-col '>
        <div className="logo mx-auto">
        <span className='text-white font-bold text-4xl md:text-5xl cursor-pointer px-2'> &lt;Word</span>
        <span className='text-blue-600 font-bold text-4xl md:text-5xl cursor-pointer'> Wrap&gt;</span>
        </div>
    <span className='text-black text-lg md:text-xl py-4 px-3 '>
        "Your Passwords are end to end encrypted"</span>
    <input type="text" placeholder='enter your website link or name' className='md:px-3 px-2 md:py-2 py-1 rounded-lg md:text-xl text-lg outline-none border border-gray-800' name="website" value={details.website} onChange={handlechange}/>
    <div className='flex flex-col justify-between my-4 md:flex-row '>
        <input type="text" placeholder='enter your Username'  id="" className='text-lg md:text-lg px-2 md:px-2 py-1 md:py-1 rounded-lg outline-none border border-gray-800 my-4 md:my-0' name="username" value={details.username} onChange={handlechange}/>
        
        <span className='relative flex justify-around text-black cursor-pointer ' onClick={passwordcheck}>
        <input  placeholder='Enter your password' className='text-lg md:text-lg  px-5 md:px-10 py-1 rounded-lg outline-none border border-gray-800'  id="" name="password" type="password" value={details.password} ref={passwordref} onChange={handlechange}/><img ref={ref} className='rounded-xl absolute  right-0 md:right-1 top-1  wmd:w-10' src="https://th.bing.com/th/id/OIP.DY-ROZnSpAlkpnowXmmz-gHaHa?rs=1&pid=ImgDetMain" width={30} alt="" /></span>
    </div>
    <div className=' flex items-center justify-center'>
    <button  onClick={handleclick} className=' bg-blue-500 text-white font-bold px-3 rounded-3xl py-2 text-2xl items-center flex justify-center'>
    <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              delay="2000ms"
              trigger="loop-on-hover"

            >
            </lord-icon>
    Add details</button>
    </div>
    </div>
    {totaldetails.length==0 && <div className='text-white text-2xl font-bold mx-auto text-center mt-5'>You do not have any passwords</div>}
    { totaldetails.length!=0 && <table className=" text-white mx-auto px-1 md:px-3  bg-blue-400 mt-5   md:py-5 md:min-w-[60vw] min-w-[60vw]  max-w-[80vw] md:max-w-[80vw] md:rounded-2xl rounded-xl">
        <thead className='max-w-[60vw]'>
          <tr className='text-center text-xs md:text-xl font-light' >
            <th>Website
            <hr className='md:h-1 md:w-20 w-5 mx-auto'/>
            </th>
            
            <th>Username
            <hr className='md:h-1 md:w-24 w-5  mx-auto'/>
            </th>
            <th>Password
            <hr className='md:h-1  md:w-24 w-5 mx-auto'/>
            </th>
            <th>Delete
            <hr className='md:h-1  md:w-16 w-5  mx-auto'/>
            </th>
            <th>Edit
            <hr className='md:h-1  md:w-16 w-5 mx-auto'/>
            </th>
          </tr>
        </thead>
        <tbody className='max-w-[60vw]'>
        {/* const userinfo={
      username:signd.username,
      email:signd.email,
      password:signd.password
    }
    await axios.post("http://localhost:3000/user/signup",userinfo)
    .then((res)=>{
      console.log(res.data + "hello")
      if(res.data){
          toast('Saved!!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
        alert("helloooooo")
      }
      localStorage.setItem("userinfo",JSON.stringify(res.data.user));
    }).catch((err)=>{
       if(err.response){
        console.log(err)
       alert("error: "+ err.response.data.message)
       }
    }) */}
            {totaldetails.map((item,index)=>{
                return  <> <tr  key={index} className='text-center md:max-w-[80vw] max-w-[80vw]/'>
                <td className='  text-xs md:text-xl px-1  md:px-3 md:py-1 cursor-pointer     ' onClick={()=>{copytext(item.username)}}><p>{item.website}</p>
                <lord-icon 
    src="https://cdn.lordicon.com/wsaaegar.json"
    trigger="hover" >
</lord-icon>
                </td>
                <td   className=' text-xs md:text-xl  md:px-3 md:py-1 px-1 text-center cursor-pointer    ' onClick={()=>{copytext(item.username)}}><p>{item.username}</p>
                <lord-icon 
    src="https://cdn.lordicon.com/wsaaegar.json"
    trigger="hover"  >
</lord-icon>
                </td>
                <td  className='text-xs md:text-xl  md:px-3 md:py-1 px-1 text-center cursor-pointer   ' onClick={()=>{copytext(item.username)}}>
                  <p>{item.password}</p>
                <lord-icon 
    src="https://cdn.lordicon.com/wsaaegar.json"
    trigger="hover" >
</lord-icon>
                </td>
                <td><button  className='text-xs md:text-xl  rounded-sm md:w-10' onClick={()=>{deletedetails(item._id)}}>           <lord-icon
    src="https://cdn.lordicon.com/skkahier.json"
    trigger="hover"
   >
</lord-icon></button></td>
                <td><button className='text-xs md:text-xl rounded-sm md:w-10' onClick={()=>{editdetails(item._id)}} >           <lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    >
</lord-icon></button></td>
                
              </tr>
              
    
              </>
            })}
        
          
        </tbody>
      </table>
    }
    
  
    
    </>
  )
}

export default Header

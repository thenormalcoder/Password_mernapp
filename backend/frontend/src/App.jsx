import { useState } from 'react'
import Navbar from './Components/Navbar'
import { Navigate, Route,Routes } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { useauth } from './context/Authprovider'
import Error from './Components/Error'
import { Toaster } from 'react-hot-toast'
function App() {
const [authuser,setauthuser]=useauth();
const token=localStorage.getItem("jwt");
  console.log(authuser)
  return (
    <>
     <Routes>
     <Route path='/' element={token?<Home/>:<Navigate to={"/login"}/>}/>
     <Route path='/about' element={<About/>}/>
     <Route path='/contact' element={authuser?<Contact/>:<Navigate to="/login"/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='*' element={<Error/>}/>
     
     </Routes>
     <Toaster/>
    </>
  )
}

export default App

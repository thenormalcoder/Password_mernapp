import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Header from './Header'

const Home = () => {
  return (
    <>
    <div className="whole bg-blue-950">
    <div className='bg-blue-950 min-h-[91.2vh] z-10 top-0'>
     <Navbar/>
     <Header/>
    
    </div>
    <Footer/>
    </div>
    </>
    
  )
}

export default Home

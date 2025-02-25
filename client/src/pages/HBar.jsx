import React from 'react'
import Home from '../components/Home/HomeContent'
import Navbar from '../components/Home/Navbar'


const HBar = () => {
  return (
    <>
      <section className='h-[85vh] w-[80vw] bg-background'>
        <Navbar/>
        <Home/>
   
      </section>
    </>
  )
}

export default HBar

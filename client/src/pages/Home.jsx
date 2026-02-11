import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'

const Home = () => {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center bg[url("/bg_img.png")] bg-cover bg-center'>
        <Navbar />
        <Header />
    </div>
  )
}

export default Home
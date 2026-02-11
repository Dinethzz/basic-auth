import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={assets.header_img} alt="header" className='w-36 h-36 rounded-full mb-6' />

        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Dev <img src={assets.hand_wave} alt="hand wave" className='w-8 aspect-square'/></h1>

        <h2 className='text-3xl sm:text-4xl font-semibold mb-4'>Welcome to Authify - Your Ultimate Authentication Solution</h2>

        <p className='max-w-md mb-8'>Your journey to seamless authentication starts here.</p>

        <button className='bg-blue-500 text-white px-8 py-2.5 hover:bg-blue-800 transition border border-gray-500 rounded-full'>Get started</button>
    </div>
  )
}

export default Header
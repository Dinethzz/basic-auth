import React from 'react'
import { assets } from '../assets/assets'

const EmailVerify = () => {
  const inputRefs = React.useRef([]);
  const handleInput = (e, index) => {
    if(e.target.value.length > 0 && index < 5){
      inputRefs.current[index + 1].focus();
    }
  }
  const handleKeyDown = (e, index) => {
    if(e.key === 'Backspace' && index > 0 && e.target.value.length === ''){
      inputRefs.current[index - 1].focus();
    }
  }
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]){
      inputRefs.current[index].value = char;
      }
  })
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold mb-4 text-center'>
          Email verify OTP
        </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the verification OTP sent to your email</p>
        <div className='flex justify-between mb-8'>
          {Array(6).fill(0).map((_, index) => (
            <input key={index} required type='text' maxLength={1} className='w-12 h-12 text-center rounded-lg bg-[#333A5C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-xl' ref={e=>inputRefs.current[index]=e}
            onInput={(e)=>handleInput(e, index)}
            onKeyDown={(e)=>handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition'>Verify</button>
      </form>
      </div>
  )
}

export default EmailVerify
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setIsOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
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
      const pasteArray = pasteData.split('');
      pasteArray.forEach((char, index) => {
        if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
        }
    })
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      {/* enter email id */}
      {!isEmailSent && 
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold mb-4 text-center'>
          Reset Password
        </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>
        <div className='flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] border border-gray-300'>
          <img src={assets.mail_icon} className='w-3 h-3'></img>
          <input type='email' placeholder='Email' className='bg-transparent outline-one text-white' value={email} onChange={e=>setEmail(e.target.value)} required></input>
        </div>
        <button className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition'>Send Reset Link</button>
      </form>
}
      {/* otp input form */}
      {!isOtpSubmitted && isEmailSent && 
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold mb-4 text-center'>
          Reset password OTP
        </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the verification OTP sent to your email</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input key={index} required type='text' maxLength={1} className='w-12 h-12 text-center rounded-lg bg-[#333A5C] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl' ref={e=>inputRefs.current[index]=e}
            onInput={(e)=>handleInput(e, index)}
            onKeyDown={(e)=>handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className='w-full text-white py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>Submit</button>
      </form>
}

      {/*enter new password */}
        {isOtpSubmitted && isEmailSent &&
      <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold mb-4 text-center'>
          New Password
        </h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your new password below</p>
        <div className='flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] border border-gray-300'>
          <img src={assets.lock_icon} className='w-3 h-3'></img>
          <input type='password' placeholder='New Password' className='bg-transparent outline-one text-white' value={newPassword} onChange={e=>setNewPassword(e.target.value)} required></input>
        </div>
        <button className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition'>Reset Password</button>
      </form>
}
    </div>
  )
}

export default ResetPassword
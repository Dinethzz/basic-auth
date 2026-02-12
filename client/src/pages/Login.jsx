import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'

const Login = () => {

  const [state, setState] = useState(
    'signup'
  )
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === 'signup' ? 'Create new Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'signup' ? 'Please fill in the form to create an account.' : 'Please enter your credentials to login.'}</p>
        <form>
          {state === 'signup' && (
            <div className='mb-4 flex items-center gap-3 border border-gray-300 rounded-full px-5 py-2.5 bg-[#333A5C]'>
              <img src={assets.person_icon} alt="Person Icon" />
              <input className='bg-transparent outline-none' type="text" placeholder='Username' required/>
            </div>
          )}
          <div className='mb-4 flex items-center gap-3 border border-gray-300 rounded-full px-5 py-2.5 bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input className='bg-transparent outline-none' type="email" placeholder='Email' required/>
          </div>
          <div className='mb-4 flex items-center gap-3 border border-gray-300 rounded-full px-5 py-2.5 bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input className='bg-transparent outline-none' type="password" placeholder='Password' required/>
          </div>
          <p className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
        </form>
        {state === 'signup' ? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an account?{' '}<span onClick={() => setState('login')} className='text-blue-400 cursor-pointer underline'>Login here</span></p>) : (<p className='text-gray-400 text-center text-xs mt-4'>Don't have an account?{' '}<span onClick={() => setState('signup')} className='text-blue-400 cursor-pointer underline'>Sign up</span></p>)} 
      </div>
    </div>
  )
}

export default Login
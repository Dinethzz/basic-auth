import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent);
  const navigate = useNavigate();
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

  const onSubmitHandler = async (e) => {
    try{
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value);
        const otp = otpArray.join('');
        const data = await axios.post(backendUrl + '/api/auth/verify-account', { otp });
        if(data.success){
          toast.success(data.message);
          getUserData();
          navigate('/');
        }else{          
          toast.error(data.message);
        }
    }catch(error){
      toast.error('Error verifying account');
    }
  }
  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  }, [isLoggedin, userData])
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold mb-4 text-center'>
          Email verify OTP
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
        <button className='w-full text-white py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>Verify</button>
      </form>
      </div>
  )
}

export default EmailVerify
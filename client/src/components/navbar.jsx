import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContent } from '../contexts/appContext'

const Navbar = () => {

    const navigate = useNavigate();
    const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent);
    const logout = async () => {
      try{
        axios.defaults.withCredentials = true;
        const {data} = await axios.post(backendUrl + 'api/auth/logout');
        data.success && setIsLoggedin(false)
        data.success && setUserData(false);
        navigate('/');
      }
    catch(err){
        toast.error(err.message);
    }
  return (
    <div className='w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 fixed top-0 left-0 right-0 z-50 bg-white'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32'/>
        {userData ? <div className='w-8 h-8 flex justify-center items-center bg-black text-white rounded-full relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
                
                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
              </ul>
            </div>
        </div> : <button onClick={() => navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login<img src={assets.arrow_icon} alt="Login Icon" className='w-4 h-4'/></button>}
        
    </div>
  )
}
}
export default Navbar
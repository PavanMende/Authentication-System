import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const sendVerificationOtp=async()=>{
      try {
        axios.defaults.withCredentials=true
        const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp')
        if(data.success){
          navigate('/email-verify')
          toast.success(data.message)
        }
        else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
    const logout = async() => {
        // Add logout functionality here
        try{
          axios.defaults.withCredentials=true
          const {data}=await axios.post(backendUrl+'/api/auth/logout')
          data.success && setIsLoggedIn(false)
          data.success && setUserData(false)
          navigate('/')
        }
        catch(err){
          toast.error(err.message)
        }
    };

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
            <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 cursor-pointer' />
            
            {userData ? (
                <div className='relative'>
                    <div
                        className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer'
                        onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility on click
                    >
                        {userData.name[0].toUpperCase()}
                    </div>

                    {dropdownOpen && (
                        <div className='absolute top-full right-0 bg-white shadow-lg rounded-md w-40 text-black z-10 p-2'>
                            <ul className='flex flex-col gap-2'>
                              {!userData.isVerified && 
                                <li className='cursor-pointer hover:bg-gray-200 p-2 rounded' onClick={sendVerificationOtp}> Verify Email</li>
                              }  <li className='cursor-pointer hover:bg-gray-200 p-2 rounded' onClick={logout}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'
                >
                    Login <img src={assets.arrow_icon} alt="" />
                </button>
            )}
        </div>
    );
};

export default Navbar;

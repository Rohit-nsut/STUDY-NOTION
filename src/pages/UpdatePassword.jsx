import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

import {resetPassword} from "../services/operations/authAPI";


const UpdatePassword = () => {

    const {loading} = useSelector( (state) => state.auth);
    const dispatch  = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({Password: "", ConfirmPassword: ""});

    const changeHandler = (e) => {
        setFormData( (prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    }


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {NewPassword, ConfirmPassword} = formData;

    const submitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(NewPassword, ConfirmPassword, token));
    }

  return (
    <div className=' flex justify-center items-center min-h-[calc(100vh-3.5rem)]'>
        
        {
            loading ? (<div className='spinner'></div>) :
            (
                <div className='flex flex-col gap-6'>

                    <div>
                        <h1 className='text-richblack-5 text-xl font-semi-bold'>Choose new password</h1>
                        <p className='text-richblack-300'>Almost done. Enter your new password and youre all set.</p>
                    </div>

                    <form onSubmit={submitHandler} className='flex flex-col gap-5'>

                        <label htmlFor='newPassword' className='relative'>

                            <p className='text-richblack-5'>New password<sup>*</sup></p>

                            <input 
                                type={showPassword ? "input" : "password"}
                                name='NewPassword'
                                id='newPassword'
                                value={formData.NewPassword}
                                placeholder='Enter your new password'
                                onChange={changeHandler}
                                className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                            />

                            <div className=' absolute top-10 right-2'>
                                {
                                    showPassword ? <IoIosEye className='text-2xl text-richblack-100' onClick={ () => setShowPassword(!showPassword)} /> : <IoIosEyeOff className='text-2xl text-richblack-100' onClick={ () => setShowPassword(!showPassword)} />
                                }
                            </div>

                        </label>

                        <label htmlFor='confirmPassword' className='relative'>

                            <p className='text-richblack-5'>Confirm password<sup>*</sup></p>

                            <input 
                                type={showConfirmPassword ? 'input' : 'password'}
                                name='ConfirmPassword'
                                id='confirmPassword'
                                value={formData.ConfirmPassword}
                                placeholder='Enter your new password'
                                onChange={changeHandler}
                                className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                            /> 

                            <div className=' absolute top-10 right-2'>
                                {
                                    showConfirmPassword ? <IoIosEye className='text-2xl text-richblack-100' onClick={ () => setShowConfirmPassword(!showConfirmPassword)} /> : <IoIosEyeOff className='text-2xl text-richblack-100' onClick={ () => setShowConfirmPassword(!showConfirmPassword)} />
                                }
                            </div>       

                        </label>

                        <button className='flex justify-center items-center mt-4 gap-2 rounded-lg px-6 py-3 bg-yellow-50 text-black font-semibold text-base'>
                            Reset Password
                        </button>

                    </form>

                    <Link to={"/login"} className='w-fit text-richblack-100 flex items-center'> <IoIosArrowRoundBack className='text-2xl font-bold' />  Back to login</Link>

                </div>
            )
        }

    </div>
  )
}

export default UpdatePassword;
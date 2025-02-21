import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import CTAButton from "../components/core/HomePage/Button";
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgetPassword = () => {


    const[emailSent, setEmailSent] = useState(false);
    const[email, setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
    <div className=' flex justify-center items-center min-h-[calc(100vh-3.5rem)]'>
        
        {
            loading ? (<div className='spinner'></div>) : (
                <div className='flex w-[30%] flex-col justify-center gap-8'>

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-richblack-5 text-2xl font-semibold'>
                            {
                                emailSent ? "Check email" : "Reset your password"
                            }
                        </h1>
                        
                        <p className='text-richblack-300'>
                            {
                                emailSent ? `We have sent the reset email to ${email}` : "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            }
                        </p>
                    </div>

                    <form className='flex flex-col gap-10' onSubmit={submitHandler}>

                        {
                            !emailSent && (
                                <label htmlFor='email'>
                                    <p className='text-richblack-25'>Email Address</p>
                                    <input 
                                        type='email'
                                        required
                                        name='Email'
                                        value={email}
                                        id='email'
                                        placeholder='Enter Your Email Address'
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                                    />
                                </label>
                            )
                        }

                        <button className='flex justify-center items-center gap-2 rounded-lg px-6 py-3 bg-yellow-50 text-black font-semibold text-base'>
                            {
                                emailSent ? "Resend Email" : "Reset Password"
                            }
                        </button>

                        {/* <CTAButton active={true} linkTo={'submit'} type='submit'>
                        </CTAButton> */}

                    </form>

                    <Link to={"/login"} className='w-fit text-richblack-100 flex items-center'> <IoIosArrowRoundBack className='text-2xl font-bold' />  Back to login</Link>

                </div>
            )
        }

    </div>
  )
}

export default ForgetPassword;
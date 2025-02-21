import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { RxCountdownTimer } from "react-icons/rx";
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";

import { signUp, sendOtp } from '../services/operations/authAPI';


const VerifyEmail = () => {

    const {signupData, loading} = useSelector( (state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");

    useEffect( () => {
        if(!signupData){
            navigate("/signup");
        }
    }, [signupData, navigate]);   // point to be noted -> otherwise-error -> {"React Hook useEffect has missing dependencies: 'navigate' and 'signupData'. Either include them or remove the dependency array  react-hooks/exhaustive-deps"}

    const submitHandler = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

  return (
    <div className='min-h-[calc(100vh-3.5rem)] flex justify-center items-center'>
        
        {
            loading ? (<div className='spinner'></div>) :
            (
                <div className='w-[30%] flex flex-col gap-6'>

                   <div>
                        <h1 className='text-richblack-5 text-3xl font-semibold'>Verify Email</h1>
                        <p className='text-lg text-richblack-300 font-semibold'>A verification code has been sent to you. Enter the code below</p>
                   </div>


                    <form onSubmit={submitHandler} className='flex flex-col gap-6'>
                        <OTPInput 
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (<input {...props}   placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                                }}                     
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />)}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }}
                        />

                        <button type='submit' className='w-full  mt-4 gap-2 rounded-lg px-6 py-3 bg-yellow-50 text-black font-semibold text-base'>
                                Verify Email
                        </button>
                    </form>




                    <div className='flex justify-between'>
                        <Link to={"/login"} className='w-fit text-richblack-100 flex items-center'> <IoIosArrowRoundBack className='text-2xl font-bold' />  Back to login</Link>

                        <button onClick={ () => dispatch(sendOtp(signupData.email,navigate))} className='w-fit gap-2 text-blue-300 flex items-center' >
                        <RxCountdownTimer className='text-blue-300 text-lg' />
                            Resend it
                        </button>
                    </div>

                </div>
            )

        }

    </div>
  )
}

export default VerifyEmail;
import React, { useState } from 'react'
import toast from 'react-hot-toast';

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';

// import { signUp } from "../../../services/operations/authAPI";
import { sendOtp } from "../../../services/operations/authAPI";

import {setSignupData} from "../../../slices/authSlice";
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {


    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", });

    const navigate = useNavigate();
    
    const changeHandler= (event) => {
        
        setFormData( (prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }
    
    const [accountType, setAccounType] = useState("Student");
    // const [profession, setProfession] = useState(true);
    // // true -> student && false -> Instructor
    // function changeProfessionHandler () {
    //     setProfession(!profession);

    //     if(profession){
    //         setAccounType("Student");
    //     }
    //     else {
    //         setAccounType("Instructor");
    //     }
    //     console.log(profession);
    // }



    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { password, confirmPassword} = formData;


    const submitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        //Setting signup data to state
        //To be used after OTP verification
        dispatch(setSignupData(signupData));
        //send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));

        //Reset 
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        setAccounType("Student");
    }

  return (
    <div className='flex flex-col gap-5'>

        <div className="bg-[#161D29] flex p-1 rounded-full text-white gap-3 w-max">
            <button className={`rounded-full py-2 px-5 text-lg ${accountType === "Student" ? "bg-richblack-900" : "bg-[#161D29] text-gray-400"}`  } onClick={ () => setAccounType("Student")}>Student</button>
            <button className={`rounded-full py-2 px-5 text-lg ${accountType === "Instructor" ? "bg-richblack-900" : "bg-[#161D29] text-gray-400"}` } onClick={ () => setAccounType("Instructor")}>Instructor</button>
        </div>


        <form onSubmit={submitHandler} className='flex flex-col gap-5'>

            {/* for name */}
            <div className='flex justify-between'>
                <label htmlFor='firstName' className='w-[48%]'>
                    <p className='text-richblack-5 text-sm'>First Name<sup>*</sup></p>
                    <input 
                        type='input'
                        required
                        name='firstName'
                        placeholder='Enter first name'
                        value={formData.firstName}
                        onChange={changeHandler} 
                        id='firstName'
                        className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-white placeholder:text-richblack-300 outline-none'  
                        />
                </label>


                <label htmlFor='lastName' className='w-[48%]'>
                    <p className='text-richblack-5 text-sm'>Last Name<sup>*</sup></p>
                    <input 
                        type='input'
                        required
                        name='lastName'
                        placeholder='Enter last name'
                        value={formData.lastName}
                        onChange={changeHandler} 
                        id='lastName'
                        className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-white placeholder:text-richblack-300 outline-none'  
                        />
                </label>
            </div>
        
        
            <label htmlFor='email'>
                <p className='text-richblack-5 text-sm'>Email Address<sup>*</sup></p>
                <input 
                    type='email'
                    required
                    name='email'
                    placeholder='Enter email address'
                    value={formData.email}
                    onChange={changeHandler} 
                    id='email'
                    className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-white placeholder:text-richblack-300 outline-none'  
                    />
            </label>


            {/* for password */}
            <div className='flex justify-between'>
                <label htmlFor='password' className='relative w-[48%]'>
                    <p className='text-richblack-5 text-sm'>Create Password<sup>*</sup></p>
                    <input 
                        type= {showPassword ? "input" : "password"}
                        required
                        name='password'
                        placeholder='Enter password'
                        value={formData.password}
                        onChange={changeHandler} 
                        id='password'  
                        className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-white placeholder:text-richblack-300 outline-none'  
                        />

                        <div className=' absolute top-9 right-2'>
                            {
                                showPassword ? <IoIosEye className='text-2xl text-richblack-100' onClick={ () => setShowPassword(!showPassword)} /> : <IoIosEyeOff className='text-2xl text-richblack-100' onClick={ () => setShowPassword(!showPassword)} />
                            }
                        </div>
                    {/* <div> <p>Forget Password</p> </div> */}
                </label>

                <label htmlFor='confirmPassword' className='relative w-[48%]'>
                    <p className='text-richblack-5 text-sm'>Confirm Password<sup>*</sup></p>
                    <input 
                        type= {showConfirmPassword ? "input" : "password"}
                        required
                        name='confirmPassword'
                        placeholder='Enter password'
                        value={formData.confirmPassword}
                        onChange={changeHandler} 
                        id='confirmPassword'  
                        className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-white placeholder:text-richblack-300 outline-none'  
                        />

                        <div className=' absolute top-9 right-2'>
                            {
                                showConfirmPassword ? <IoIosEye className='text-2xl text-richblack-100' onClick={ () => setShowConfirmPassword(!showConfirmPassword)} /> : <IoIosEyeOff className='text-2xl text-richblack-100' onClick={ () => setShowConfirmPassword(!showConfirmPassword)} />
                            }
                        </div>
                    {/* <div> <p>Forget Password</p> </div> */}
                </label>
            </div>


                
            <button className='w-full mt-5 bg-yellow-50 text-center flex justify-center item-center text-black font-semibold  p-2 rounded-lg'>Create Account</button>
        
        </form>
        
        
    </div>
  )
}

export default SignupForm;
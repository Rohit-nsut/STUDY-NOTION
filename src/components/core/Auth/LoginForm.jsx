import React, { useState } from 'react'

import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";


// main points
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { login } from "../../../services/operations/authAPI";


const LoginForm = () => {


    const [formData, setFormData] = useState({ email: "", password: "" });

    const changeHandler= (event) => {

        setFormData( (prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const [showPassword, setShowPassword] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {email, password} = formData;

    const submitHandler = (event) => {
        event.preventDefault();

        // Main line
        dispatch(login(email, password, navigate));
    }

  return (
    <div>
        
        <form onSubmit={submitHandler} className='flex flex-col gap-5'>


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

            <label htmlFor='password' className='relative'>
                <p className='text-richblack-5 text-sm'>Password<sup className=''>*</sup></p>
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
                <div className=' w-full flex justify-end mt-1'> <p className=' cursor-pointer text-blue-200 text-xs font-medium text-center'> <Link to={"/forget-password"}>Forget Password</Link> </p> </div>
            </label>


                
            <button type='submit' className='w-full mt-5 bg-yellow-50 font-semibold text-center flex justify-center item-center text-black  p-2 rounded-lg'>Sign In</button>

        </form>

    </div>
  )
}

export default LoginForm;
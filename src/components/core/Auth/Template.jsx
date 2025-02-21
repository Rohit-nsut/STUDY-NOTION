import React from 'react';

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

import imageFrame from "../../../assets//Images/frame.png";
import { useSelector } from 'react-redux';

const Template = ({heading, subHeading1, subHeading2, image, formType}) => {

    // const [loading, setLoading] = useState(false);
    const {loading} = useSelector( (state) => state.auth);


  return (
    <div className=' flex items-center w-full min-h-[calc(100vh-3.5rem)]'>

        
        {
            loading ? (<div className='flex w-full items-center justify-center'> <div className='spinner' ></div> </div>) : (
                <div className='w-10/12 my-10 flex mx-auto justify-between '>

                    <div className='flex flex-col gap-5 w-[37%]'>

                        <h1 className='text-3xl font-bold text-richblack-5'> {heading} </h1>

                        <div className='flex flex-col'>
                            <p className='text-base font-medium text-richblack-200'> {subHeading1} </p>
                            <p className='text-lg font-medium text-blue-100 font-edu-sa'> {subHeading2} </p>
                        </div>

                        <div>
                            {
                                formType === "Login" ? <LoginForm /> : <SignupForm />
                            }
                        </div>



                    </div>

                    <div className=' z-0 relative'>
                        <img src={image} alt='logo' loading='lazy' className='lg:w-[450px]' />
                        <img src={imageFrame} alt='frame' loading='lazy' className='lg-w[45opx] -z-10 absolute top-4 left-4' />
                    </div>

                </div>
            )
        }
        

    </div>
  )
}

export default Template;
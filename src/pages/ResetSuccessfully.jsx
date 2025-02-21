import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

const ResetSuccessfully = () => {
  return (
    <div className=' flex justify-center items-center min-h-[calc(100vh-3.5rem)]'>

        <div>
            <h1>Reset Complete</h1>
            <p>All done! We have sent an email to {} to confirm</p>

            <button className='flex justify-center items-center mt-4 gap-2 rounded-lg px-6 py-3 bg-yellow-50 text-black font-semibold text-base'>
                Return to login
            </button>
            <Link to={"/login"} className='w-fit text-richblack-100 flex items-center'> <IoIosArrowRoundBack className='text-2xl font-bold' />  Back to login</Link>
        </div>
        
    </div>
  )
}

export default ResetSuccessfully;
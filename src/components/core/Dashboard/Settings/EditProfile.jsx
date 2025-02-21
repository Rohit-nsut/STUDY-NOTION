import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';


const EditProfile = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();


  const submitHandler = () => {

  }


  useEffect( (isSubmitSuccessful) => {
    reset({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      contactNumber: "",
      about: "",
    })

  }, [reset, isSubmitSuccessful]);


  return (
    <div className='flex flex-col gap-5'>
        
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-7' >

            <div className='flex w-full flex-col gap-7 justify-between  text-richblack-50 bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'>
              
              <h1 className=' text-lg text-blue-300 font-semibold'>Profile Information</h1>

              <div className='flex flex-col gap-4'>

                <div className='flex justify-between'>

                  {/* First Name */}
                  <label htmlFor='firstName' className='lg:w-[49%]'>
                    <p>First Name</p>
                    <input 
                      type='text'
                      id='firstName'
                      name='firstName'
                      placeholder='Enter First Name'
                      className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                      {...register("firstName", {required: true})} 
                    />
                    {
                      errors.firstName && (
                        <span>Please Enter Your Name</span>
                      )
                    }
                  </label>

                  <label htmlFor='lastName' className='lg:w-[49%]'>
                    <p>Last Name</p>
                    <input 
                      type='text'
                      id='lasttName'
                      name='lastName'
                      placeholder='Enter Last Name'
                      className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                      {...register("lastName", {required: true})} 
                    />
                    
                  </label>

                  </div>


                  <div className='flex justify-between items-center'>

                  <label htmlFor='dateOfBirth' className='lg:w-[49%]'>
                    <p>Date Of Birth</p>
                    <input 
                      type='date'
                      id='dateOfBirth'
                      name='dateOfBirth'
                      placeholder='dd//mm//yyyy'
                      className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                      {...register("dateOfBirth")} 
                    />
                    {
                      errors.firstName && (
                        <span>Please Enter Your Name</span>
                      )
                    }
                  </label>

                  <label htmlFor="gender" className='lg:w-[49%]'>
                    <p>Gender</p>
                    <select
                      id="gender"
                      name="gender"
                      defaultValue="male"
                      className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                      {...register("gender", { required: "Please select your gender" })}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      
                    </select>
                    {errors.gender && <span>{errors.gender.message}</span>}
                  </label>


                  </div>


                  <div className='flex justify-between'>

                  <label htmlFor='contactNumber' className='lg:w-[49%]'>
                    <p>Contact Number</p>
                    <input 
                      type='text'
                      id='contactNumber'
                      name='contactNumber'
                      placeholder='Enter Contact Number'
                      className='p-3  rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                      {...register("contactNumber", {required: true})} 
                    />
                    {
                      errors.contactNumber && (
                        <span>Please Enter Contact Number</span>
                      )
                    }
                  </label>

                  <label htmlFor='about' className='lg:w-[49%]'>
                    <p>About</p>
                    <input 
                      type='text'
                      id='about'
                      name='about'
                      placeholder='Enter Bio Details'
                      className='p-3 rounded-lg bg-richblack-700 w-full mt-1 shadow-sm text-white shadow-richblack-50 placeholder:text-richblack-300 outline-none'
                      {...register("about", {required: true})} 
                    />
                    
                  </label>

                </div>

              </div>
            </div>



          <div className='flex justify-end gap-2'>
            <button className='py-2 px-6 bg-richblack-700 text-richblack-5 rounded-lg'>Cancel</button>
            <IconBtn text={"Save"} type="submit" />
          </div>
          
        </form>

    </div>
  )
}

export default EditProfile;
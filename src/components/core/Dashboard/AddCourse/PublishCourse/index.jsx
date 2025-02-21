import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { FaAnglesLeft } from "react-icons/fa6";
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
// import {COURSE_STATUS} from '../../../../../utils/constants';


const PublishCourse = () => {


    const {register, handleSubmit, setValue, getValues} = useForm();

    const dispatch = useDispatch();
    const {course} = useSelector( (state) => state.course);
    const {token} = useSelector ( (state) => state.auth);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
 
    useEffect( () => {
        if(course?.status === "Published") {
            setValue("publish", true)
        }
    },[course,setValue]);


    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {

        console.log("publish", getValues("publish"));

        // if((course?.status === 'Published' && getValues("publish") === true) || (course?.status === 'Draft' && getValues("publish") === true)){
        //     goToCourses();
        //     return;
        // }

        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("publish") ? "Published" : "Draft";

        formData.append("status",courseStatus);
        setLoading(true);

        const result = await editCourseDetails(formData, token);
        if(result) {
            goToCourses();
        }
        setLoading(false)

    }

    const onSubmit = async () => {
        // setLoading(true)

       handleCoursePublish();
    }

  return (
    <div className='flex flex-col gap-10 justify-between bg-richblack-800 px-9 py-7 rounded-lg border-2 border-richblack-700'>
        <p className='text-3xl text-richblack-5 font-semibold'>Publish Settings</p>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>

            <div>
                <label htmlFor='publish' className='flex gap-5'>

                    <input
                        type='checkbox'
                        id='publish'
                        name='publish'
                        className={`w-6 h-6 my-auto appearance-none bg-richblack-800 rounded-md border-2 border-blue-300 checked:bg-richblack-50  checked:after:content-['✓'] checked:after:font-bold checked:after:flex checked:after:justify-center checked:after:items-center checked:after:text-black`} 
                        {...register("publish")}
                    />
                    {/* {errors.publish && (<span>This field is required**</span>)} */}
                    <p className='text-xl text-richblack-300 font-semibold'>Make this Couse Public</p>
                        
                </label>
            </div>
            
            <div className='flex justify-between'>
                <button 
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='bg-richblack-900 py-2 px-5 font-semibold flex gap-2 items-center justify-center text-richblack-25 rounded-lg shadow-sm shadow-white'
                ><FaAnglesLeft/>Back</button>

                <IconBtn disabled={loading} text={"Save and Publish"} />
            </div>

        </form>
        
    </div>
  )
}

export default PublishCourse;
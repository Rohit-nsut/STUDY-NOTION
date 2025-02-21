import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';


const EnrolledCourses = () => {

  const {token} = useSelector( (state) => state.auth);

  // const {getUserEnrolledCourses} = 
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = useCallback(async() => {
    try{
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    }
    catch(error){
      console.log("Unable to Fetch Enrolled Courses");
    }
  }, [token] )


  useEffect( () => {
    getEnrolledCourses(); 
  },[getEnrolledCourses]);



  const CourseDuration = ({ data }) => {
    const calculateTotalDuration = (courseContent) => {
      let totalSeconds = 0;
  
      courseContent?.forEach((section) => {
        section.subSection?.forEach((sub) => {
          totalSeconds += parseFloat(sub.timeDuration) * 60; // Convert minutes to seconds
        });
      });
  
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds % 60);
  
      return `${minutes} min ${seconds} sec`;
    };
  
    return <>{calculateTotalDuration(data.courseContent)}</>;
  };


  return (
    <div className='text-white py-8 px-10 flex flex-col gap-5'>

        <div className='flex flex-col gap-3'>
          <h1>Home / Dashboard / <span className='text-yellow-50'>Enrolled Courses</span></h1>
          
          <h1 className='text-pink-200 font-semibold text-3xl'>Enrolled Courses</h1>

        </div>


        {
          !enrolledCourses ? (<div className='spinner'></div>) : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) : (
            <div className='flex flex-col'>

              <div className='flex px-4 py-5 bg-richblack-700 border border-richblack-600 rounded-t-lg text-richblack-50'>
                <p className='w-1/2'>Course Name</p>
                <p className='w-1/5'>Duration</p>
                <p className='w-1/5'>Progress</p>
              </div>
 

              {/* cards */}
              {
                enrolledCourses.map((course,index) => (
                   <div className=' flex border border-richblack-700 p-4'>
                    <div className='w-1/2 flex cursor-pointer gap-5' onClick={ () =>  navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )}>

                      <div className='rounded-lg'>
                        <img src={course.thumbnail} alt="Course logo" className='w-16 h-16 object-cover border border-blue-300 rounded-lg'/>
                      </div>

                      <div className='flex flex-col justify-evenly'>
                        <p className='text-richblack-5'>{course.courseName}</p>
                        <p className='text-richblack-200'>{course.courseDescription}</p>
                      </div>

                    </div>

                    <div className='w-1/5 text-richblack-5 flex items-center'>
                      <CourseDuration data={course} />
                    </div>

                    <div className='w-1/5 flex flex-col justify-center'>
                      <div className='flex flex-col gap-2'>
                        <p>Progress: {course.progressPercentage || 0} % </p>
                        <ProgressBar 
                          completed={course.progressPercentage || 0}
                          height='8px'
                          isLabelVisible={false} 
                        /> 
                      </div>
                    </div>

                    <div className='flex items-center justify-center w-[10%] text-3xl text-blue-300'>
                      <HiOutlineDotsVertical className=' cursor-pointer' />
                    </div>

                   </div>
                ))
              }


            </div>
          )
        }

    </div>
  )
}

export default EnrolledCourses;
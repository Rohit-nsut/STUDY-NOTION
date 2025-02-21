import React from 'react'
import { FaCheck } from 'react-icons/fa';
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from './PublishCourse';

import { useSelector } from 'react-redux';


const RenderSteps = () => {

  const {step} = useSelector( (state) => state.course);


  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title : "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    }
  ]

  return (
    <div className='flex flex-col gap-10'>


      <div className='flex justify-center '>

        {
          steps.map( (item) => (
            <div className='flex flex-col items-center text-left  justify-center gap-2'>

              <div className='flex items-center '>

                  <div>
                    {
                      <div className={`w-28 ${step > item.id-1 && item.id !== 1 && ` border-yellow-50`}   ${item.id !== 1 ? `h-[1px] border-richblack-500` : `border-richblack-900`} border-t-2 border-dashed`}></div>
                    }
                  </div>

                <div className={`${step === item.id ? "bg-yellow-900 border-2 font-semibold border-yellow-50 text-yellow-50" : "border-richblack-700 bg-richblack-800 border-2 text-richblack-300"} p-2 rounded-full ${step > item.id && `bg-yellow-50 text-black border border-yellow-50`} w-10 h-10 flex items-center justify-center text-center` } >

                  {
                    step > item.id ? (<FaCheck className='text-sm text-black'/>) : (item.id)
                  }

                  </div>

                  <div>
                    {
                      <div className={`w-28  ${step > item.id && item.id !== 3 && ` border-yellow-50`}  ${item.id !== 3 ? `h-[1px] border-richblack-500` : `border-richblack-900`} border-t-2 border-dashed`}></div>
                    }
                  </div>

              </div>

                <>
                  <div className={`${step === item.id ? "text-richblack-5" : " text-richblack-300"}`}>
                    <p>{item.title}</p>
                  </div>
                </>
            </div>
          ) )
        }

      </div>


{/* 
      <div className='flex gap-36 px-12'>
        {
          steps.map( (item) => (
            <>
              <div>
                <p>{item.title}</p>
              </div>
            </>
          ))
        }
      </div> */}

      {step === 1 && <CourseInformationForm /> }
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
        
    </div>
  )
}

export default RenderSteps;
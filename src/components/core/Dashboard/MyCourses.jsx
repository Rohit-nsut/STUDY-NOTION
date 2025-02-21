import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { IoMdAdd } from "react-icons/io";
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { CiClock2 } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationModal from '../../common/ConfirmationModal';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../../utils/dateFormater';





const MyCourses = () => {

    const {token} = useSelector( (state) => state.auth);
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [confirmationalModal, setConfirmationalModal] = useState(null);

    
    
    useEffect( () => {
        const fetchCourses = async () => {
            // setLoading(true);
            const response = await fetchInstructorCourses(token);
    
            if(response){
                setCourses(response);
                // setLoading(false);
            }
    
        }

        fetchCourses();    

    },[token]);



    const deleteHandler = async (courseId) => {

        setLoading(true);
        console.log(5,courseId);
        const result = await deleteCourse({courseId,token});

        if(result) {
            toast.success("Course Deleted Successfully");
        }

        setConfirmationalModal(null);
        setLoading(false);
    }


  return (
    <div className=''>

        <div className='flex w-[80%] mx-auto flex-col gap-12 my-10'>

            <header className='flex justify-between items-center'>
                <p className='text-3xl text-richblack-25 font-semibold'>My Courses</p>
                <IconBtn text={"Add Courses"} onclick={ () => navigate("/dashboard/add-course")} children={<IoMdAdd className='text-lg' />} />
            </header>


            {/* courses */}
            <div className='px-3 flex flex-col gap-8'>

                {/* tags */}
                <div className='flex uppercase  font-semibold justify-between text-richblack-300'>
                    <h1 className='w-[65%]'>Courses</h1>
                    <div className='flex justify-between w-[30%]'>
                        <h1>Duration</h1>
                        <h1>Price</h1>
                        <h1>Actions</h1>
                    </div>
                </div>


                <div>

                    {
                        loading ? (<div className='spinner'></div>): 
                        courses?.length > 0 ? 
                        (<div className='flex flex-col gap-10 '>
                            {
                                courses?.map( (course) => (
                                    <div className='flex justify-between' key={course._id}>
        
                                        {/* image  and description */}
                                        <div className='text-richblack-5 w-[60%] flex rounded-md gap-5'>
        
                                            <div className='w-[40%] max-h-40'>
                                                <img src={course?.thumbnail} className='rounded-md lg:w-[240px] max-h-40 object-cover' alt='logo' loading='lazy' />
                                            </div>
        
                                            <div className='flex flex-col w-[60%] justify-between items-start'>
                                                <p> {course?.courseName} </p>
                                                <p> {course?.courseDescription} </p>
                                                <div className='flex gap-1'>
                                                    <p>Created:</p>
                                                    <p> 
                                                        {
                                                            formattedDate(course?.createdAt)
                                                        } 
                                                    </p>
                                                </div>

                                                <div className={`px-2 py-[2px] rounded-lg bg-richblack-700 flex gap-1 items-center`}>
                                                    {
                                                        course?.status === "Draft" ? <CiClock2 className='bg-pink-100 rounded-full' /> : <TiTick  className='bg-yellow-100 rounded-full'/>
                                                    }
                                                    <p className={`${course?.status === "Draft" ? `text-pink-100` : `text-yellow-100`}`}> {course?.status} </p>

                                                </div>
                                                
                                                                                  
                                            </div>
                                        </div>


                                        {/* Time-duration */}
                                        <div className='text-richblack-200 font-semibold w-[30%] justify-between flex items-start'>
                                            <p> 2hr 30min </p>
                                            <p>$ {course?.price} </p>
                                            <div className='flex  gap-2 text-xl w-20  justify-end'>
                                                <MdEdit onClick={ () => navigate(`/dashboard/edit-course/${course?._id}`)} className=' cursor-pointer' />
                                                <RiDeleteBinLine onClick={ () => setConfirmationalModal({
                                                                                    text1: "Are You Sure ? ",
                                                                                    text2: "You want to delete this Course",
                                                                                    btn1Text: "Delete",
                                                                                    btn2Text: "Cancel",
                                                                                    btn1Handler: () => deleteHandler(course?._id),
                                                                                    btn2Handler: () => setConfirmationalModal(null)
                                                                                })} className=' cursor-pointer' />
                                            </div>
                                        </div>
        
                                    </div>
                                ))
                            }
                        </div>) : (<div>No Courses Available</div>)
                    }

                </div>

                    {confirmationalModal && <ConfirmationModal modalData={confirmationalModal} />}
            </div>

        </div>

        
    </div>
  )
}

export default MyCourses;
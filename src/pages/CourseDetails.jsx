import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import CTAButton from "../components/core/HomePage/Button";
import { LuClock10 } from "react-icons/lu";
import { FaArrowPointer, FaChevronDown } from "react-icons/fa6";
import { FaMobileRetro } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";
import FooterSection from '../components/common/FooterSection';
import { buyCourse } from '../services/operations/studentFeatureAPI';
import { useDispatch, useSelector } from 'react-redux';

import {formattedDate} from "../utils/dateFormater";
import ConfirmationModal from "../components/common/ConfirmationModal";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { FaChevronUp } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";


import { addToCart } from '../slices/cartSlice';
import ReviewSlider from '../components/common/ReviewSlider';

const CourseDetails = () => {
    
    
    const {courseId} = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    const {user} = useSelector( (state) => state.profile);
    const {token} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationalModal] = useState(null);
    
    
    useEffect( () => {
        const count = GetAvgRating(courseData?.data?.ratingAndReviews);
        setAvgReviewCount(count);
    },[courseData])

    useEffect( () => {

        const getCourseDetail = async () => {
            // let resonse
            try {
                setLoading(true)
                const result = await fetchCourseDetails(courseId);

                if(!result){
                    console.log("Error while fetching course details");
                }

                setCourseData(result);
                console.log("r",result);
            } 
            catch (error) {
                console.log(error);
            }
        }

        getCourseDetail();
        setLoading(false);
        
    },[courseId]);


    const [totalNoOfLecture, setTotalNoOfLecture] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const [openSection, setOpenSection] = useState([]);
    // const [open, setOpen] = useState(false);
    const [allSection, setAllSection] = useState([]);

    useEffect( () => {

        let lectures = 0;
        let length = 0;
        const all = [];

        courseData?.data?.courseContent?.forEach( (sec) => {
            lectures += sec.subSection.length || 0;
            all.push(sec._id);
        })

        courseData?.data?.courseContent?.forEach( (sec) => {
            sec?.subSection?.forEach( (len) => {
                length += (Number(len.timeDuration)) || 0;
                // all.push(len._id);
                // console.log(len._id);
            })
        } )

        

        setTotalNoOfLecture(lectures);
        setTotalDuration(length);
        // console.log(all);
        setAllSection(all);
        // console.log("len",totalDuration);

    },[courseData]);

    
    
    const handleBuyCourse = () => {
        if(token) {
            console.log(1);
            buyCourse(token, [courseId], user, navigate, dispatch)
            return;
        }
        
        else{
            
            setConfirmationalModal({
                text1: "You are not Logged in",
                text2: "Please Login to Purchase the Course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationalModal(null),
            });
            
        }
    }
    
    
    const handleAddToCart = (course) => {
        
        if(user && user?.accountType === "Instructor"){
            toast.error("You are an Instructor, You can't Add to Cart");
            return;
        }
        
        if(token) {
            dispatch(addToCart(course));
            return;
        }
        
        setConfirmationalModal({
            text1: "You are not Logged in",
            text2: "Please Login to Add to Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationalModal(null),
        });
    }
    
    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }
    
    
    const openHandler = (id) => {
        
        if(openSection.includes(id)) {
            const newSection = openSection.filter( (i) => i !== id);
            setOpenSection(newSection);
        }
        else {
            const newOpenSection = [...openSection,id];
            console.log("n",newOpenSection);
            setOpenSection(newOpenSection);
        }
        
    }
    
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const sec = Math.floor((seconds % 3600) % 60);
        
        if(hours === 0){
            if(minutes === 0){
                return `${sec}s`;
            }
            return `${minutes}m ${sec}s`;
        }
        
        return `${hours}h ${minutes}m ${sec}s`;
    }



    function duration (data) {
        let time = 0;

        data?.subSection?.forEach( (len) => {
            time += Number(len?.timeDuration) || 0;
        })

        return formatTime(Number(time));
    }

    



  return (
    <div>
        
        {
            loading ? (<div className='spinner'></div>) : (

                <div>

                    <div className='bg-richblack-800'>
                        <div className='flex w-10/12 mx-auto justify-between gap-3 py-6 relative '>

                            <div className='flex flex-col gap-3 lg:w-[935px] pr-10 border-r  border-richblack-600'>
                                <p className='text-richblack-300'> {`Home / Catalog / `} 
                                    <span className='text-yellow-50'>
                                        {courseData?.data?.category?.name}
                                    </span>
                                </p>
                                <p className='text-richblack-5 text-3xl font-semibold'> {courseData?.data?.courseName} </p>
                                <p className='text-richblack-300'> {courseData?.data?.courseDescription} </p>
                                <div className='flex gap-2'>
                                    <span className='text-yellow-50 font-semibold'> {avgReviewCount || 0} </span>
                                    <RatingStars Review_Count={avgReviewCount} />
                                    {/* <span className='text-yellow-50 font-semibold'> {courseData?.data?.ratingAndReviews?.length} </span> */}
                                    <span className='text-richblack-50'>{courseData?.data?.studentsEnrolled?.length || 0} Students</span>
                                </div>
                                <p className='text-richblack-50'>Created by {courseData?.data?.instructor?.firstName} {courseData?.data?.instructor?.lastName}</p>
                                <p className='text-richblack-50'>Created At {`${formattedDate(courseData?.data?.createdAt)}`}   </p>
                            </div>
                            
                            
                            {/* Card */}
                            <div className='bg-richblack-700 w-80 lg:max-h-[670px] rounded-lg absolute right-0'>

                                <div className='w-full p-3'>
                                    <img src={courseData?.data?.thumbnail} alt='Course Logo' loading='lazy' className=' border-2 border-blue-300 object-cover rounded-lg w-full h-52' />
                                </div>

                                <div className=' px-3 py-2 flex flex-col gap-3'>
                                    <p className='text-richblack-5 text-2xl font-semibold'> Rs. {courseData?.data?.price} </p>

                                    {
                                        (!courseData?.data?.studentsEnrolled?.includes(user?._id)) && (

                                            <div onClick={ () => handleAddToCart(courseData?.data)}>
                                                <CTAButton active={true}>
                                                    Add to Cart
                                                </CTAButton>
                                            </div>
                                        )
                                    }
                                    <div onClick={ user && courseData?.data?.studentsEnrolled?.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : () => handleBuyCourse()}>
                                        <CTAButton active={false}>
                                            {
                                                user && courseData?.data?.studentsEnrolled?.includes(user?._id) ? "Go To Course" : "Buy Now"
                                            }
                                        </CTAButton>
                                    </div> 
                                    
                                    <p className='text-richblack-50 text-center'>30-Day Money-Back Guarantee</p>
                                    
                                    <div>
                                        <p className='text-richblack-25 pb-2'>This Course Includes: </p>


                                        <div className='flex flex-col gap-2 text-[#06D6A0]'>

                                        <details>
                                            <summary className='cursor-pointer text-brown-500'>Course Details</summary>
                                            <p className='flex items-center gap-2'> <LuClock10 /> 8 hours on-demand video</p>
                                            <p className='flex items-center gap-2'> <FaArrowPointer /> Full Lifetime access</p>
                                            <p className='flex items-center gap-2'> <FaMobileRetro /> Access on Mobile and TV</p>
                                            <p className='flex items-center gap-2'> <FaClipboardCheck /> Certificate of completion</p>
                                        </details>

                                        </div>
                                    </div>

                                    <button className='text-yellow-50 my-2 py-2 border flex items-center justify-center gap-3 border-blue-300 rounded-lg' onClick={ () => handleShare()}>
                                        <FaShareSquare />
                                        Share
                                    </button>

                                </div>

                            </div>



                        </div>
                    </div>

                    <div className='w-10/12 mx-auto  flex flex-col gap-6 my-8'>

                        <div className='lg:w-[935px] flex flex-col gap-12'>
                            
                            <div className='px-6 py-8 text-richblack-50 flex flex-col gap-3 border border-richblack-600'>
                                <p className='text-richblack-5  text-3xl font-semibold'>What you'll learn</p>
                                <div>
                                    {
                                        courseData?.data?.whatYouWillLearn
                                    }
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>

                                <div className='flex flex-col gap-1'>
                                    <p className='text-richblack-5 text-2xl font-semibold'>Course Content</p>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex text-richblack-300'> {courseData?.data?.courseContent?.length} sections 
                                            <ul className='flex pl-6 list-disc gap-6'>
                                                <li> {totalNoOfLecture} lectures</li>
                                                <li> {formatTime(Number(totalDuration))} total length </li>
                                            </ul>
                                        </div>
                                        <p className='text-yellow-50 cursor-pointer' 
   onClick={() => setOpenSection(openSection.length === (courseData?.data?.courseContent?.length) ? [] : allSection)}>
   {openSection.length === (courseData?.data?.courseContent?.length) ? "Collapse all sections":  "Expand all sections"}
</p>
                                    </div>
                                </div>


                                <div className='text-richblack-5 border border-richblack-600 border-opacity-60'>

                                    {
                                        courseData?.data?.courseContent?.map( (data) => (

                                            <div>

                                                <div className='px-10 py-5 flex cursor-pointer justify-between bg-richblack-700 border border-richblack-600  border-opacity-60 ' onClick={() => openHandler(data._id)}>
                                                    <div className=' flex items-center gap-2'>
                                                        {
                                                            !openSection.includes(data._id) ? <FaChevronDown className='text-richblack-200'/> : <FaChevronUp className='text-richblack-200' />
                                                        }
                                                        <p> {data.sectionName} </p>
                                                    </div>

                                                    <div className='flex gap-2'>
                                                        <p className='text-yellow-50'> {data?.subSection?.length} lectures </p>
                                                        <p> {duration(data)} </p>
                                                    </div>
                                                </div>

                                                <div className={`border-l border-richblack-600 border-r ${openSection.includes(data._id) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} border-opacity-60 transition-all transition- duration-[2s] ease-linear`}>

                                                    {
                                                        openSection.includes(data._id) && (
                                                            <div className='py-5 px-10'>

                                                                {
                                                                    data?.subSection?.map( (sub) => (
                                                                        <div className='flex justify-between'>
                                                                            <div className="flex items-center gap-2 cursor-pointer">
                                                                                <RiComputerLine className="text-richblack-25 bg-richblack-800 transition-transform duration-300" />
                                                                                {sub.title}
                                                                            </div>
                                                                            <div>
                                                                                {formatTime(Number(sub.timeDuration))}
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }

                                                            </div>
                                                        )
                                                    }

                                                </div>

                                            </div>


                                        ))
                                    }

                                </div>

                            </div>

                        </div>

                        <div className='flex flex-col gap-2'>

                            <p className='text-richblack-5 text-2xl font-semibold'>Author</p>
                            <div className='flex gap-3 items-center'>
                                <div className=' rounded-full w-10 h-10'>
                                    <img src={courseData?.data?.instructor?.image} alt='Instructor Logo' className='w-10 h-10 rounded-full' loading='lazy' />
                                </div>
                                <p className='text-pink-300 text-lg font-semibold'> {courseData?.data?.instructor?.firstName} {courseData?.data?.instructor?.lastName} </p>
                            </div>
                            <p></p>

                        </div>

                    </div> 



                    <ReviewSlider />

                    <FooterSection />

                </div>

             )
        }
        
        {confirmationModal && <ConfirmationModal modatData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails;
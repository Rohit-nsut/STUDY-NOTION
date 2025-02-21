import React from 'react'
import { GiNinjaStar } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
// import toast from 'react-hot-toast';


const RenderCartCourses = () => {

    const {cart} = useSelector( (state) => state.cart);
    const dispatch = useDispatch();


    const handleRemove = (course) => {
        dispatch(removeFromCart(course._id));
        // toast.success("Remove from Cart");
        return;
    }

  return (
    <div className='w-[70%] flex flex-col'>

        {
            cart.map( (course, index) => (
                <div className='flex w-full justify-between gap-5 py-6 border-t border-richblack-700'>

                    <div className='w-[30%]  rounded-lg'>
                        <img src={course?.thumbnail} alt='Course Logo' loading='lazy' className='w-full rounded-lg object-cover' />
                    </div>

                    <div className='w-[50%]'>
                        <h1 className='text-lg text-richblack-5'>{course?.courseName}</h1>
                        <p className='text-richblack-300'>{course?.category?.name}</p>
                        <div className='flex items-center gap-2 text-yellow-50'>
                            {/* change it */} <p>4.5</p>

                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            />

                            <p> {course?.ratingAndReviews.length} </p>
                        </div>

                    </div>

                    <div className='flex flex-col gap-5'>

                        <button onClick={ () => handleRemove(course)} className='py-2 px-3 bg-richblack-800 flex rounded-lg text-pink-200 items-center gap-2 border border-richblack-700'>
                            <RiDeleteBinLine className='text-lg' /> <p>Remove</p>
                        </button>

                        <div className='text-2xl text-yellow-50 font-semibold'>
                            Rs. {course?.price}
                        </div>

                    </div>

                </div>
            ))
        }
        
    </div>
  )
}

export default RenderCartCourses;
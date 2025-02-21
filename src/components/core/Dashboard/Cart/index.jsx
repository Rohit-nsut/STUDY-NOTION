import React from 'react'
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {total, totalItems} = useSelector( (state) => state.cart);



  return (
    <div className='flex flex-col text-white m-7 gap-8 w-[87%]'>
        
        <div className='flex flex-col gap-2'>
            <p className='text-richblack-300'> {`Home / Catalog / `} <span className='text-yellow-50'> Cart</span> </p>
            <h1 className='text-3xl font-semibold text-pink-200'> Your Cart </h1>
        </div>

        <div className='flex flex-col gap-2'>
            <p className='text-richblack-300'>{totalItems} Courses in Cart</p>

            <div className='border-t border-richblack-700'>

                {
                    total > 0 ? (
                        <div className='flex justify-between items-start'>
                            <RenderCartCourses />
                            <RenderTotalAmount />
                        </div>
                    ) : (
                        <p className='mt-5 text-center font-semibold text-3xl text-blue-300'>
                            Your Cart is Empty
                        </p>
                    )
                }

            </div>
        </div>


    </div>
  )
}

export default Cart;
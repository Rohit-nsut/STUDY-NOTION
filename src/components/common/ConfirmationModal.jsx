import React from 'react'
import IconBtn from './IconBtn';

const ConfirmationModal = ({modalData}) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-richblack-500 bg-opacity-40">
        
        <div className='bg-richblack-900 p-5 flex flex-col border-2 border-richblack-300 rounded-lg min-w-[300px]'>
            <p className='text-lg font-semibold text-richblack-5'>
                {modalData.text1}
            </p>
            <p className='text-richblack-300'>
                {modalData.text2}
            </p>
            <div className='flex gap-3 mt-8'>
                <IconBtn
                    onclick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                />
                <button onClick={modalData?.btn2Handler} className='py-2 px-4 bg-richblack-300 rounded-lg text-black font-semibold'>
                    {modalData?.btn2Text}
                </button>

            </div>
        </div>

    </div>
  )
}

export default ConfirmationModal;
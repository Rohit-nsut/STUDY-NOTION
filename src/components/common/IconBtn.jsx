import React from 'react'



const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <div>
        <button 
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={`flex items-center ${outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50 text-richblack-900" } cursor-pointer gap-x-2 rounded-md py-2 px-6 font-semibold  ${customClasses}`}
        >
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>

                        {children}
                    </>
                ) : (text)
            }
        </button>
    </div>
  )
}

export default IconBtn;
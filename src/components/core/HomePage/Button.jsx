import React from "react";
import { Link } from 'react-router-dom';


const Button = ({children, linkTo, active}) => {

    return (
        <div>
            <Link to={linkTo}>
                <div className={`flex justify-center items-center gap-2 rounded-lg px-6 py-3 ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 shadow-sm text-richblack-5 shadow-white"} font-semibold text-base transition-all duration-200 hover:scale-95`}>
                    {children}
                </div>
            </Link>
        </div>
    );

}


export default Button ;
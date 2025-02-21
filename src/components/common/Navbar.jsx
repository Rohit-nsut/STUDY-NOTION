import React from 'react'
import { useState, useEffect } from 'react';
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from '../../data/navbar-links';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {AiOutlineShoppingCart} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

import { matchPath } from 'react-router-dom';

import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI';


// const subLinks = [
//     {
//         title: "python",
//         link: "/catalog/python"
//     },
//     {
//         title: "web dev",
//         link: "/catalog/web-development"
//     },
// ];

const Navbar = () => {

    // const [page, setPage] = useState("Home");

    
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }


    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async () => {
        try{
            const result = await fetchCourseCategories()

            // console.log("Sublinks: ", result);

            setSubLinks(result);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        fetchSublinks();
    }, []); 


  return (
    <div className={`flex border-b-[1px] z-10  ${location.pathname !== "/" ? `bg-richblack-800` : `bg-richblack-900`} border-b-richblack-700 h-14 items-center justify-center`}>

        <div className='w-10/12 flex justify-between items-center '>
            
            <Link to={"/"} >
                <img src={studyNotionLogo} alt="studyNotionLogo" width={170} height={35} loading='lazy' />
            </Link>


            {/* page Links */}
            <div className='text-richblack-25 flex gap-7 font-medium'> 
                {
                    NavbarLinks.map( (link, index) => (
                        <div key={index}>
                            {
                                link.title === "Catalog" ? (<div className=' relative flex items-center group cursor-pointer gap-[5px]'>
                                    <p>{link.title}</p> <IoIosArrowDown className='text-xl font-mono'/>

                                    <div className=' invisible flex flex-col py-5 px-4 text-black bg-richblack-5 rounded-md transition-all duration-200 group-hover:visible  opacity-0 cursor-pointer absolute group-hover:opacity-100 lg:w-[300px] lg:translate-x-[-104px] lg:translate-y-32 font-medium  gap-2 uppercase'>

                                        <div className='bg-richblack-5 absolute w-7 h-7 rotate-45 lg:translate-x-36 lg:translate-y-[-32px] rounded-md'>

                                        </div>

                                        {
                                            subLinks?.length ? (subLinks.map( (link,id) => (
                                                <Link to={`/catalog/${link.name}`} key={id} className='hover:bg-richblack-200 font-bold text p-3 rounded-md'>
                                                    {link.name}
                                                </Link>
                                            ))) :
                                            <div></div>
                                        }

                                    </div>

                                </div>) : (
                                    <Link to={link?.path} className={`${matchRoute(link?.path) ? `text-yellow-5` : `text-richblack-25`} `} >
                                        <p> {link.title} </p>
                                    </Link>
                                )
                            }
                        </div>
                    ))
                }
            </div>

            

            {/* login, signup, dashboard */}
            
            <div className='flex gap-4 items-center'>

                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to={"/dashboard/cart"} className='relative flex items-center'>
                            <AiOutlineShoppingCart className='text-2xl text-richblack-300' />
                            {
                                totalItems > 0 && (
                                    <span className=' absolute  bottom-3 left-3 bg-caribbeangreen-300 w-4 h-4 flex items-center justify-center text-richblack-5 font-semibold rounded-full text-xs animate-bounce p-2 '>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
 
                {
                    token === null && (
                        <Link to={"/login"} >
                            <button className='flex justify-center items-center py-2 px-3 border border-richblack-600 text-richblack-200 bg-richblack-800 font-medium rounded-lg'>Log in</button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"} >
                            <button className='flex justify-center items-center py-2 px-3 border border-richblack-600 text-richblack-200 bg-richblack-800 font-medium rounded-lg'>Sign Up</button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropDown />
                }

            </div>



        </div>
        
    </div>
  )
}

export default Navbar;
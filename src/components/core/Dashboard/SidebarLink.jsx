import React from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import * as Icons from "react-icons/vsc";
// import { useDispatch } from 'react-redux';

const SidebarLink = ({link, iconName}) => {

    const location = useLocation();
    const Icon = Icons[iconName];

    // const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    
        
    <NavLink to={link.path}  className={`relative px-6 py-2 text-sm font-medium  
                    ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"} transition-all duration-200 active`}
    >

        <span className={` h-full w-1 absolute top-0 left-0 bg-yellow-50 ${matchRoute(link.path) ? ` opacity-100` : `opacity-0`}`}></span>

        <div className='flex gap-2 items-center'>
            <Icon />
            <p>{link.name}</p>
        </div>

    </NavLink> 
    

  )
}

export default SidebarLink;
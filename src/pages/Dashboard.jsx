import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const {loading: authLoading} = useSelector( (state) => state.auth);
    const {loading: profileLoading} = useSelector( (state) => state.auth);


    if(profileLoading || authLoading){
        return (
            <div className='spinner'></div>
        )
    };

  return (
    <div className='flex min-h-screen'>
        
        <Sidebar />

        <div className='min-h-screen w-full'>
            <div>
                <Outlet />
            </div>
        </div>

    </div>
  )
}

export default Dashboard;
import React from 'react'
// import IconBtn from '../../common/IconBtn';
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

const Settings = () => {


  return (
    <div className='flex flex-col gap-8 w-[70%] mx-auto my-10'>

        <h1 className='text-3xl font-semibold text-pink-300'>Edit Profile</h1>

        <ChangeProfilePicture />

        <EditProfile />

        <UpdatePassword />

        <DeleteAccount />

    </div>
  )
}

export default Settings;
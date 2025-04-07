'use client'
import { usePathname } from 'next/navigation';
// import React, { useState } from 'react';
import '../Style/Style.css'
import MainMenu from './MainMenu';
// import { NavLink, useNavigate } from 'react-router-dom';
import HeaderSocial from './SocialHeader';
// import { signOut } from 'firebase/auth';
// import toast from 'react-hot-toast';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../firebase.init'
// import Loader from './Loader';
// import useRole from '../../Hooks/useRole';

const Header = () => {
    const pathname = usePathname()
    const hideHeaderRoutes = ["/admin"];

    // let [liveDropdownToggle, setLiveDropdownToggle] = useState(false);
    // let [recordedDropdownToggle, setRecordedDropdownToggle] = useState(false);

    // Make the GET request


    // console.log(liveCourse);



    // console.log(liveCourse)
    // const [user, loading] = useAuthState(auth);
    // let [role, roleLoading] = useRole(user)
    // let navigat = useNavigate();

    // console.log(user);

    // const handleDropdown = () => {
    //     const dropdown = document.getElementById('dropdownMenu');
    //     dropdown.style.display = 'none';
    // }

    // const handleLogout = () => {
    //     signOut(auth)
    //         .then(() => {
    //             navigat('/login')
    //             toast.success('Logout Succes!')
    //             localStorage.removeItem('accessToken')
    //         })
    // }
    // console.log(pathname);

    // if (loading) {
    //     return <Loader></Loader>
    // }
    // console.log("/admin/CreateCourse");
    // console.log(pathname.includes(hideHeaderRoutes));

    return (
        <>
            {!pathname.includes(hideHeaderRoutes) &&
                <div className='header-container  fixed top-0 w-full'>
                    {/* <HeaderSocial></HeaderSocial> */}
                    <MainMenu></MainMenu>
                </div>
            }
        </>

    );
};

export default Header;
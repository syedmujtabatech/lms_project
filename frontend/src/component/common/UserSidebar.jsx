import React, { useContext } from 'react';
import { BsMortarboardFill } from 'react-icons/bs';
import { FaChartBar, FaDesktop, FaUserLock } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context';

const UserSidebar = () => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className='card border-0 shadow-sm'>
            <div className='card-body p-3'>
                <ul className='list-unstyled mb-0'>
                    <li className={`py-2 px-3 rounded mb-1 ${isActive('/account/dashboard') ? 'bg-primary text-white' : ''}`}>
                        <Link 
                            to="/account/dashboard" 
                            className={`d-flex align-items-center text-decoration-none ${isActive('/account/dashboard') ? 'text-white' : 'text-dark'}`}
                        >
                            <FaChartBar size={16} className='me-2' /> Dashboard
                        </Link>
                    </li>
                    <li className={`py-2 px-3 rounded mb-1 ${isActive('/account/my-courses') ? 'bg-primary text-white' : ''}`}>
                        <Link 
                            to="/account/my-courses" 
                            className={`d-flex align-items-center text-decoration-none ${isActive('/account/my-courses') ? 'text-white' : 'text-dark'}`}
                        >
                            <FaDesktop size={16} className='me-2' /> My Courses
                        </Link>
                    </li>
                    <li className={`py-2 px-3 rounded mb-1 ${isActive('/account/my-learning') ? 'bg-primary text-white' : ''}`}>
                        <Link 
                            to="/account/my-learning" 
                            className={`d-flex align-items-center text-decoration-none ${isActive('/account/my-learning') ? 'text-white' : 'text-dark'}`}
                        >
                            <BsMortarboardFill size={16} className='me-2' /> My Learning
                        </Link>
                    </li>
                    <li className={`py-2 px-3 rounded mb-1 ${isActive('/account/change-password') ? 'bg-primary text-white' : ''}`}>
                        <Link 
                            to="/account/change-password" 
                            className={`d-flex align-items-center text-decoration-none ${isActive('/account/change-password') ? 'text-white' : 'text-dark'}`}
                        >
                            <FaUserLock size={16} className='me-2' /> Change Password
                        </Link>
                    </li>
                    <li className='py-2 px-3 rounded mt-2 border-top'>
                        <Link 
                            to="/account/login" 
                            onClick={logout} 
                            className='d-flex align-items-center text-danger text-decoration-none'
                        >
                            <MdLogout size={16} className='me-2' /> Logout
                        </Link>
                    </li>
                </ul>
            </div>                             
        </div>
    );
};

export default UserSidebar;

import React ,{useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { FaCompass, FaBell, FaHome, FaUser, FaComment } from 'react-icons/fa';
import SignOut from './SignOut';
import { getCurrentUsername, getCurrentUserId } from '../utils/decodeData';
// import {Notification} from '../components/Notification'
import { getUserInfo } from '../services/User/userService';

function Nav() {
    const [avatar, setAvatar] = useState('');
    const username = getCurrentUsername();

    //[newnotification, setNewNotification] = useState(false);
    
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const userId = getCurrentUserId(); 
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo(userId);
            setAvatar(userInfo.avatar);
          };

        const fetchNotifications = async () => {
            try {
                const response = await fetch(`/api/friends/requests?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error.message);
            }
        };

        fetchUserInfo();
        fetchNotifications();
    }, []);


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark top w-100 sticky-top mb-0" style={{ backgroundColor: 'black' }}>
                <NavLink to='/home' className="nav-item nav-link d-inline-block mr-auto" style={{ fontSize: '1.2rem', color: 'white', textAlign: 'left', fontWeight: 'bold'  }}>
                    GATOR CONNECT
                    <div style={{ fontSize: '1rem', fontWeight: 'lighter', marginTop: '3px' }}>Hi, {username}</div>
                </NavLink>
                <div id="navMainMenu" className="navbar-expand">
                    <div className="navbar-nav d-flex">
                        <NavLink
                            to='/explore'
                            className="nav-item nav-link"
                            style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'gray', fontSize: '1.5rem', fontWeight: 'bold'  })}>
                            <FaCompass style={{ marginBottom: '5px', marginRight: '5px' }} />
                            <span className="d-lg-inline-block d-none"> EXPLORE</span>
                        </NavLink>
                        <NavLink
                            to='/notification'
                            className="nav-item nav-link"
                            style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'gray', fontSize: '1.5rem', fontWeight: 'bold'  })}>
                            <FaBell className={notifications.length > 0? 'notification-icon': '' }style={{marginBottom:'5px', marginRight:'5px'}}/>
                            <span className="d-lg-inline-block d-none"> NOTIFICATION</span>
                        </NavLink>
                        <NavLink
                            to='/home'
                            className="nav-item nav-link"
                            style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'gray', fontSize: '1.5rem', fontWeight: 'bold'  })}>
                            <FaHome style={{ marginBottom: '5px', marginRight: '5px' }} />
                            <span className="d-lg-inline-block d-none"> HOME</span>
                        </NavLink>
                        <NavLink
                            to='/profile'
                            className="nav-item nav-link"
                            style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'gray', fontSize: '1.5rem', fontWeight: 'bold'  })}>
                            <FaUser style={{ marginBottom: '5px', marginRight: '5px' }} />
                            <span className="d-lg-inline-block d-none"> PROFILE</span>
                        </NavLink>
                        <NavLink
                            to='/chat'
                            className="nav-item nav-link"
                            style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'gray', fontSize: '1.5rem', fontWeight: 'bold'  })}>
                            <FaComment style={{ marginBottom: '5px', marginRight: '5px' }} />
                            <span className="d-lg-inline-block d-none"> CHAT</span>
                        </NavLink>
                    </div>
                </div>
                <SignOut />
                <div className="avatar">{avatar}</div>
            </nav>
        </>
    );
}

export default Nav;
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { FaCompass, FaBell, FaHome, FaUser, FaComment } from 'react-icons/fa';
import SignOut from './SignOut';
import { getCurrentUsername, getCurrentUserId } from '../utils/decodeData';
// import { Notification } from '../components/Notification'
import { getUserInfo } from '../services/User/UserService';
import { getFriendReqs } from '../services/Notification/FriendService';

function Nav() {
  const [avatar, setAvatar] = useState('');
  const username = getCurrentUsername();

  //[newnotification, setNewNotification] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userId = getCurrentUserId();
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo(userId);
      setAvatar(userInfo.avatar);
    };

    const fetchNotifications = async () => {
      try {
        const userId = getCurrentUserId();
        const data = await getFriendReqs(userId);
        setNotifications(data);
      } catch (error) {
        console.log('Error fetching notifications:', error.message);
      }
    };

    fetchUserInfo();
    fetchNotifications();

    // Check for mobile size (768px)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 740);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark top w-100 sticky-top mb-0"
        style={{ backgroundColor: 'black' }}
      >
        <NavLink
          to="/home"
          className="nav-item nav-link d-inline-block mr-auto"
          style={{
            fontSize: '1.2rem',
            color: 'white',
            textAlign: 'left',
            fontWeight: 'bold',
          }}
        >
          GATOR CONNECT
          <div
            className="d-none d-lg-flex"
            style={{
              fontSize: '1rem',
              fontWeight: 'lighter',
              marginTop: '3px',
            }}
          >
            Hi, {username}
          </div>
        </NavLink>
        <div className="d-lg-none d-inline-block">
          <SignOut />
        </div>

        {/* <div className="d-lg-flex w-100"></div> */}

        <div
          id="navMainMenu"
          className={
            isMobile
              ? 'navbar-expand d-flex w-100 justify-content-between ml-5 mr-5'
              : 'navbar-expand d-flex  ml-5 mr-5'
          }
        >
          <div className="navbar-nav d-flex">
            <NavLink
              to="/explore"
              className="nav-item nav-link"
              style={({ isActive }) => ({
                color: isActive ? '#AD45FF' : 'gray',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              })}
            >
              <FaCompass style={{ marginBottom: '5px', marginRight: '5px' }} />
              <span className={isMobile ? 'd-lg-inline-block d-none' : ''}>
                {' '}
                EXPLORE
              </span>
            </NavLink>
            <NavLink
              to="/notification"
              className="nav-item nav-link"
              style={({ isActive }) => ({
                color: isActive ? '#AD45FF' : 'gray',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              })}
            >
              <FaBell style={{ marginBottom: '5px', marginRight: '5px' }} />
              {notifications.length > 0 && (
                <div className="notification-badge"></div>
              )}
              <span className={isMobile ? 'd-lg-inline-block d-none' : ''}>
                {' '}
                NOTIFICATION
              </span>
            </NavLink>
            <NavLink
              to="/home"
              className="nav-item nav-link"
              style={({ isActive }) => ({
                color: isActive ? '#AD45FF' : 'gray',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              })}
            >
              <FaHome style={{ marginBottom: '5px', marginRight: '5px' }} />
              <span className={isMobile ? 'd-lg-inline-block d-none' : ''}>
                {' '}
                HOME
              </span>
            </NavLink>
            <NavLink
              to="/profile"
              className="nav-item nav-link"
              style={({ isActive }) => ({
                color: isActive ? '#AD45FF' : 'gray',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              })}
            >
              <FaUser style={{ marginBottom: '5px', marginRight: '5px' }} />
              <span className={isMobile ? 'd-lg-inline-block d-none' : ''}>
                {' '}
                PROFILE
              </span>
            </NavLink>
            <NavLink
              to="/chat"
              className="nav-item nav-link"
              style={({ isActive }) => ({
                color: isActive ? '#AD45FF' : 'gray',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              })}
            >
              <FaComment style={{ marginBottom: '5px', marginRight: '5px' }} />
              <span className={isMobile ? 'd-lg-inline-block d-none' : ''}>
                {' '}
                CHAT
              </span>
            </NavLink>
          </div>
        </div>
        <div className="d-none d-lg-block ml-auto">
          <SignOut />
        </div>
        <div className="d-none d-lg-flex avatar-post">{avatar}</div>
      </nav>
    </>
  );
}

export default Nav;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { FaCompass, FaBell, FaHome, FaUser, FaComment } from 'react-icons/fa';
import SignOut from './SignOut';
import { getCurrentUsername } from '../utils/decodeData';

function Nav() {
    const username = getCurrentUsername();
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark top w-100 sticky-top" style={{ backgroundColor: 'black' }}>
                <NavLink to='/home' className="nav-item nav-link d-inline-block mr-auto" style={{ fontSize: '1.5rem', color: 'white', textAlign: 'left' }}>
                    GATOR CONNECT
                    <div style={{ fontSize: '1rem' }}>Hi, {username}</div>
                </NavLink>
                <div id="navMainMenu" class="navbar-expand mr-auto">
                    <div class="navbar-nav d-flex">
                        <NavLink to='/explore' className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'white' })}><FaCompass /><span className="d-lg-inline-block d-none"> Explore</span></NavLink>
                        <NavLink to='/notification' className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'white' })}><FaBell /><span className="d-lg-inline-block d-none"> Notification</span></NavLink>
                        <NavLink to='/home' className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'white' })}><FaHome /><span className="d-lg-inline-block d-none"> Home</span></NavLink>
                        <NavLink to='/profile' className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'white' })}><FaUser /><span className="d-lg-inline-block d-none"> Profile</span></NavLink>
                        <NavLink to='/chat' className="nav-item nav-link" style={({ isActive }) => ({ color: isActive ? '#AD45FF' : 'white' })}><FaComment /><span className="d-lg-inline-block d-none"> Chat</span></NavLink>
                    </div>
                </div>
                <SignOut />
            </nav>
        </>
    );
    // return (
    //     <>
    //         <nav class="navbar navbar-expand-lg navbar-dark top w-100 sticky-top" style={{ backgroundColor: 'black' }}>
    //             <Link to='/home' className="nav-item nav-link d-inline-block mr-auto" style={{ fontSize: '1.5rem', color: 'white', textAlign: 'left' }}>
    //                 GATOR CONNECT
    //                 <div style={{ fontSize: '1rem' }}>Hi, {username}</div>
    //                 </Link>
    //             <div id="navMainMenu" class="navbar-expand mr-auto">
    //                 <div class="navbar-nav d-flex">
    //                     <Link to='/explore' className="nav-item nav-link"><FaCompass /><span className="d-lg-inline-block d-none"> Explore</span></Link>
    //                     <Link to='/notification' className="nav-item nav-link"><FaBell /><span className="d-lg-inline-block d-none"> Notification</span></Link>
    //                     <Link to='/home' className="nav-item nav-link"><FaHome /><span className="d-lg-inline-block d-none"> Home</span></Link>
    //                     <Link to='/profile' className="nav-item nav-link"><FaUser /><span className="d-lg-inline-block d-none"> Profile</span></Link>
    //                     <Link to='/chat' className="nav-item nav-link"><FaComment /><span className="d-lg-inline-block d-none"> Chat</span></Link>
    //                 </div>
    //             </div>
    //             <SignOut />
    //         </nav>
    //     </>
    // );
}

export default Nav;
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import { FaCompass, FaBell, FaHome, FaUser, FaComment } from 'react-icons/fa';
import SignOut from './SignOut';
import { getCurrentUsername } from '../utils/decodeData';

function Nav() {
    const username = getCurrentUsername();

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
                            <FaBell style={{ marginBottom: '5px', marginRight: '5px' }} />
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
                <div className="avatar">🚗</div>
            </nav>
        </>
    );
}

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaBell, FaHome, FaUser, FaComment } from 'react-icons/fa';
import SignOut from './SignOut';

function Nav() {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark top w-100 sticky-top" style={{ backgroundColor: 'black' }}>
                {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> */}
                <Link to='/' className="nav-item nav-link d-inline-block mr-auto" style={{ fontSize: '1.5rem' }}>GATOR CONNECT</Link>
                <div id="navMainMenu" class="navbar-expand mr-auto">
                    <div class="navbar-nav d-flex">
                        <Link to='/explore' className="nav-item nav-link"><FaCompass /><span className="d-lg-inline-block d-none"> Explore</span></Link>
                        <Link to='/notification' className="nav-item nav-link"><FaBell /><span className="d-lg-inline-block d-none"> Notification</span></Link>
                        <Link to='/home' className="nav-item nav-link"><FaHome /><span className="d-lg-inline-block d-none"> Home</span></Link>
                        <Link to='/profile' className="nav-item nav-link"><FaUser /><span className="d-lg-inline-block d-none"> Profile</span></Link>
                        <Link to='/chat' className="nav-item nav-link"><FaComment /><span className="d-lg-inline-block d-none"> Chat</span></Link>

                        {/* <Link to='/login' className="nav-item nav-link">Login</Link>
                        <Link to='/signup' className="nav-item nav-link">Sign Up</Link> */}
                    </div>
                </div>
                <SignOut />
            </nav>
        </>
    );
}

export default Nav;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCompass, FaBell, FaHome, FaUser, FaComment } from 'react-icons/fa';

function Nav() {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark top mt-5">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" class="navbar-expand-lg">
                <div class="navbar-nav ml-auto">
                    <Link to='/explore' className="nav-item nav-link"><FaCompass /> Explore</Link>
                    <Link to='/notification' className="nav-item nav-link"><FaBell /> Notification</Link>
                    <Link to='/home' className="nav-item nav-link"><FaHome /> Home</Link>
                    <Link to='/profile' className="nav-item nav-link"><FaUser /> Profile</Link>
                    <Link to='/chat' className="nav-item nav-link"><FaComment /> Chat</Link>


                    {/* <Link to='/login' className="nav-item nav-link">Login</Link>
                    <Link to='/signup' className="nav-item nav-link">Sign Up</Link> */}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
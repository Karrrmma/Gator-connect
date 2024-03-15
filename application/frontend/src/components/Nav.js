import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark top mt-5">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" class="navbar-expand-lg">
                <div class="navbar-nav ml-auto">
                    <Link to='/explore' className="nav-item nav-link">Explore</Link>
                    <Link to='/new' className="nav-item nav-link">New Post</Link>
                    <Link to='/home' className="nav-item nav-link">Home</Link>
                    <Link to='/profile' className="nav-item nav-link">Profile</Link>
                    <Link to='/chat' className="nav-item nav-link">Chat</Link>
                    {/* <Link to='/login' className="nav-item nav-link">Login</Link>
                    <Link to='/signup' className="nav-item nav-link">Sign Up</Link> */}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
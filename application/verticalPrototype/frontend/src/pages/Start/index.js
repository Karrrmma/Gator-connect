import React from 'react';
import Gator from '../../assets/images/gator.png'
import { Link } from 'react-router-dom';

function Start() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <img src={Gator} alt="Gator" />
            <h1 class="mt-5">GATOR CONNECT</h1>
            <p className='w-50'>
                Connect with other SFSU students!
            </p>
            <Link to='/login' className="nav-item nav-link login-btn">Login</Link>
            <Link to='/register' className="nav-item nav-link login-btn">Sign Up</Link>
        </div>
    );
}

export default Start;
import React from 'react';
import Gator from '../images/gator.png'
import { Link } from 'react-router-dom';

function Start() {
    return (
        <div>
            <img src={Gator} alt="Gator" />
            <h1 class="mt-5">GATOR CONNECT</h1>
            <Link to='/login' className="nav-item nav-link">Login</Link>
            <Link to='/signup' className="nav-item nav-link">Sign Up</Link>
        </div>
    );
}

export default Start;
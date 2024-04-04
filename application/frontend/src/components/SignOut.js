import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate();

    function handleClick() {
        sessionStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }

    return (
        <button 
            className="nav-item nav-link d-lg-inline-block ml-auto signout-btn" 
            name='signout' 
            style={{ backgroundColor: 'transparent', color: 'rgb(0, 118, 209)', border: 'none'}} 
            onClick={handleClick}>
                LOG OUT
        </button>
    )
}

export default SignOut;
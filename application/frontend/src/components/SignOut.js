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
        <button name='signout' onClick={handleClick}>
            Sign Out
        </button>
    )
}

export default SignOut;
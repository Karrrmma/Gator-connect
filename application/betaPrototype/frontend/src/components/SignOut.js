import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  function handleClick() {
    sessionStorage.removeItem('token');
    localStorage.clear(); // remove likes
    navigate('/');
    window.location.reload();
  }

  return (
    <button
      className="nav-item nav-link d-lg-inline-block ml-auto signout-btn"
      name="signout"
      style={{
        backgroundColor: 'transparent',
        color: 'gray',
        border: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold',
      }}
      onClick={handleClick}
    >
      LOG OUT
    </button>
  );
}

export default SignOut;

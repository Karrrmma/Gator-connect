/**
 * SignOut.js
 * - Sign out button component that is displayed on the navigation bar.
 * - This is responsible for removing the user's token from the local storage
 *   and also refreshing the page to ensure the user only sees the start page.
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem('token');
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

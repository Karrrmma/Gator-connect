/**
 * Forgot Password Page
 * - The user will be asked to enter their username, new password, and confirm new password.
 * - The user will be redirected to the login page after successfully resetting their password.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import validateResetFields from '../validateResetFields';
import { resetPassword } from '../../../services/authentication/AuthService';
import gatorLogo from '../../../assets/images/gator_logo.PNG';
import '../auth.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting form");
    const errors = validateResetFields(inputs);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await resetPassword(inputs);
      alert('Password reset successfully.');
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="background">
      <div className="form-container">
        <Link to="/">
          <h1 className="login-title">GATOR CONNECT</h1>
        </Link>
        <div className="form-wrapper">
          <Link to="/">
            <div className="back-text">
              <u>back home</u>
            </div>
          </Link>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <img
              src={gatorLogo}
              alt="Gator Logo"
              className="gator-logo"
              style={{ width: '180px' }}
            />
            <h1 className="mb-3">Reset Password</h1>

            <input
              name="username"
              type="text"
              placeholder="Username"
              className="input-field"
            />
            <span className="text-danger"> {errors.username || '\u00A0'}</span>

            <input
              name="email"
              type="text"
              placeholder="SFSU Email"
              className="input-field"
            />
            <span className="text-danger"> {errors.email || '\u00A0'}</span>

            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              className="input-field"
            />
            <span className="text-danger">
              {' '}
              {errors.newPassword || '\u00A0'}
            </span>

            <input
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              className="input-field"
            />
            <span className="text-danger">
              {' '}
              {errors.confirmNewPassword || '\u00A0'}
            </span>

            <span className="text-danger mb-3"> {errors.form || '\u00A0'}</span>
            <div>
              <button
                type="submit"
                style={{
                  width: '150px',
                  marginTop: '5px',
                  marginBottom: '10px',
                }}
              >
                <b>RESET</b>
              </button>
            </div>
            <div className="register-link">
              <Link to="/login">
                <u>Back to Login</u>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

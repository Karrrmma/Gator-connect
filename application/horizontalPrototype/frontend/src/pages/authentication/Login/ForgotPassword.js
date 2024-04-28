import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validateResetFields from '../validateResetFields'; // You need to create this validation function
import '../auth.css';
import gatorLogo from '../../../assets/images/gator_logo.PNG';

function ForgotPassword() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form");
        const errors = validateResetFields(inputs);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const response = await fetch('/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            if (response.ok) {
                alert('Password reset successfully.');
                navigate('/login');
            } else {
                setErrors({...errors, form: 'Failed to reset password. Please check your details and try again.'});
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className='background'>
            <div className='form-container'>
                <Link to='/'>
                    <h1 className='login-title'>GATOR CONNECT</h1>
                </Link>
                <div className='form-wrapper'>
                    <Link to='/'>
                        <div className='back-text'><u>back</u></div>
                    </Link>
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <img src={gatorLogo} alt='Gator Logo' className='gator-logo' />

                        <input name='username' type='text' placeholder='Username' className='input-field' />
                        <span className='text-danger'> {errors.username || '\u00A0'}</span>

                        <input name='email' type='text' placeholder='Email' className='input-field' />
                        <span className='text-danger'> {errors.email || '\u00A0'}</span>

                        <input name='newPassword' type='password' placeholder='New Password' className='input-field' />
                        <span className='text-danger'> {errors.newPassword || '\u00A0'}</span>

                        <input name='confirmNewPassword' type='password' placeholder='Confirm New Password' className='input-field' />
                        <span className='text-danger'> {errors.confirmNewPassword || '\u00A0'}</span>

                        <span className='text-danger mb-3'> {errors.form || '\u00A0'}</span>
                        <div>
                            <button type='submit' style={{ width: '300px' }}><b>CHANGE PASSWORD</b></button>
                        </div>
                        <div className='register-link'>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
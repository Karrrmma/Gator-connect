import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import validateLoginFields from '../validateLoginFields';
import '../auth.css';
import gatorLogo from '../../../assets/images/gator_logo.PNG';
import { loginUser } from '../../../services/authentication/authService';

function Login({ setToken }) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const [ errors, setErrors ] = useState({});

    // on submit
    const handleSubmit = async e => {
        e.preventDefault();
        const errors = validateLoginFields(user);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            console.log("LOGIN ERRORS" + Object.keys(errors).length);
            return;
        }

        try {
            // console.log('User:', user);
            const data = await loginUser(user);
            setToken(data);
            return navigate('/home');
            // if(response.ok){
            //     console.log('front end - login success');
            //     const data = await response.json(); // resolve promise
            //     setToken(data); // access the token property and set
            //     return navigate('/home');
            // }
            // else{
            //     setErrors({...errors, form:'Invalid username or password'});
            // }
        } catch (error) {
            console.error('Error logging in, user does not exist?', error);
            setErrors({...errors, form:'Invalid username or password'});
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
                        <div className='back-text'><u>back home</u></div>
                    </Link>
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <img src={gatorLogo} alt='Gator Logo' className='gator-logo' />
                        <h1 className='mb-3'>SIGN IN</h1>
                        <input name='username' type='text' placeholder='Username' className='input-field' />
                        <span className='text-danger'> {errors.username || '\u00A0'}</span>
                        <input name='password' type='password' placeholder='Password' className='input-field' />
                        <span className='text-danger'> {errors.password || '\u00A0'}</span>
                        <span className='text-danger mb-3'> {errors.form || '\u00A0'}</span>
                        <div>
                            <button type='submit'><b>LOGIN</b></button>
                        </div>
                        <div className='register-link'>
                            <p className='mt-2'>Not registered yet? Let's create one 😎</p>
                            <Link to='/register'>
                                <u>Create an account</u>
                            </Link>
                            <Link to='/forgot-password'>
                                <u style={{marginLeft: '25px'}}>Forgot Password?</u>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
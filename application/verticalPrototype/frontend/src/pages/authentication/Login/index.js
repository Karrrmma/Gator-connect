import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import validateLoginFields from '../validateLoginFields';
// import { useForm } from '../../../hooks/useForm';
import '../auth.css';
import gatorLogo from '../../../assets/images/gator_logo.PNG';

async function loginUser(fields) {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( fields ),
    })
}

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

    const handleSubmit = async e => {
        e.preventDefault();
        const errors = validateLoginFields(user);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            console.log("LOGIN ERRORS" + Object.keys(errors).length);
            return;
        }

        try {
            console.log('User:', user);
            const response = await loginUser(user);
            console.log(response);
            // console.log(response.ok);
            if(response.ok){
                console.log('front end - login success');
                const data = await response.json(); // resolve promise
                console.log(data);
                setToken(data); // access the token property and set

                // setToken(token);
                return navigate('/home');
            }
            else{
                setErrors({...errors, form:'invalid username or password'});
            }
        } catch (error) {
            console.error('Error logging in, user does not exist?', error);
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
                        <h1 className='mb-3'>SIGN IN</h1>
                        <input name='username' type='text' placeholder='Username' className='input-field' />
                        <span className='text-danger'> {errors.username || '\u00A0'}</span>
                        <input name='password' type='password' placeholder='Password' className='input-field' />
                        <span className='text-danger'> {errors.password || '\u00A0'}</span>
                        <div>
                            <button type='submit'><b>LOGIN</b></button>
                        </div>
                        <div className='register-link'>
                            <p className='mb-3 mt-5'>Not registered yet? Let's create one 😎</p>
                            <Link to='/register'>
                                <u>Create an account</u>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div class="wrapper">
    //         <div class="title-text">
    //             <h1>Login</h1>
    //         </div>
    //     <div class="form-container">
    //        <div class="form-inner">
    //           <form class="login" onSubmit={handleSubmit} onChange={handleChange}>
    //              <div class="field">
    //                 <input type="text" placeholder="Username" />
    //                 <span className='text-danger'> {errors.username || '\u00A0'}</span>
    //              </div>
    //              <div class="field">
    //                 <input type="password" placeholder="Password" />
    //                 <span className='text-danger'> {errors.password || '\u00A0'}</span>
    //              </div>
    //              <div class="field btn">
    //                 <div class="btn-border"></div>
    //                 <input type="submit" value="Login" />
    //              </div>
    //           </form>
    //        </div>
    //     </div>
    //  </div>
    // );

}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
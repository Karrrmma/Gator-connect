import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import validateLoginFields from '../validateLoginFields';
import '../auth.css';

async function loginUser(fields) {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( fields ),
    })
        // .then(data => data.json()) // handle submit needs to know response was ok
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

        // const token = await loginUser({
        //     username: user.username,
        //     password: user.password
        // });
        // setToken(token);
    };

    // If user is logged in, redirect to home page
    // const isAuthenticated = !!sessionStorage.getItem('token');

    // if (isAuthenticated) {
    //     return navigate('/home');
    // }

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>
                    <p>Username</p>
                    <input name="username" type="text" onChange={handleChange} />
                    {errors.username && <span className='text-danger'> {errors.username}</span>}
                </label>
                <label>
                    <p>Password</p>
                    <input name="password" type="password" onChange={handleChange} />
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </label>
                <div>
                    <Link to='/register'>
                        <button type="submit" style={{ marginRight: '10px' }}>Create New Account</button>
                    </Link>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
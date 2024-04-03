import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link, redirect, useNavigate } from 'react-router-dom';
import validateLoginFields from '../validateLoginFields';

async function loginUser(fields) {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({fields}),
    })
    .then(data => data.json())
}

function Login({setToken}) {
    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();
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
    const navigate = useNavigate();
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
            const response = await fetch('/login',{
                method:'POST',
                headers:{
                    'Content-Type': "application/json",
                },
                body:JSON.stringify(user),
            });
            if(response.ok){
                console.log('login success');
                navigate('/home');
                
            }
            else{
                setErrors({...errors, form:'invalid username or password'});
            }

            //const token = await loginUser(user);
            //setToken(token);
            //redirect('/home');
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
    const isAuthenticated = !!sessionStorage.getItem('token');

    if (isAuthenticated) {
        navigate('/home');
        return null;
    }

    return (
        <div className="login-wrapper">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
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
                        <button type="submit">Create New Account</button>
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
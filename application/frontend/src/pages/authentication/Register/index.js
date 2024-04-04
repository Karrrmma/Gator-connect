import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import validateFields from '../validateFields';
import '../auth.css';

// TODO: STILL NEED TO COMPLETELY IMPLEMENT THIS PAGE
function Register() {
    const [values, setUser] = useState({
        sfsu_email: '',
        username: '',
        password: '',
        fullname: '',
        role: '',
        major: '',
        year: ''
    })

    const navigate = useNavigate();

    const [role, setRole] = useState('');

    // Spread values object, then update the value of the key that was changed
    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser({
            ...values,
            [name]: value
        });

        if (name === 'role') {
            setRole(value);
        }
    }
    
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        const err = validateFields(values);
        setErrors(err);

        // if (Object.keys(err).length === 0) { // if no errors, send data to server
        //     const res = await fetch('/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(values),
        //     })
        //     .then(() => {
        //         if (res.ok) { // double check
        //             console.log('User registered successfully');
        //             return navigate('/login');
        //         }
        //         throw new Error('User registration failed');
        //     })
        //     .catch(err => console.log(err));
        // }
        if (Object.keys(err).length === 0) {
            try {
                const res = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
        
                if (!res.ok) { // double check
                    throw new Error('User registration failed');
                }
        
                console.log('User registered successfully');
                navigate('/login');
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        document.body.classList.add('register-body'); 
        return () => {
            document.body.classList.remove('register-body'); 
        };
    }, []);

/*
  const handleSubmit = async (e) => {
    console.log("handle submit working")
        e.preventDefault();
        const err = validateFields(values);
        setErrors(err);
        if (Object.keys(err).length === 0) {
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
                if (response.ok) {
                    console.log('User registered successfully');
                    console.log('navigation work')
                    navigate('/login');  // Navigate to the login page
                } else {
                    throw new Error('User registration failed');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    */
    // If user is logged in, redirect to home page
    // const isAuthenticated = !!sessionStorage.getItem('token');

    // if (isAuthenticated) {
    //     return navigate('/home');
    // }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form action="" onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className="form-group">
                            <input name="sfsu_email" placeholder="SFSU Email" className="form-control" onChange={handleChange} />
                            {errors.email && <span className='text-danger'> {errors.email}</span>}
                        </div>
                        <div className="form-group">
                            <input name="username" className="form-control" placeholder="Username" onChange={handleChange} />
                            {errors.username && <span className='text-danger'> {errors.username}</span>}
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange}/>
                            {errors.password && <span className='text-danger'> {errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <input name="fullname" className="form-control" placeholder="Full Name" onChange={handleChange}/>
                            {errors.fullname && <span className='text-danger'> {errors.fullname}</span>}
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="role" value={role} onChange={handleChange}>
                                <option value="">Select role</option>
                                <option value="Professor">Professor</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control" name="major" onChange={handleChange}>
                                <option>Select major</option>
                                <option>Computer Science</option>
                                <option>Computer Engineering</option>
                            </select>
                            {errors.major && <span className='text-danger'> {errors.major}</span>}
                        </div>
                        {role === 'Student' && (
                            <div className="form-group">
                                <select className="form-control" name="year" onChange={handleChange}>
                                    <option>Select year</option>
                                    {Array.from({length: 5}, (_, i) => 2020 + i).map(year => (
                                        <option key={year}>{year}</option>
                                    ))}
                                </select>
                                {errors.year && <span className='text-danger'> {errors.year}</span>}
                            </div>
                        )}
                        <div className="row">
                            <div className="col ml-3">
                                <Link to="/login" className="btn btn-lg btn-primary btn-block">Login</Link>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-lg btn-primary btn-block">Register</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
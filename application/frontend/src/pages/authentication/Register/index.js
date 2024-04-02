import React, { useState } from 'react';
import {Link, redirect} from 'react-router-dom';
import validateFields from '../validateFields';
// TODO: STILL NEED TO COMPLETELY IMPLEMENT THIS PAGE
function Register() {
    const [values, setUser] = useState({
        email: '',
        username: '',
        password: '',
        fullname: '',
        role: '',
        major: '',
        year: ''
    })

    const [role, setRole] = useState('');

    // Spread values object, then update the value of the key that was changed
    const handleChange = (event) => {
        setUser({
            ...values,
            [event.target.name]: event.target.value
        });
    }
    
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        const err = validateFields(values);
        setErrors(err);
        // setErrors(validateFields(values));
        if (Object.keys(err).length === 0) { // if no errors, send data to server
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(res => {
                if (res.ok) {
                    console.log('User registered successfully');
                    return redirect('/login');
                }
                throw new Error('User registration failed');
            })
            .catch(err => console.log(err));
        }
    }

    // If user is logged in, redirect to home page
    const isAuthenticated = !!sessionStorage.getItem('token');

    if (isAuthenticated) {
        return redirect('/home');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                        <div className="form-group">
                            <input name="email" placeholder="Email" className="form-control" onChange={handleChange} />
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
                            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select role</option>
                                <option>Professor</option>
                                <option>Student</option>
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
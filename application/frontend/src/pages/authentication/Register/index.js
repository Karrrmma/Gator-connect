import React, { useState } from 'react';
import {Link} from 'react-router-dom';
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

    const handleChange = (event) => {
        setUser({
            ...values
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-5 mx-auto">
                    <form action="" onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <input type="username" name="username" className="form-control" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <input type="fullname" className="form-control" placeholder="Full Name" />
                        </div>
                        <div className="form-group">
                            <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select role</option>
                                <option>Professor</option>
                                <option>Student</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control">
                                <option>Computer Science</option>
                                <option>Computer Engineering</option>
                            </select>
                        </div>
                        {role === 'Student' && (
                            <div className="form-group">
                                <select className="form-control">
                                    {Array.from({length: 5}, (_, i) => 2020 + i).map(year => (
                                        <option key={year}>{year}</option>
                                    ))}
                                </select>
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
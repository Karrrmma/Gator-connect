import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import validateFields from '../validateFields';
import validateAvatarField from '../validateAvatarField';
import '../auth.css';
import { MAJORS } from '../../../constants/majors';
import { YEARS } from '../../../constants/years';
import gatorLogo from '../../../assets/images/gator_logo_happy.PNG';
import PropTypes from 'prop-types';
import { registerUser, loginUser } from '../../../services/authentication/authService';
import { createProfile } from '../../../services/User/userService';
import { getCurrentUserId } from '../../../utils/decodeData';

// TODO: STILL NEED TO COMPLETELY IMPLEMENT THIS PAGE
function Register({setToken}) {
    const [values, setUser] = useState({
        sfsu_email: '',
        username: '',
        password: '',
        fullname: '',
        role: '',
        major: '',
        year: ''
    })

    const [avatar, setAvatar] = useState({
        avatar: ''
    })

    const navigate = useNavigate();

    const [role, setRole] = useState('');

    const [tosAccepted, setTosAccepted] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);

    // Spread values object, then update the value of the key that was changed
    const handleChange = (event) => {
        const {name, value, type} = event.target;
        setUser({
            ...values,
            [name]: value
        });

        if (name === 'role') {
            setRole(value);
        }

        if (type === 'checkbox') {
            setTosAccepted(!tosAccepted);
        }
    }
    
    const [errors, setErrors] = useState({});
    // on form submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        // check and set front end errors
        const err = validateFields(values);
        let allerr = {...err}


        if(!tosAccepted) {
            allerr.tos ='You must accept the Terms of Service';
        }
        // setIsRegistered(true); // DEBUG REMOVE LATER
        setErrors(allerr);

        if (Object.keys(allerr).length > 0) {
            console.error('Validation errors:', allerr);
            return;  // Prevent the function from proceeding
        }

        // if no errors, send requests to backend
        if (Object.keys(err).length === 0) {
            try {
                await registerUser(values);
                console.log('User registered successfully');
                setIsRegistered(true);
                // navigate('/login');  // Navigate to login page after successful registration
                
                /*
                login user after registration
                const loginRes = await fetch('/login', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
    
                if (!loginRes.ok) {
                    throw new Error('User login failed');
                }
                
                const data = await loginRes.json();
                setToken(data);
                */

            } catch (error) {
                console.log(error);
                setErrors({...err, backend: 'Email is already in use. Please use another one.'});
            }
        }
    }

    const handleAvatarChange = (event) => {
        const {value} = event.target;

        if (!value || value.length === 0) {
            value = values.fullname[0];
        }

        setAvatar({
            avatar: value
        });
    }

    const handleAvatarSubmit = async (event) => {
        event.preventDefault();
        console.log(avatar.avatar); // Add this line to log the avatar value
        const err = validateAvatarField(avatar.avatar);
        setErrors(err);

        if (Object.keys(err).length > 0) {
            return; 
        } // if avatar selection is valid, then login the user

            // Check if avatar is empty
        if (!avatar || avatar.length === 0) {
            setAvatar(values.fullname[0]);
        }

        const userData = await loginUser(values);
        setToken(userData); // token returns user id

        const currentUserId = getCurrentUserId();
        const field = {
            userId: currentUserId,
            avatar: avatar.avatar,
            biography: ''
        }
        try {
            const data = await createProfile(field); // i believe this should not ever fail
        } catch (error) {
            console.log(error + "SOMEHOW FAILED TO CREATE PROFILE");
        }
    }

    const registerForm = (
        <form onSubmit={handleSubmit} onChange={handleChange}>
            <h1 className='mb-4'>SIGN UP</h1>
            <div className='form-row'>
                <div className='form-column'>
                    <input name="sfsu_email" type="text" placeholder="SFSU Email" className="input-field" />
                    <span className='text-danger'> {errors.email || '\u00A0'}</span>
                    <input name="username" type="text" className="input-field" placeholder="Username" />
                    <span className='text-danger'> {errors.username || '\u00A0'}</span>
                    <input name="password" type="password" className="input-field" placeholder="Password" />
                    <span className='text-danger'> {errors.password || '\u00A0'}</span>
                    <p className='text-muted text-left'>*Password must contain at least 8 characters and a number</p>
                    <span className='text-danger justify-content-center'> {errors.backend || '\u00A0'}</span>
                </div>
                <div className='form-column'>
                    <input name="fullname" type="text" className="input-field" placeholder="Full Name" />
                    <span className='text-danger'> {errors.fullname || '\u00A0'}</span>
                    <select name="role" className="input-field choose" onChange={handleChange}>
                        <option value="">Professor/Student</option>
                        <option value="Professor">Professor</option>
                        <option value="Student">Student</option>
                    </select>
                    <span className='text-danger'> {errors.role || '\u00A0'}</span>
                    <div className='form-column'>
                    <select className={`input-field choose ${role === 'Student' ? 'half' : ''}`} name="major" onChange={handleChange} >
                            <option>Select major</option>
                            {MAJORS.map(major => <option key={major} value={major}>{major}</option>)}
                        </select>
                        {role === 'Student' && (
                            <select className="input-field choose half ml-2" name="year" onChange={handleChange} >
                                <option>Start year</option>
                                {YEARS.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        )}
                        <span className='text-danger mr-5'> {errors.major || '\u00A0'}</span>
                        <span className='text-danger ml-2'> {errors.year || '\u00A0'}</span>
                    </div>
                    <div className='form-row' style={{ gap: '4px', alignItems: 'left', justifyContent: 'unset'}}>
                        <input type='checkbox' id='tos-check' className='mb-1 ml-2' onChange={handleChange} style={{ width: '22px', height: '22px' }} />
                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <label htmlFor='tos-check' className='form-check-label tos-check mt-1'>I accept and agree to the </label>
                        <Link to='/tos' className='tos-check mt-1 ml-1'> Terms and Service</Link>
                        </div>
                    </div>
                    <div className='form-column'>
                            <span className='text-danger justify-content-center'> {errors.tos || '\u00A0'}</span>
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <button type='submit'><b>REGISTER</b></button>
            </div>
            <div className='login-link'>
                <p className='mt-2 '>Already have an account?</p>
                <Link to='/login'>
                    <u>Log in here</u>
                </Link>
            </div>
        </form>
    );

    const setAvatarForm = (
        <>
            <form onSubmit={handleAvatarSubmit}>
                <h1 className='mt-5 mb-2'>TYPE YOUR ICON</h1>
                <p className='titletwo'>for your avatar</p>
                <input
                maxLength="1" 
                onChange={handleAvatarChange} 
                placeholder={values.fullname[0]}
                className='avatar-input'
                />
                <p className='titletwo mt-4'>Any single letter/emoji will work,</p>
                <p className='titletwo'>leaving it blank will use the first letter of your name</p>
                <span className='text-danger mb-4'> {errors.avatar || '\u00A0'}</span>
                <div className='mt-2'>
                    <button type='submit' className='avatar-submit'><b>FINISH</b></button>
                </div>
                <div className='login-link'>
                    <p className='mt-2 '>Already have an account?</p>
                    <Link to='/login'>
                        <u>Log in here</u>
                    </Link>
                </div>
            </form>
        </>
    );

    return (
        <div className="background">
            <div className='form-container'>
                <Link to='/'>
                    <h1 className='login-title'>GATOR CONNECT</h1>
                </Link>
                <div className='form-wrapper register-wrapper'>
                    <img src={gatorLogo} alt='Gator Logo' className='gator-logo' />
                    <Link to='/'>
                        <div className='back-text'><u>back home</u></div>
                    </Link>
                    {isRegistered ? (
                    // If the user is registered, show the avatar selection form
                        setAvatarForm
                    ) : (
                        registerForm
                    )}
                </div>
            </div>
        </div>
    );
}

Register.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Register;
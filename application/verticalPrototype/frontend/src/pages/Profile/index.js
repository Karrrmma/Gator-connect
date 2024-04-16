import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TestPFP from '../../assets/images/placeholder_pfp.png';
import { getCurrentUsername } from '../../utils/decodeData';
import { getCurrMajorAndYear } from '../../utils/queryUser';
import { isUserLogged } from '../../utils/isUserLogged';

function Profile() {
    const username = getCurrentUsername();
    const [student, setStudent] = useState({ major: '', year: '' });

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const data = await getCurrMajorAndYear();
                setStudent(data);
            } catch (error) {
                console.error('Failed to fetch student:', error);
            }
        };

        fetchStudentData();
    }, []);

    if (!isUserLogged()) {
        return <p>You are not logged in, create an account to view your profile.</p>;
    }

    return (
        <section>
            <div className="mt-5 text-center">
                <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%'}}/>
                <h1 class='text-muted font-weight-light mb-1'>STUDENT</h1>
                <h2>{username}</h2>
                <p className='mb-4'>Major: {student.major}</p>
                <p className='mb-4'>School Year: {student.year}</p>
                <p className='mb-4'>(0 Posts | 0 Friends)</p>
                <Link to="/newpost" className="btn btn-primary">New Post</Link>
            </div>
        </section>
    );
}


export default Profile;
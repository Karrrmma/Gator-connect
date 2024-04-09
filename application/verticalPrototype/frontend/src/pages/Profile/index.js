import React from 'react';
import { Link } from 'react-router-dom';
import TestPFP from '../../assets/images/placeholder_pfp.png';

function Profile() {
    return (
        <section>
            <div className="mt-5 text-center">
                <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%'}}/>
                <h1 class='text-muted font-weight-light mb-1'>STUDENT</h1>
                <h2>Username</h2>
                <p className='mb-4'>Major: Computer Science</p>
                <p className='mb-4'>School Year: 2024</p>
                <p className='mb-4'>(0 Posts | 0 Friends)</p>
                <Link to="/newpost" className="btn btn-primary">New Post</Link>
            </div>
        </section>
    );
}


export default Profile;
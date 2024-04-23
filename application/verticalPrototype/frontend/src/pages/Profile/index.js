import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TestPFP from '../../assets/images/placeholder_pfp.png';
import { getCurrentUsername, getCurrentUserId } from '../../utils/decodeData';
import { queryData } from '../../utils/queryUser';
import './Profile.css';

const sampleStudent = { // fill with major, year, role, major, bio, post_count, friend_count
    major: 'Computer Science',
    year: '2022',
    role: 'Student',
    username: 'StudentSample',
    fullname: 'Sample Student1',
    bio: 'I am a SAMPLE STUDENT, this means the query has failed!',
    post_count: 10,
    friend_count: 13,
    user_id: 100
};

const sampleProfessor = {
    major: 'Computer Science',
    year: '2022',
    role: 'Professor',
    username: 'ProfessorSample',
    fullname: 'Sample Professor1',
    bio: 'I am a SAMPLE PROFESSOR',
    post_count: 2,
    friend_count: 1,
    user_id: 101
}

function Profile() {
    const user_id = sampleStudent.user_id;
    // const user_id = getCurrentUserId();
    const [user, setUser] = useState({ major: '', year: '', role: '', username: '', fullname: '', bio: '', post_count: 0, friend_count: 0});


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // previous implementation
                // const data = await getCurrMajorAndYear();
                // setStudent(data);

                const data = await queryData(user_id);
                if (data) {
                    setUser(data);
                } else {
                    console.error('No data found for user, setting sampleStudent!:', user_id);
                    setUser(sampleStudent);
                }

                // setUser(data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUserData();
    }, [user_id]);

    return (
        <section>
            <div>
                <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%', marginTop: '20px'}}/>
                <p className='role mt-3'>{user.role.toUpperCase()}</p>
                <p className='fullname mb-4'><b>{user.fullname.toUpperCase()}</b></p>
                <p className='username mb-3'>username: {user.username}</p>
                <p className='major mb-4'>{user.role === 'Professor' ? 'Department' : 'Major'}: {user.major}</p>
                <p className='bio mb-4'>{user.bio}</p>
                <p className='text-white mb-4 post'>
                    <b>{user.post_count} POSTS | {user.friend_count} FRIENDS</b>
                </p>
                <button className='newpost'>
                <Link to={user_id !== getCurrentUserId() ? "/addfriend" : "/newpost"}>
                {user_id !== getCurrentUserId() ? "ADD FRIEND" : "ADD NEW POST"}
                </Link>
                </button>

            </div>
        </section>
    );
}


export default Profile;
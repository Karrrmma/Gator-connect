import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TestPFP from '../../assets/images/placeholder_pfp.png';
import { getCurrentUserId } from '../../utils/decodeData';
import { queryData } from '../../utils/queryUser';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import FriendsListPopup from './FriendsListPopup';
import NewPostPopup from './NewPostPopup';

const sampleStudent = { // fill with major, year, role, major, bio, post_count, friend_count
    major: 'Computer Science',
    year: '2022',
    role: 'Student',
    username: 'StudentSample',
    fullname: 'Sample Student1',
    bio: 'I am a SAMPLE STUDENT, this means the query has failed!',
    post_count: 2,
    friend_count: 13,
    user_id: 100
};

// const sampleProfessor = {
//     major: 'Computer Science',
//     year: '2022',
//     role: 'Professor',
//     username: 'ProfessorSample',
//     fullname: 'Sample Professor1',
//     bio: 'I am a SAMPLE PROFESSOR',
//     post_count: 2,
//     friend_count: 1,
//     user_id: 101
// }

function Profile() {
    // get current URL
    const location = useLocation();
    const timestamp = new Date().toLocaleString();

    const [user, setUser] = useState({ major: '', role: '', username: '', fullname: '', bio: '', post_count: 0, friend_count: 0, user_id: 0});

    const [showFriendsList, setShowFriendsList] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);
    
    const handleFriendsListClick = () => {
        setShowFriendsList(true);
    };
    
    const handleNewPostClick = () => {
        setShowNewPost(true);
    };
    
    const closeFriendsList = () => {
        setShowFriendsList(false);
    };
    
    const closeNewPost = () => {
        setShowNewPost(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // take user_id from URL, else use current ID
                const params = new URLSearchParams(location.search);
                const id = params.get('id') || getCurrentUserId();
    
                const data = await queryData(id);
                if (data) {
                    setUser({
                        user_id: data.user_id,
                        fullname: data.fullName,
                        username: data.username,
                        sfsu_email: data.sfsu_email,
                        major: data.major,
                        post_count: data.post_count,
                        friend_count: data.friend_accepted_count,
                        posts: data.posts
                    });
                } else {
                    // no data found: use sample data
                    setUser(sampleStudent);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUserData();
    }, [location.search]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {/* <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%', marginTop: '20px'}}/> */}
                <div className="avatar" style={{fontSize: '100px', margin: '10px', backgroundColor: 'white', padding: '50px 70px 90px 70px'}}>🚗</div>
                {/* <p className='role mt-3'>{user.role}</p> */}
                <p className='role mt-3'>STUDENT</p>
                <p className='fullname mb-3'><b>{user.fullname}</b></p>
                <p className='username mb-3'>{user.username}</p>
                <p className='major mb-4'>{user.role === 'Professor' ? 'Department' : 'Major'}: {user.major}</p>
                {/* <p className='bio mb-4'>{user.bio}</p> */}
                <p className='bio mb-4'>Hello everyone! This is my profile where you can see <br></br> my personal posts! I will update my bio later : )</p>
                <p className='text-white mb-4 post'>
                    {/* <b>{user.post_count} POSTS | {user.friend_count} FRIENDS</b> */}
                    <b>2 POSTS | 3 FRIENDS</b>
                </p>
                <div>
                    {user.user_id === getCurrentUserId() && (
                        <button className='friend-list mr-2' onClick={handleFriendsListClick}>
                            FRIEND LIST
                        </button>
                    )}
                    <button className='newpost ml-2' onClick={handleNewPostClick}>
                        {user.user_id !== getCurrentUserId() ? "ADD FRIEND" : "ADD NEW POST"}
                    </button>
                </div>
                {showFriendsList && <FriendsListPopup onClose={closeFriendsList} />}
                {showNewPost && <NewPostPopup onClose={closeNewPost} />}
            </div>
            <div className='mt-5' style={{ width: '40%' }}>
                <PostCard item={{ username: user.fullname, content: 'This is the first sample post!', timestamp: timestamp }} icon="🚗" />
                <PostCard item={{ username: user.fullname, content: "This is the second sample post!", timestamp }} icon="🚗" />
            </div>
        </>
    );
}


export default Profile;
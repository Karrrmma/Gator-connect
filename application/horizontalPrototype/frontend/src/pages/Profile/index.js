import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import TestPFP from '../../assets/images/placeholder_pfp.png';
import { getCurrentUserId } from '../../utils/decodeData';
import { queryData } from '../../utils/queryUser';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import FriendsListPopup from './FriendsListPopup';
import NewPostPopup from './NewPostPopup';


function Profile() {
    // get current URL
    const location = useLocation();

    const [user, setUser] = useState({
        major: '',
        role: '',
        username: '',
        fullname: '',
        bio: '',
        post_count: 0,
        friend_count: 0,  // **************** Friend Request should be implemented ****************
        user_id: 0,
        posts: []
    });


    const [showFriendsList, setShowFriendsList] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);
    
    const handleFriendsListClick = () => {
        setShowFriendsList(!showFriendsList);
    };
    
    const handleNewPostClick = () => {
        setShowNewPost(!showNewPost);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const id = params.get('id') || getCurrentUserId();

                const userData = await queryData(id);
                if (userData) {
                    setUser({
                        ...userData,
                        major: userData.role === 'Student' ? userData.major : userData.department,
                        role: userData.role,
                        fullname: userData.fullName,  
                        posts: userData.posts || [] 
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [location.search]);



    // Sort posts by 'post_time' in descending order before rendering
    const sortedPosts = user.posts.sort((a, b) => new Date(b.post_time) - new Date(a.post_time));

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {/* <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%', marginTop: '20px'}}/> */}
                <div className="avatar" style={{fontSize: '100px', margin: '10px', backgroundColor: 'white', padding: '50px 70px 90px 70px'}}>🚗</div>

                {/* DONE */}    
                <p className='role mt-3'>{user.role}</p>
                <p className='fullname mb-3'><b>{user.fullname}</b></p>
                <p className='username mb-3'>{user.username}</p>
                <p className='major mb-4'>{user.role === 'Professor' ? 'Department' : 'Major'}: {user.major}</p>

                {/* <p className='bio mb-4'>{user.bio}</p> Bio should be implemented when edit profile*/}
                <p className='bio mb-4'>Hello everyone! This is my profile where you can see <br></br> my personal posts! I will update my bio later : )</p>

                {/* POSTS DONE // FRIENDS: need to be implemented */}
                <p className='text-white mb-4 post'>
                    <b> {user.post_count} POSTS | {user.friend_count} FRIENDS</b>
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
                {showFriendsList && <FriendsListPopup onClose={handleFriendsListClick} />}
                {showNewPost && <NewPostPopup userId={user.user_id} onClose={handleNewPostClick} />}
            </div>

            {/* DONE */}
            {/* User Post dynamically with sort in timestamp */}
            <div className='mt-5' style={{ width: '40%' }}>
                {sortedPosts.map((post) => (
                    <PostCard
                        key={post.post_id}
                        item={{
                            username: user.fullname,
                            content: post.post_content,
                            timestamp: new Date(post.post_time).toLocaleString(),
                            num_likes: post.num_likes,
                            num_comments: post.num_comments
                        }}
                        icon="🚗"
                    />
                ))}
            </div>
        </>
    );
}


export default Profile;
import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import TestPFP from '../../assets/images/placeholder_pfp.png';
import { getCurrentUserId } from "../../utils/decodeData";
import { queryData } from "../../utils/queryUser";
import "./Profile.css";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import FriendsListPopup from "./FriendsListPopup";
import NewPostPopup from "./NewPostPopup";

function Profile() {
    // get current URL
    const { userId } = useParams();
    const [user, setUser] = useState({
        major: "",
        department: "",
        role: "",
        username: "",
        fullname: "",
        bio: "",
        post_count: 0,
        friend_count: 0, // **************** Friend Request should be implemented ****************
        user_id: 0,
        posts: [],
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
                const id = userId || getCurrentUserId();

                const userData = await queryData(id);
                if (userData) {
                    setUser({
                        ...userData,
                        major:
                            userData.role === "Student"
                                ? userData.major
                                : userData.department,
                        role: userData.role,
                        fullname: userData.fullName,
                        posts: userData.posts || [],
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    // get user_id, post.user_id properly setting to implement friend request in Profile
    console.log("Check user_id and post.user_id status in /profile/:userId");
    console.log("In Profile, user_id: ", getCurrentUserId());
    console.log("In Profile, /profile/:userId: ", userId);

    const sendFriendRequest = async (requesterId, receiverId) => {
        try {
            const response = await fetch("/api/friends/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requester_id: requesterId,
                    receiver_id: receiverId,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Friend request sent successfully!");
            } else {
                // Handle different types of errors based on response status
                if (response.status === 409) {
                    // Custom message for duplicate friend request
                    alert("Friend request already exists.");
                } else {
                    // Generic message for other types of errors
                    alert(data.message || "Failed to send friend request.");
                }
            }
        } catch (error) {
            console.error("Error sending friend request:", error);
        }
    };

    const handleAddFriendClick = () => {
        const requesterId = getCurrentUserId();
        const receiverId = userId;
        if (requesterId !== receiverId) {
            sendFriendRequest(requesterId, receiverId);
            console.log("Send Friend Request from: ", requesterId);
            console.log("Send Friend Request to: ", receiverId);
        }
    };


    // Sort posts by 'post_time' in descending order before rendering
    const sortedPosts = user.posts.sort(
        (a, b) => new Date(b.post_time) - new Date(a.post_time)
    );

    return (
        <>
            <div className="post-header">
                {/* <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%', marginTop: '20px'}}/> */}
                <div className="post-row">
                    <div
                        className="avatar"
                        style={{
                            fontSize: "100px",
                            margin: "10px",
                            backgroundColor: "white",
                            padding: "50px 70px 90px 70px",
                            marginRight: '20px',
                        }}
                    >
                        🚗
                    </div>

                    {/* DONE */}
                    <div className="post-column">
                        <div className="post-row">
                            <p className="role mt-3">{user.role}</p>
                            <p className="fullname mt-3 mb-3 ml-2">{user.fullname}</p>
                        </div>
                        <p className="profile-note">* Username: {user.username}</p>
                        <p className="profile-note">
                            {user.role === "Professor" ? "Department: " + user.department : "* Major: " + user.major}
                        </p>
                        <p className="profile-note mb-4">* School year: (need to-do)</p>
                    </div>
                </div>
                {/* <p className='bio mb-4'>{user.bio}</p> Bio should be implemented when edit profile*/}

                <p className="bio mb-4">
                    Hello everyone! This is my profile where you can see <br></br> my
                    personal posts! I will update my bio later :)
                </p>

                {/* POSTS DONE // FRIENDS: need to be implemented */}
                <p className="text-white mb-4 post">{" "}
                    {user.post_count} POSTS | {user.friend_count} FRIENDS
                </p>

                <div>
                    {/* <button className="profile-button">WRITE BIO</button> */}
                    
                    {user.user_id === getCurrentUserId() && (
                        <button className="profile-button" onClick={handleFriendsListClick}>
                            FRIEND LIST
                        </button>
                    )}
                    {/*
                        1. Now, Frontend for each profile navigating works properly ++ appropriate button
                            If user_id == 1 enter user_id == 1 feed, shows both friend list and add new post
                            If user_id == 1 enter other post.user_id, at least not != 1, navigate another person's feed
                            and show the add Friend Button
                        2. Add Friend Button BackEnd should be implemented
                            
                            Friend Request Table
                            request_id    ||     status     ||     requester_id    ||     receiver_id
                            auto increment                              1                     7    


                        */}
                    <button className="profile-button" onClick={() => {
                        if (user.user_id !== getCurrentUserId()) {
                            handleAddFriendClick();
                        } else {
                            handleNewPostClick();
                        }
                    }}>
                        {user.user_id !== getCurrentUserId() ? "ADD FRIEND" : "ADD NEW POST"}
                    </button>
                    {/* 
                        if button is add new post, it user_id and profile/:user_id is different, ok 
                        if not add friend button must send the friend request properly
                        */}
                </div>


                {showFriendsList && (
                    <FriendsListPopup onClose={handleFriendsListClick} />
                )}
                {showNewPost && (
                    <NewPostPopup userId={user.user_id} onClose={handleNewPostClick} />
                )}
            </div>

            {/* DONE */}
            {/* User Post dynamically with sort in timestamp */}
            {/* Check if user.posts array is empty */}
            {user.posts.length === 0 ? (
                <p className="no-posts-message">NO POSTS YET</p>
            ) : (
                <div className="mt-5" style={{ width: "40%" }}>
                    {sortedPosts.map((post) => (
                        <PostCard
                            key={post.post_id}
                            item={{
                                username: user.fullname,
                                content: post.post_content,
                                timestamp: new Date(post.post_time).toLocaleString(),
                                num_likes: post.num_likes,
                                num_comments: post.num_comments,
                            }}
                            icon="🚗"
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Profile;

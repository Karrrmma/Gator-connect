import React, { useState, useEffect } from "react";
import { getCurrentUserId } from "../../utils/decodeData";
import { queryData } from "../../utils/queryUser";
import "./Profile.css";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard";
import FriendsListPopup from "./FriendsListPopup";
import NewPostPopup from "./NewPostPopup";
import EditProfilePopup from "./EditProfilePopup";
import { Link } from 'react-router-dom';
import { getUserInfo } from "../../services/User/userService";
import { getFriendshipStatus, sendFriendReq, unfriendUser } from "../../services/Notification/friendService";


function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    major: "",
    department: "",
    year: "",
    role: "",
    username: "",
    fullname: "",
    bio: "",
    post_count: 0,
    friend_count: 0,
    user_id: 0,
    posts: [],
    biography: "",
    avatar: ""
  });

  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // this is used for display the posts without refresh
  const addNewPostToList = (newPost) => {
    setUser((prevUser) => ({
      ...prevUser,
      posts: [newPost, ...prevUser.posts],
      post_count: prevUser.post_count + 1,
    }));
  };

  const handleFriendsListClick = () => {
    setShowFriendsList(!showFriendsList);
  };

  const handleNewPostClick = () => {
    setShowNewPost(!showNewPost);
  };

  const handleEditProfileClick = () => {
    setShowEditProfile(!showEditProfile);
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
            year: userData.year,
            posts: userData.posts || [],
            isFriend: userData.isFriend,
          });
        }
        const basicInfo = await getUserInfo(id);
        if (basicInfo) {
          setUser((prevState) => ({
            ...prevState,
            avatar: basicInfo.avatar,
            biography: basicInfo.biography,
          }));
        }
        if (userId && userId !== getCurrentUserId()) {
          checkFriendship(userId);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  // get user_id, post.user_id properly setting to implement friend request in Profile
  /*
  console.log("Check user_id and post.user_id status in /profile/:userId");
  console.log("In Profile, user_id: ", getCurrentUserId());
  console.log("In Profile, /profile/:userId: ", userId);
  */

  const checkFriendship = async (userId) => {
    const requesterId = getCurrentUserId();
    try {
      const data = await getFriendshipStatus(requesterId, userId);
      setUser((prevState) => ({ ...prevState, isFriend: data.isFriend }));
    } catch (error) {
      console.error("Error fetching friendship status:", error);
    }
  };

  const sendFriendRequest = async (requesterId, receiverId) => {
    try {
      const data = await sendFriendReq({
          requester_id: requesterId,
          receiver_id: receiverId,
        });
      alert(data.message);
    } catch (error) {
      console.error("Failed to send friend request.", error);
      alert(error);
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

  const handleUnfriendClick = async () => {
    try {
      const data = await unfriendUser({
        requester_id: getCurrentUserId(),
        receiver_id: userId,
      });
      // alert("You are no longer friends.");
      alert(data.message);
      setUser((prevState) => ({
        ...prevState,
        isFriend: false,
        friend_count:
          prevState.friend_count > 0 ? prevState.friend_count - 1 : 0,
      }));
    } catch (error) {
      console.error("Error unfriending:", error);
      alert(error);
    }
  };

  // when unfriend happens in friend list popup, update the friend_count immediately
  const handleFriendCountChange = () => {
    setUser((prevState) => ({
      ...prevState,
      friend_count: prevState.friend_count > 0 ? prevState.friend_count - 1 : 0,
    }));
  };

  const updateBiography = (newBio) => {
    setUser((prevState) => ({
      ...prevState,
      biography: newBio,
    }));
  };

  // Sort posts by 'post_time' in descending order before rendering
  const sortedPosts = user.posts.sort(
    (a, b) => new Date(b.post_time) - new Date(a.post_time)
  );


  const nameLink = user.fullname.trim().replace(/\s/g, '%20');

  return (
    <>
      <div className="post-header">
        {/* <img src={TestPFP} alt="Profile" style={{width: '150px', height: '150px', borderRadius: '50%', marginTop: '20px'}}/> */}
        <div className="post-row">
          <div
            className="avatar avatar-area"
            onClick={handleEditProfileClick}
          >
            {getCurrentUserId() === user.user_id && (
              <>
                <div className="edit-profile-message">EDIT PROFILE</div>
                <div onClick={handleEditProfileClick}></div>
              </>
            )}
            <span className={getCurrentUserId() === user.user_id ? "avatar-text" : ""}>{user.avatar}</span>
          </div>

          {getCurrentUserId() === user.user_id && showEditProfile && (
            <EditProfilePopup
              userId={user.user_id}
              currentBiography={user.biography}
              updateBiography={updateBiography}
              onClose={handleEditProfileClick}
            />
          )}

          {/* DONE */}
          <div className="post-column">
            <div className="post-row">
              <p className="role mt-3">{user.role}</p>
              <p className="fullname mt-3 mb-3 ml-2 capitalize">{user.fullname}</p>
            </div>
            <p className="profile-note">* Username: {user.username}</p>
            <p className="profile-note">
              {user.role === "Professor"
                ? "* Department: " + user.department
                : "* Major: " + user.major}
            </p>
            {/*user's year visible*/}
            <p className="profile-note mb-4">
              {user.role === "Student" ? "* School year: " + user.year : ""}
            </p>
          </div>
        </div>
        {/* <p className='bio mb-4'>{user.bio}</p> Bio should be implemented when edit profile*/}

        <p className="bio mb-4 mt-2">{user.biography}</p>

        {/* POSTS DONE // FRIENDS: need to be implemented */}
        <p className="text-white mb-4 post">
          {" "}
          {user.post_count} POSTS | {user.friend_count} FRIENDS
        </p>

        <div>
          {/* Button to show the friend list if it's the current user's profile */}
          {user.user_id === getCurrentUserId() && (
            <button className="profile-button" onClick={handleFriendsListClick}>
              FRIEND LIST
            </button>
          )}

          {/* Conditional rendering for either friend-related buttons or the add friend/new post button */}
          {user.user_id !== getCurrentUserId() ? (
            user.isFriend ? (
              <>
                {/* Buttons for "Unfriend" and "Chat" when the profile is of a friend */}
                <button
                  className="profile-button"
                  onClick={handleUnfriendClick}
                >
                  UNFRIEND
                </button>
                <Link to={`/chatWindow/${nameLink}`}>
                  <button className="profile-button">CHAT</button>
                </Link>
              </>
            ) : (
              // Button to send a friend request if not friends
              <button className="profile-button" onClick={handleAddFriendClick}>
                ADD FRIEND
              </button>
            )
          ) : (
            // Button to add a new post if it's the current user's profile
            <button className="profile-button" onClick={handleNewPostClick}>
              ADD NEW POST
            </button>
          )}
        </div>

        {showFriendsList && (
          <FriendsListPopup
            onClose={handleFriendsListClick}
            onFriendCountChange={handleFriendCountChange}
          />
        )}
        {showNewPost && (
          <NewPostPopup userId={user.user_id} onClose={handleNewPostClick} onAddPost={addNewPostToList} />
        )}
      </div>

      {/* DONE */}
      {/* User Post dynamically with sort in timestamp */}
      {/* Check if user.posts array is empty */}
      {user.posts.length === 0 ? (
        <p className="no-posts-message">NO POSTS YET</p>
      ) : (
        <div className="mt-5 profile-post">
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
              icon={user.avatar}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Profile;

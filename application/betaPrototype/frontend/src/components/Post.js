
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "./Post.css";
import { getCurrentUserId } from "../utils/decodeData";
import { useNavigate } from "react-router-dom";
import NewPostPopup from '../pages/Profile/NewPostPopup';
import { getPosts, getLikedPosts } from "../services/Post/postService";
import { searchUsers } from "../services/User/userService";
import PostCard from "./PostCard";

function UserCard({ username, majorOrDepartment, icon, userId }) {
  const navigate = useNavigate();
  const navigateToUserProfile = () => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div className="card" style={{ marginBottom: "30px" }}>
      <div className="card-body">
        <div className="d-flex justify-content-start align-items-center mb-2">
          {/* <img src={TestPFP} className="rounded-circle" alt="placeholder pfp" style={{ width: 40, height: 40 }}></img> */}
          {/* <div className="avatar">🐊</div> */}
          <div className="avatar">{icon}</div>
          <div className="text-left">
            <h5 className="card-title ml-2 mb-0 capitalize" onClick={navigateToUserProfile} >{username}</h5>
            <div className="text-muted small ml-2 mt-0 major">{majorOrDepartment}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Post() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [noUsersFound, setNoUsersFound] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  
  useEffect(() => {
    console.log("Post base use effect has been called!");
    fetchLikedPosts();
    fetchAllPosts(); // This should only fetch all posts, not interfere with search
  }, []); // Empty dependency array ensures this only runs once on mount

  const fetchLikedPosts = async () => {
    try {
      const data = await getLikedPosts(userId);
      console.log(`RECEIVING NEW DATA FROM FETCH LIKED POSTS!`);
      console.log(data);
      setLikedPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const userId = getCurrentUserId();
  const handleNewPostClick = () => {
    console.log("OPENING POP UP TO ADD A NEW POST!");
    // fetchLikedPosts();
    setShowNewPost(!showNewPost);
  };
  // Callback to add new post to the state
  // if a new post is added, then grab the posts again!
  const addNewPost = (newPost) => {
    // setItems(prevItems => [newPost, ...prevItems]);
    // console.log(newPost);
    fetchLikedPosts();
    fetchAllPosts();
  };

  useEffect(() => {
    if (Object.keys(searchQuery).length > 0) {
      // Only run this if there's a valid search query
      fetchItems(searchQuery);
    }
  }, [searchQuery]);

  async function fetchAllPosts() {
    try {
      const data = await getPosts();
      console.log(`RECEIVING NEW DATA FROM FETCH ALL OF THE POSTS!`);
      setItems(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setItems([]); // reset the posts on fail
    }
  }
  async function fetchItems({ username, major, year }) {
    const body = { username, major, year };
    // error handle in case
    if (!username && !major && !year) {
      return;
    }

    const newItems = await searchUsers(body);

    if (!newItems.results || newItems.results.length === 0) {
      setNoUsersFound(true);
    } else {
      setNoUsersFound(false);
    }

    setItems(newItems.results);

  }
  return (
    <>
      <SearchBar onSearch={setSearchQuery} />
      <button className="pbutton" onClick={()=> setShowNewPost(true)}> CLICK HERE TO ADD A NEW POST</button>
      {showNewPost && <NewPostPopup userId={userId}onClose={handleNewPostClick} onAddPost={addNewPost}/>}
      {Object.values(searchQuery).some((value) => value) ? (
        <>
          {noUsersFound ? <p>No users found.</p> : null}
          <section className="post-container">
            {items.map((item, index) => {
              if (item) {
                return (
                  <UserCard
                    key={index}
                    username={item.username}
                    majorOrDepartment={item.major_or_department}
                    icon={item.avatar}
                    userId={item.user_id}
                  />
                );
              }
              return null;
            })}
          </section>
        </>
      ) : (
        <section className="post-container">
          {items.map((post, index) => (
            <PostCard
              key={index}
              item={{
                user_id: post.user_id,
                username: post.full_name,
                content: post.post_content,
                timestamp: new Date(post.post_time).toLocaleString('en-US'),
                comments: post.num_comments || 0,
                likes: post.num_likes || 0,
                imageUrl: post.imageUrl,
                post_id: post.post_id,
              }}
              icon={post.avatar}
              likedPostsList={likedPosts}
            />
          ))}
        </section>
      )}
    </>
  );
}
export default Post;

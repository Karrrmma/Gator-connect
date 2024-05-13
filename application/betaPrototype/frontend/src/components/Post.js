
import React, { useEffect, useState } from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "./Post.css";
import { getCurrentUserId } from "../utils/decodeData";
import { useNavigate } from "react-router-dom";
import NewPostPopup from '../pages/Profile/NewPostPopup';
import { addComment, deleteComment, getComments, getPosts, postHandleLike, getLikedPosts } from "../services/Post/postService";
import { searchUsers } from "../services/User/userService";

function PostCard({ item, icon, likedPostsList }) {
  const [likesCount, setLikesCount] = useState(item.likes || 0);
  const [commentsCount, setCommentsCount] = useState(item.comments || 0);
  const [commentsData, setCommentsData] = useState([]);
  const [commentText, setCommentText] = useState("");
  const userId = getCurrentUserId();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedPosts, setLikedPosts] = useState(likedPostsList || []);
  // console.log("Liked posts: ", likedPosts.some(post => post.post_id === item.post_id));
  // console.log("Is liked: ", isLiked);
  // localStorage.clear(); // this needs for clear the local Storage for like and comment, but particularly for like

  useEffect(() => {
    console.log(`TEST POST ${item.post_id}, this should be true when liked: ${isLiked}`);
  }, [isLiked]);

  useEffect(() => {
    // initially set post to liked if it's in the likedPosts array
    console.log(likedPosts);
    console.log(likedPostsList);
    if (likedPosts && likedPosts.length > 0) {
      let statement = likedPosts[0].isLiked ?  likedPosts[0].post_id : "NONE";
      console.log(`POST ${item.post_id} should be equal to ${statement}`); // 
    }
    const debug = likedPostsList.some(post => {
      console.log(`post.post_id: ${post.post_id}, item.post_id: ${item.post_id}`);
      return post.post_id === item.post_id;
    });
    setIsLiked(debug);
    console.log(`this is test post ${item.post_id}, this should be true if liked: ${debug} with ${isLiked}`);
  }, [item]);

  useEffect(() => {
    fetchComments(item.post_id);
  }, [item.post_id]);

  const fetchComments = async (postId) => {
    try {
      const data = await getComments(postId);

      setCommentsData(data);
      setCommentsCount(data.length);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleLike = async () => {
    const method = isLiked ? "DELETE" : "POST";
    const body = {
      user_id: userId,
      post_id: item.post_id,
    };
    console.log("handleLike has been called!");
    try {
      await postHandleLike(method, body);
      setIsLiked(!isLiked);
      setLikesCount((prevCount) => isLiked ? prevCount - 1 : prevCount + 1);

      if (isLiked) {
        setLikedPosts(likedPosts.map(post => 
          post.post_id === item.post_id ? { ...post, liked: false } : post
        ));
      } else {
        setLikedPosts([...likedPosts, { post_id: item.post_id, liked: true }]);
      }

    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    const body = {
      user_id: userId,
      post_id: item.post_id,
      comment_content: commentText,
    };
    
    try {
      const newComment = await addComment(body);

      setCommentsCount((prevCount) => prevCount + 1);
      setCommentText("");
      setCommentsData((prevData) => [newComment, ...prevData]);
    } catch (error) {
        console.error("Error adding comment:", error);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId, { post_id: item.post_id });

      setCommentsCount((prevCount) => prevCount - 1);
      setCommentsData((prevData) =>
        prevData.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  const navigatePostUserProfile = () => {
    if (item.user_id) {
      console.log("Post's User ID for navigation (destination's id aka receiver):", item.user_id);
      navigate(`/profile/${item.user_id}`);
    } else {
      console.error("User ID is undefined, cannot navigate");
    }
  };
  const navigateCommentUserProfile = (userId) => {
    if (userId) {
        navigate(`/profile/${userId}`);
    } else {
        console.error("User ID is undefined, cannot navigate");
    }
};

  return (
    <div className="card post-card">
      <div className="card-body w-100">
        <div className="d-flex justify-content-between align-items-start">
          <div className="user-info">
            {/* <img src={avatar} className="rounded-circle" alt="User profile" /> */}
            <div
              className="avatar"
              onClick={(e) => {
                e.stopPropagation();
                navigatePostUserProfile();
              }}
            >
              {icon}
            </div>
            <div className="title-container">
              <h5
                className="card-title capitalize"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePostUserProfile();
                }}
              >
                {item.username}
              </h5>
              <p className="timestamp" style={{ color: 'gray', fontSize: '12px' }}>{item.timestamp}</p>
            </div>
          </div>
          <div
            className="actions d-flex align-items-center"
            style={{ fontSize: "1.2rem" }}
          >
            {/* <button type="button" className="btn btn-outline-secondary btn-sm"><FaCommentDots /></button>
                        <span className="comments-count">{item.comments || 0}</span> */}
            <span className="comments-count">
              {/* need to get total item_comments */}
              <FaCommentDots /> {commentsCount}
            </span>
            <span className={`outline-success ${isLiked ? "red-heart" : ""}`}>
              <FaHeart /> {likesCount}
            </span>
          </div>
        </div>
        <p className="card-text">{item.content}</p>
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            className="card-image mt-2 mb-3"
            alt="Post"
            style={{ maxWidth: "80%" }}
          />
        )}
        <div className="comment-input-section">
          {/* need to implement comment */}
          <input
            type="text"
            className="form-control comment-input"
            placeholder="Leave a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          {/* */}
          <button type="button" onClick={handleLike}>
            <FaHeart /> {isLiked ? "Unlike" : "Like"}
          </button>
        </div>
        <div className="comment-section mt-2">
          {commentsData.length > 0 ? (
            <>
              {commentsData.slice(0, showAllComments ? commentsData.length : 3).map((comment) => (
                <div key={comment.comment_id}>
                  {/* <p className="comment-content"> 
                {comment.full_name}   <br></br>
                {comment.comment_content} <br></br>
                {new Date(comment.comment_time).toLocaleString('en-US')}
                </p> */}
                  <div className="comment">
                    <h4 className="comment-user capitalize"             
                      onClick={(e) => {
                      e.stopPropagation();
                     navigateCommentUserProfile(comment.user_id);
                      }}>{comment.full_name}</h4>
                    <p className="comment-date">{new Date(comment.comment_time).toLocaleString('en-US')}</p>
                  </div>
                  <div className="comment">
                    <p className="comment-content" style={{ width: '77%' }}>{comment.comment_content}</p>
                    {comment.user_id === userId && (
                      <button onClick={() => handleDeleteComment(comment.comment_id)} style={{ marginBottom: 'auto', backgroundColor: '#1c1c1c', color: 'gray', border: 'none', borderRadius: '4px' }}>delete your comment</button>
                    )}
                  </div>
                </div>
              ))}
              {commentsData.length > 3 && (
                <button onClick={() => setShowAllComments(!showAllComments)} style={{ border: 'none', backgroundColor: 'transparent', color: '#007bff', cursor: 'pointer' }}>Show {showAllComments ? 'less' : 'more'} comments</button>
              )}
            </>
          ) : (
            <p style={{ fontSize: '15px', marginTop: '10px' }}>No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
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

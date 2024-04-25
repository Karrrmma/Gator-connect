import React, { useState } from 'react';
import { FaCommentDots, FaHeart } from 'react-icons/fa';
import './Post.css';

const PostCard = ({ item, icon }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(item.likes || 0);

    const handleLike = () => {
        if (!isLiked) {
            setLikesCount(likesCount + 1);
        } else {
            setLikesCount(likesCount - 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="card post-card" style={{ width: '100%' }}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="user-info">
                        <div className="avatar">{icon}</div>
                        <div className="title-container">
                            <h5 className="card-title">{item.username}</h5>
                            <p className="timestamp">{item.timestamp}</p>
                        </div>
                    </div>
                    <div className="actions d-flex align-items-center" style={{ fontSize: '1.2rem' }}>
                        <span className="comments-count"><FaCommentDots /> {item.comments || 0}</span>
                        <span className={`outline-success ${isLiked ? 'red-heart' : ''}`}><FaHeart /> {likesCount}</span>
                    </div>
                </div>

                <p className="card-text">{item.content}</p>
                {item.imageUrl && <img src={item.imageUrl} className="card-image mt-2 mb-3" alt="Post" style={{ maxWidth: '80%' }} />}

                <div className="comment-input-section">
                    <input type="text" className="form-control comment-input" placeholder="Leave a comment..." />
                    <button type="button" onClick={handleLike}><FaHeart /> {isLiked ? 'Unlike' : 'Like'}</button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
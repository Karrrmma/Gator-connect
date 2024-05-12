import React, { useState, useEffect } from 'react';
import { createPost } from './../../services/Post/postService';

function NewPostPopup({ userId, onClose, onAddPost }) {
    const [post, setPost] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(true);
    }, []);

    const handleClose = () => {
        onClose();
        setShowPopup(false);
        setConfirmation('');
    };

    const handleSubmit = async (postData) => {
        postData.preventDefault();
        // console.log(post);
        try {
            const postContent = { post_content: post, user_id: userId };
            console.log('trying to create a post!');
            const data = await createPost(postContent);
            console.log('done creating a post!');
            setConfirmation(data.message);
            setPost('');
            // this is used for display the posts without refresh
            // changed functionality to refetch the posts
            onAddPost(data.post);  
            setTimeout(handleClose, 2000);
        } catch (error) {
            console.error('Failed to create post:', error);
            // setConfirmation('Failed to send request.');
            setConfirmation(error);
            console.log('ERROR IN POST!');
        }
    };

    if (!userId) {
        return <div>No user ID provided.</div>;
    }

    return (
        <>
            {showPopup && (
                <div className="friend-list-popup">
                    <div className="popup-inner">
                        {confirmation ? (
                            <>
                                <p className='mt-5 mb-5'>{confirmation}</p>
                                <button className="close-button" onClick={handleClose}>x</button>
                            </>
                        ) : (
                            <>
                                <h2>Add New Post</h2>
                                <form onSubmit={handleSubmit}>
                                    <textarea className="post-input" value={post} onChange={(e) => setPost(e.target.value)} placeholder="Enter your content here" />
                                    <div className="button-group">
                                        <button className="cancel-button" type="button" onClick={handleClose}>Cancel</button>
                                        <button className="post-button" type="submit">Post</button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default NewPostPopup;



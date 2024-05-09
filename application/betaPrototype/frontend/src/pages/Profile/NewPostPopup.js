import React, { useState, useEffect } from 'react';

function NewPostPopup({ userId, onClose }) {
    const [post, setPost] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Automatically show the popup when the component mounts
        setShowPopup(true);
    }, []);

    const handleClose = () => {

        onClose();
        setShowPopup(false);
        setConfirmation('');
        if (onClose) {
            onClose();
        }
    };

    const handleSubmit = async (postData) => {
        postData.preventDefault();
        

        
        try {
            const response = await fetch('/newpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ post_content: post, user_id: userId }),
            });

            const data = await response.json();

            if (response.ok) {
                setConfirmation(data.message || 'New post has been successfully created!');
                setPost('');  // Reset the post content after successful post creation.
                setTimeout(handleClose, 2000);  // Optionally close popup automatically after a delay.
            } else {
                setConfirmation(data.error || 'Failed to create new post.');
            }
        } catch (error) {
            console.error('Failed to create post:', error);
            setConfirmation('Failed to send request.');
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
                                <button className="close-button" onClick={handleClose}>Close</button>
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



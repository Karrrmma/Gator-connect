import React, { useState } from 'react';

function NewPostPopup({ onClose }) {
    const [post, setPost] = useState('');
    const [confirmation, setConfirmation] = useState('');
    
    const handleExit = () => {
        onClose();
    };
    
    const handlePost = (e) => {
        setPost(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(post);
        setPost('');
        // onClose();
        setConfirmation('A new post has been created!');
    };
    
    return (
        <div className="friend-list-popup">
            <div className="popup-inner">
                {confirmation ? (
                    <>
                    <p className='mt-5 mb-5'>{confirmation}</p>
                    <button className="close-button" onClick={handleExit}>X</button>
                    </>
                ) : (
                    <>
                        <h2>ADD NEW POST</h2>
                        <p className="popup-subtitle">Share anything to connect more!</p>
                        <form onSubmit={handleSubmit}>
                            <textarea className="post-input" value={post} onChange={handlePost} placeholder="Enter your content here" />
                            <button className="upload-button" type="button">Upload an image (optional)</button>
                            <div className="button-group">
                                <button className="cancel-button" type="button" onClick={handleExit}>CANCEL</button>
                                <button className="post-button" type="submit">POST</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default NewPostPopup;
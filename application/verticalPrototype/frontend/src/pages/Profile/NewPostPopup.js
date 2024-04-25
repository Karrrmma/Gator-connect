import React, { useState } from 'react';

function NewPostPopup({ onClose }) {
    const [post, setPost] = useState('');
    
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
        onClose();
    };
    
    return (
        <div className="friend-list-popup">
            <div className="popup-inner">
                <h2>ADD NEW POST</h2>
                <p className="popup-subtitle">Share anything to connect more!</p>
                <form onSubmit={handleSubmit}>
                    <textarea className="post-input" value={post} onChange={handlePost} placeholder="Enter your content here" />
                    <div className="image-upload-container">
                        <textarea className="post-upload" placeholder="Add an image (optional)" />
                        <button className="upload-button" type="button">Upload</button>
                    </div>
                    <div className="button-group">
                        <button className="cancel-button" type="button" onClick={handleExit}>CANCEL</button>
                        <button className="post-button" type="submit">POST</button>
                    </div>
                </form>
                <button className="close-button" onClick={handleExit}>X</button>
            </div>
        </div>
    );
}

export default NewPostPopup;
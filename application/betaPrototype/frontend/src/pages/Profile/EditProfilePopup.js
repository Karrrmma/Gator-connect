import React, { useState, useEffect } from 'react';
import { updateProfile } from '../../services/User/UserService';

function EditProfilePopup({ userId, onClose, updateBiography }) {
    const [profileInfo, setProfileInfo] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(true);
    }, []);

    const handleClose = () => {
        setShowPopup(false);
        setConfirmation(''); 
        if (onClose) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await updateProfile({ biography: profileInfo, account_id: userId });
            
            setConfirmation(data.message || 'Profile updated successfully!');
            updateBiography(profileInfo); 
            setTimeout(handleClose, 2000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setConfirmation('Failed to send request.');
        }
    };

    return (
        <>
            {showPopup && (
                <div className="profile-edit-popup">
                    <div className="popup-inner">
                        {confirmation ? (
                            <>
                                <p className='mt-5 mb-5'>{confirmation}</p>
                                <button className="close-button" onClick={handleClose}>x</button>
                            </>
                        ) : (
                            <>
                                <h2>Edit Your Profile</h2>
                                <form onSubmit={handleSubmit}>
                                    <textarea className="profile-input" value={profileInfo} onChange={(e) => setProfileInfo(e.target.value)} placeholder="Update your biography here" />
                                    <div className="button-group">
                                        <button className="cancel-button" type="button" onClick={handleClose}>Cancel</button>
                                        <button className="post-button" type="submit">Update</button>
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

export default EditProfilePopup;

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Notification.css';
import { getCurrentUserId } from "../utils/decodeData";
import { useNavigate } from 'react-router-dom';

function NotificationItem({ notification, onAccept, onDecline }) {
    // Replace with actual action handlers
    //const handleAccept = () => console.log('Accepted');
    //const handleDecline = () => console.log('Declined');
    const navigate = useNavigate();
    const navigateToSenderProfile = () => {
        navigate(`/profile/${notification.senderId}`);  // Navigate to sender's profile
    };

    notification.avatar = "🚗"
    return (
        <div className="notification-item">
            <div className="notification-content">
                <div className="avatar" style={{  cursor: 'pointer', transition: 'transform 1s ease', boxShadow: '0.3s ease'}}
                onClick={navigateToSenderProfile}>{notification.avatar}</div>
                <div className="notification-info">
                    <div className="notification-sender">{notification.sender}</div>
                    <div className="notification-text">just sent you a friend request!</div>
                </div>
            </div>
            <div className="notification-actions">
                {!notification.accepted && (
                    <button className="decline" onClick={() => onDecline(notification.id)}>Decline</button>
                )}
                {!notification.accepted && (
                    <button className="accept" onClick={() => onAccept(notification.id)}>Accept</button>
                )}
                {notification.accepted && <span className="accepted">Following</span>}

            </div>
        </div>

    );
}

//{!notification.accepted && <span className="accepted">decline </span>} 
function Notification() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = getCurrentUserId(); 
                const response = await fetch(`/api/friends/requests?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch notifications');
                }
            } catch (error) {
                console.error('Error fetching notifications:', error.message);
            }
        };

        fetchNotifications();
    }, []);


    const handleAccept = id => {
        setNotifications(current =>
            current.map(notification =>
                notification.id === id ? { ...notification, accepted: true } : notification
            )
        );
    };

    const handleDecline = id => {
        setNotifications(current =>
            current.filter(notification => notification.id !== id)
        );
    };


    return (
        <section className="notification-section">
            <h1 className="title">NOTIFICATION</h1>
            <p className="intro"> Check who sending you a friend request below!</p>
            <div className="notification-list">
                {notifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification}
                        onAccept={handleAccept}
                        onDecline={handleDecline} />
                ))}

            </div>
            <Link to="/home" className='back-home'>BACK HOME</Link>
        </section>
    );
}

export default Notification;
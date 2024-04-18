
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Notification.css';

function NotificationItem({ notification }) {
    // Replace with actual action handlers
    const handleAccept = () => console.log('Accepted');
    const handleDecline = () => console.log('Declined');
    return (
        <div className="notification-item">
            <div className="notification-content">
                <div className="notification-sender">{notification.sender}</div>
                <div className="notification-text">just sent you a friend request!</div>
            </div>
            <div className="notification-actions">
                <button className="accept" onClick={handleAccept}>Accept</button>
                <button className="decline" onClick={handleDecline}>Decline</button>
            </div>
        </div>
    );
}
function Notification() {
    const [notifications, setNotifications] = useState([
        //fake data for now
        { id: 1, sender: 'Ali Gator' },
        { id: 2, sender: 'Felonious Gru' },
        { id: 3, sender: 'Pizza Lee' },
        { id: 4, sender: 'Chris Bob' },
    ]);

    useEffect(() => {
        // fetchNotifications();
    }, []);

    return (
        <section className="notification-section">
            <h1 className="mt-5">Notifications</h1>
            <p classNmae ="mt-"> intro text to explain what this page for</p>
            <div className="notification-list">
                {notifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </div>
            <Link to="/home">Return to Home</Link>
        </section>
    );
}

export default Notification;
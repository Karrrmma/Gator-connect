
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Notification.css';

function NotificationItem({ notification, onAccept, onDecline }) {
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
                {!notification.accepted && (
                <button className="accept" onClick={() => onAccept(notification.id)}>Accept</button>
                )}
                {notification.accepted && <span className="accepted">Following</span>}
                {!notification.accepted && (
                    <button className="decline" onClick={() => onDecline(notification.id)}>Decline</button>
        )}
            </div>
        </div>
    );
}

function Notification() {
    const [notifications, setNotifications] = useState([
        //fake data for now
        { id: 1, sender: 'Ali Gator', accepted: false },
        { id: 2, sender: 'Felonious Gru',accepted: false },
        { id: 3, sender: 'Pizza Lee' , accepted:false},
        { id: 4, sender: 'Chris Bob',accepted : false},
    ]);

    useEffect(() => {
        // fetchNotifications();
    }, []);

    const handleAccept = (id) => {
        setNotifications(currentNotifications =>
          currentNotifications.map(notification => 
            notification.id === id ? { ...notification, accepted: true } : notification
          )
        );
    };

    const handleDecline = (id) => {
        console.log('Declined', id);
        
    };

    return (
        <section className="notification-section">
            <h1 className="mt-5">Notifications</h1>
            <p classNmae ="mt-"> intro text to explain what this page for</p>
            <div className="notification-list">
                {notifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} 
                    onAccept={handleAccept}
                    onDecline={handleDecline}/>
                ))}
            </div>
            <Link to="/home">Return to Home</Link>
        </section>
    );
}

export default Notification;
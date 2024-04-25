import { React } from 'react';

function UserCard({ fullname, username, icon }) {
    return (
        <div className="friend-item">
            <div className="friend-container">
                <div className="avatar">{icon}</div>
                <div className='friend-info'>
                    <div className="friend-name text-white">{fullname}</div>
                    <div className="friend-username text-white">{username}</div>
                </div>
            </div>
            <div className="friend-action">
                <button className="unfriend">Unfriend</button>
            </div>
        </div>
    );
}

export default UserCard;
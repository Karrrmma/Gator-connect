import React, { useState } from 'react';
import UserCard from '../../components/UserCard';
import "./popup.css";

function FriendsListPopup({ onClose }) {
  const [friends] = useState([
    {username: 'gator21', fullname: 'Alli Gator', icon: '🐊'},
    {username: 'freddy87', fullname: 'Freddy Fazbear', icon: '🐻'},
    {username: 'pikmin', fullname: 'Pick Min', icon: '🌼'},

  ]);
  
  const [search, setSearch] = useState('');

  const handleExit = () => {
    onClose(); 
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="friend-list-popup">
      <div className="popup-inner">
        <h2>FRIEND LIST</h2>
        <p className="friend-subtext mb-4">All friends that were accepted are here</p>
        <input className="friend-search" value={search} onChange={handleSearch} placeholder="Search your friend" />
        <div className="notification-list">
          {friends.filter(friend => friend.fullname.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
            friends.filter(friend => friend.fullname.toLowerCase().includes(search.toLowerCase())).map((friend, index) => (
              <UserCard key={index} fullname={friend.fullname} username={friend.username} icon={friend.icon} />
            ))
          ) : (
            <p className='mt-3'>No friends found</p>
          )}
        </div>
        <button className="close-button" onClick={handleExit}>X</button>
      </div>
    </div>
  );
}

export default FriendsListPopup;
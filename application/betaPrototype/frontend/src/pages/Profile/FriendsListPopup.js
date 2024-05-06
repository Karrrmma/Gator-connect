import React, { useState, useEffect } from 'react';
import UserCard from '../../components/UserCard';
import "./popup.css";
import { getCurrentUserId } from "../../utils/decodeData";

function FriendsListPopup({ onClose, onFriendCountChange}) {
  const profile = getCurrentUserId();
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFriends();
  });

  const fetchFriends = async () => {
    try {
      const response = await fetch(`/api/friends/list?userId=${profile}`);
      const data = await response.json();
      if (response.ok) {
        setFriends(data);
      } else {
        console.error('Failed to fetch friends:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const unfriend = async (friendId) => {
    try {
      const response = await fetch("/api/friends/unfriend", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requester_id: profile, receiver_id: friendId })
      });

      const data = await response.json();
      if (response.ok) {
        fetchFriends(); 
        onFriendCountChange();
      } else {
        console.error('Failed to unfriend:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };


  
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
          {friends.filter(friend => friend.full_name && friend.full_name.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
            friends.filter(friend => friend.full_name && friend.full_name.toLowerCase().includes(search.toLowerCase())).map((friend, index) => (
              <UserCard key={index} fullname={friend.full_name} username={friend.username} icon={friend.icon} userId={friend.user_id} onUnfriend={unfriend} />
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
import React, { useState, useEffect } from 'react';

import UserCard from '../../components/UserCard';
import { getCurrentUserId } from "../../utils/decodeData";
import { getFriendList, unfriendUser } from '../../services/Notification/FriendService';
import "./popup.css";

function FriendsListPopup({ onClose, onFriendCountChange}) {
  const profile = getCurrentUserId();
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState('');
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
};

  useEffect(() => {
    fetchFriends();
  });

  const fetchFriends = async () => {
    try {
      const data = await getFriendList(profile);
      setFriends(data);
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const unfriend = async (friendId) => {
    try {
      const data = await unfriendUser({ requester_id: profile, receiver_id: friendId });
      // const response = await fetch("/api/friends/unfriend", {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ requester_id: profile, receiver_id: friendId })
      // });

      // const data = await response.json();
      fetchFriends(); 
      onFriendCountChange();
      setConfirmation(data.message);
      setTimeout(handleClose, 2000);  // Optionally close popup automatically after a delay.
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
    <>
    {showPopup && (
      <div className="friend-list-popup">
        <div className="popup-inner">
            {confirmation ? (
            <>
              <p className='mt-5 mb-5'>{confirmation}</p>
              <button className="close-button" onClick={handleClose}>X</button>
            </>
            ) : (
            <>     
              <h2>FRIEND LIST</h2>
              <p className="friend-subtext mb-4">All friends that were accepted are here</p>
                <input className="friend-search" value={search} onChange={handleSearch} placeholder="Search your friend" />
                        <div className="notification-list">
                          {friends.filter(friend => friend.full_name && friend.full_name.toLowerCase().includes(search.toLowerCase())).length > 0 ? (
                            friends.filter(friend => friend.full_name && friend.full_name.toLowerCase().includes(search.toLowerCase())).map((friend, index) => (
                              <UserCard key={index} fullname={friend.full_name} username={friend.username} icon={friend.avatar} userId={friend.user_id} onUnfriend={unfriend} onClosePopup={handleClose}/>
                            ))
                          ) : (
                            <p className='mt-3'>No friends found</p>
                          )}
                        </div>
              <button className="close-button" onClick={handleExit}>X</button></>)}
          </div>
        </div>
    )}

    
    </>

  );
}

export default FriendsListPopup;
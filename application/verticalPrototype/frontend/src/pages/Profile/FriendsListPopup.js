import React, { useState } from 'react';
import "./popup.css";

function FriendsListPopup({ onClose }) {
  const [friends, setFriends] = useState(['Alli Gator']);
  const [search, setSearch] = useState('');

  const handleExit = () => {
    onClose(); 
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Friends List</h2>
        <p style ={{color:"gray", fontsize: "10px" }}>All my friends that were accepted here</p>
        <input type="text" value={search} onChange={handleSearch} placeholder="Search your friend" />
        <ul>
          {friends.filter(friend => friend.toLowerCase().includes(search.toLowerCase())).map((friend, index) => (
            <li key={index}>{friend}</li>
          ))}
        </ul>
        <button onClick={handleExit}>X</button> 
      </div>
    </div>
  );
}

export default FriendsListPopup;
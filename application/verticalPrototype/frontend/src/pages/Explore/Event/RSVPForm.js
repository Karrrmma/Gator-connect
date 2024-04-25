import "../ExploreTemplate.css";
import React, { useState } from 'react';

function RSVPForm({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, acceptedTerms });
    onClose();
  };

  const handleExit = () => {
    onClose(); 
  };
  

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Confirm Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Your Full Name:</label>
          <input type="text" placeholder="fullname" value={name} onChange={(e) => setName(e.target.value)} />
          <label>SFSU Email:</label>
          <input type="email" placeholder="@sfsu.edu" value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <button type="submit">SUBMIT</button>
          <button className="exit-button" onClick={handleExit}>CANCEL</button>
        </form>
      </div>
    </div>
  );
}

export default RSVPForm;

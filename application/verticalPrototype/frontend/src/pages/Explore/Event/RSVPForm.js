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

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Confirm Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RSVPForm;
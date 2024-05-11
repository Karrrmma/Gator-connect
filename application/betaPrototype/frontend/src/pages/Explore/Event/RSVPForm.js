/**
 * RSVPForm Component
 * 
 * This component displays a form for users to RSVP to an event.
 * Users can enter their full name and SFSU email to register for the event.
 * It also provides a flash message to confirm successful registration.
 * 
 * Props:
 * - onSubmit: Function to handle form submission
 * - onClose: Function to handle closing the RSVP form
 * 
 * State:
 * - name: String representing user's full name
 * - email: String representing user's SFSU email
 * - flashMessage: String representing flash message for successful registration
 */
import "../ExploreTemplate.css";
import React, { useState } from 'react';

function RSVPForm({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [flashMessage, setFlashMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
    setTimeout(()=> {
      onClose();
    },32000);
    
  };

  const handleExit = () => {
    onClose(); 
  };

  const handleRSVP = () => {
    setFlashMessage('Successfully registered for event.');
    setTimeout(() => {
      setFlashMessage('');
    }, 2000); // Clear message after 3 seconds
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
          
          <button className="exit-button" onClick={handleExit}>CANCEL</button>
          <button type="submit" onClick={(handleRSVP)}>SUBMIT</button>
        </form>
      </div>
      {/* Flash message */}
      {flashMessage && (
        <div className="flash-message">
          {flashMessage}
        </div>
      )}
    </div>
  );
}

export default RSVPForm;

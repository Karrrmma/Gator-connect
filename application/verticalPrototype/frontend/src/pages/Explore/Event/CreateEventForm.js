import React, { useState } from 'react';
import "../ExploreTemplate.css";

function CreateEventForm({ onSubmit, onClose }) {
  const [fullName, setFullName] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [hostedBy, setHostedBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fullName, eventType, description, dateTime, location, hostedBy });
    onClose(); 
  };

  const handleExit = () => {
    onClose(); 
  };
  
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Create Event</h2>
        <p style ={{color:"gray", fontsize: "10px" }}>Fill out this information to start your own event!</p>
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <label>Event Type:</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="">Select Event Type</option>
            <option value="Art">Art</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Cultural">Cultural</option>
            <option value="Technology">Technology</option>
            <option value="Wellness">Wellness</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Career">Career</option>
          </select>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={30} />
          <label>Date & Time:</label>
          <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <label>Hosted By:</label>
          <select value={hostedBy} onChange={(e) => setHostedBy(e.target.value)}>
            <option value="">Select Host</option>
            <option value="Professor">Professor</option>
            <option value="Student">Student</option>
          </select>
          <button className="exit-button" onClick={handleExit}>CANCEL</button>
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventForm;

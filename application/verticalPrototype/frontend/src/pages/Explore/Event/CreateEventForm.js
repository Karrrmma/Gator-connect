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
    <div className="popup-wrapper">
    <div className="popup">
      <div className="popup-inner">
        <h2>CREATE AN EVENT</h2>
        <p>Fill out this information to start your own event!</p>
        <form  className="form-box" onSubmit={handleSubmit}>
          <div className='create-event'>
          <input type="text" placeholder='Enter your fullname' value={fullName} onChange={(e) => setFullName(e.target.value)} />
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
          <textarea placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)} maxLength={30} />
          <input type="datetime-local" placeholder='Date & Time' value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
          <input type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />

          <select value={hostedBy} onChange={(e) => setHostedBy(e.target.value)}>
            <option value="">Select Hosts by</option>
            <option value="Professor">Professor</option>
            <option value="Professor">Faculty</option>
            <option value="Student">Student</option>
          </select>
          </div>
          
          <div className='create-event-btn'>
          <button className="exit-button" onClick={handleExit}>CANCEL</button>
          <button type="submit">Create Event</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateEventForm;

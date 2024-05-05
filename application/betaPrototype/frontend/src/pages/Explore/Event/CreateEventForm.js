import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../ExploreTemplate.css";


function CreateEventForm({ onSubmit, onClose }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [hostedBy, setHostedBy] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventItems, setEventItems] = useState([]);
  const [eventCreator, setEventCreator] = useState('');

  //The handle submit function will send the collected information entered to the backend,
  //backend will send to database and store it. 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      event_description: description,
      event_type: eventType,
      event_name: eventTitle,
      event_location: location,
      event_host: hostedBy,
      event_time: dateTime,
      event_creator: eventCreator,
    };

      try {
        const response = await fetch("/creatEvent", {
          method: "POST",
          headers: {"content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        const data = await response.json();
        if (response.ok) {
          setEventItems([...eventItems, data]);
          navigate("/explore/Event");
        }else {
          throw new Error(data.message);
        }
      
      } catch (error) {
        console.error("Submit Error:", error);
      }
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
          <input type="text" placeholder='Enter event title' value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
          <input type="text" placeholder='Enter username' value={eventCreator} onChange={(e) => setEventCreator(e.target.value)}/>
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
         
          <select value={hostedBy} onChange={(e) => setHostedBy(e.target.value)}>
            <option value="">Select Hosts by</option>
            <option value="Professor">Professor</option>
            <option value="Student">Student</option>
          </select>

          <input type="text" placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />

          <input type="datetime-local" placeholder='Date & Time' value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
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

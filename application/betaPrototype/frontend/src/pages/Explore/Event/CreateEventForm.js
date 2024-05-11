/**
 * CreateEventForm Component
 * 
 * This component provides a form for users to create new events.
 * Users can enter event details such as title, type, description, location, and date/time.
 * Upon submission, the event information is sent to the backend for storage in the database.
 * 
 * Props:
 * - onClose: Function to handle closing the create event form
 * 
 * State:
 * - eventType: String representing the type of event
 * - description: String representing the description of the event
 * - dateTime: String representing the date and time of the event
 * - location: String representing the location of the event
 * - eventTitle: String representing the title of the event
 * - eventItems: Array containing information about created events
 * - confirmation: String representing the confirmation message for creating a new event
 * - showPopup: Boolean indicating whether the create event form is visible
 * - user: Object containing information about the current user (username and role)
 * 
 */
import React, { useState, useEffect } from "react";
import { queryData } from "../../../utils/queryUser";
import { getCurrentUserId } from "../../../utils/decodeData";
import { useParams } from "react-router-dom";
import "../ExploreTemplate.css";
import "../../Profile/popup.css";
import { createEvent } from './../../../services/Explore/exploreService';

function CreateEventForm({ onClose }) {

  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventItems, setEventItems] = useState([]);
  const [confirmation, setConfirmation] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { userId } = useParams();
  const [user, setUser] = useState({
    username: "",
    role: "",
  });

  useEffect(() => {
    setShowPopup(true);
    const fetchUserData = async () => {
      try {
        const id = userId || getCurrentUserId();
        const userData = await queryData(id);
        if (userData) {
          setUser({
            username: userData.username,
            role: userData.role,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
  
      fetchUserData();
    }, [userId]);

    const handleExit = () => {
      onClose(); 
      setShowPopup(false);
      setConfirmation('');
    };

    //The handle submit function will send the collected information entered to the backend,
    //backend will send to database and store it. 
    const handleSubmit = async (e) => {
      e.preventDefault();

      const selectedDateTime = new Date(dateTime).getTime();
      const currentDateTime = Date.now();

      if (selectedDateTime <= currentDateTime) {
        alert('Please select a future date and time.');
        return;
      }

      const postData = {
        event_description: description,
        event_type: eventType,
        event_name: eventTitle,
        event_location: location,
        event_host: user.role,
        event_time: dateTime,
        event_creator: user.username,
      };

        try {
          const data = await createEvent(postData);

          setConfirmation(data.message || 'New event created! Refresh page to see it displayed.');
          setEventItems([...eventItems, data]);
          setTimeout(handleExit, 2000);  // Optionally close popup automatically after a delay.
        
        } catch (error) {
          console.error("Submit Error, failed to create new event: ", error);
        }
    };

    return (
      <>
        {showPopup && (
          <div className="popup-wrapper">
            <div className="popup">
              <div className="popup-inner">
                
                  {confirmation ? (
                      <>
                          <p style={{fontSize:'24px', color:'black'}} className='mt-5 mb-5'>{confirmation}</p>
                      </>
                  ) : (
                      <>
                        <h2>CREATE AN EVENT</h2>
                        <p>Fill out this out to start your own event!</p>
                        <form  className="form-box" onSubmit={handleSubmit}>

                            <div className='create-event'>
                                <p style={{textAlign: "left", marginTop:"10px", color:"black"}}>Event Information</p>
                                <input type="text" placeholder='Enter event title' value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
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
                                <textarea placeholder='Description...' value={description} onChange={(e) => setDescription(e.target.value)} maxLength={256} />

                                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                                  <option value="">Select Location</option>
                                  <option value="Cesar Chavez Building">Cesar Chavez Building</option>
                                  <option value="Quad">Quad</option>
                                  <option value="Library">Library</option>
                                  <option value="Student Center">Student Center</option>
                                  <option value="Creative Arts Building">Creative Arts Building</option>
                                  <option value="Business Building">Business Building</option>
                                  <option value="Ethnic Studies and Psychology Building">Ethnic Studies and Psychology Building</option>
                                  <option value="Hensill Hall">Hensill Hall</option>
                                  <option value="Burk Hall">Burk Hall</option>
                                  <option value="Fine Arts Building">Fine Arts Building</option>
                                </select>

                                <input type="datetime-local" placeholder='Date & Time' value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

                            </div>                            
                            <div className='create-event-btn'>
                            <button className="exit-button" onClick={handleExit}>CANCEL</button>
                            <button type="submit">Create Event</button>
                            </div>

                        </form>
                      </>
                    )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

export default CreateEventForm;

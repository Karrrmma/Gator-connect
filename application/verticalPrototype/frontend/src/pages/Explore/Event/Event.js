import React, { useState } from 'react';
import '../ExploreTemplate.css';
import { useNavigate } from "react-router-dom";

function Event() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: ''
  });

  const events = [
    {
      name: "Queer Alliance Makeup Night",
      type: "Art",
      description: "Wanna learn how to do your makeup in a gender-affirming way? Come join the Queer Alliance for a -MAKEUP NIGHT !",
      hosts: "Student Names",
      location: "Ceasar Chavez Building",
      time:"Saturday April 20th, 5:30pm PDT"
    },
    {
      name: "Movie Night Under the Stars",
      type: "Entertainment",
      description: "Join us for a cozy movie night under the stars! Bring your blankets and snacks as we screen a classic film.",
      hosts: "Campus Activities Board",
      location: "Campus Lawn",
      time: "Friday, May 3rd, 7:00pm PDT"
    },
    {
      name: "Cultural Fest 2024",
      type: "Cultural",
      description: "Experience the rich diversity of our campus community at Cultural Fest 2024! Enjoy performances, food, and activities from around the world.",
      hosts: "Multicultural Student Union",
      location: "Malcolm X Plaza",
      time: "Saturday, April 27th, 12:00pm PDT"
    },
    {
      name: "Tech Expo: Future Innovations",
      type: "Technology",
      description: "Explore the latest advancements in technology at our Tech Expo! Network with industry professionals.",
      hosts: "Computer Science Society",
      location: "Engineering Building",
      time: "Thursday, May 9th, 10:00am PDT"
    },
    {
      name: "Wellness Workshop: Stress Management",
      type: "Wellness",
      description: "Learn practical strategies for managing stress and maintaining well-being at our Wellness Workshop! Open to all students.",
      hosts: "Student Health Services",
      location: "Wellness Center",
      time: "Wednesday, May 15th, 3:00pm PDT"
    },
    {
      name: "Sports Tournament: Intramural Soccer",
      type: "Sports",
      description: "Compete with fellow students in our Intramural Soccer Tournament! Show off your skills and win prizes.",
      hosts: "Intramural Sports Association",
      location: "Campus Soccer Field",
      time: "Saturday, May 18th, 9:00am PDT"
    },
    {
      name: "Career Fair 2024",
      type: "Career",
      description: "Connect with employers and explore career opportunities at our annual Career Fair! Bring your resume and dress to impress.",
      hosts: "Career Services Center",
      location: "Student Union Ballroom",
      time: "Tuesday, May 21st, 11:00am PDT"
    },
    {
      name: "Art Exhibition: Student Showcase",
      type: "Art",
      description: "Discover the talent of our student artists at the Student Showcase Art Exhibition! View a variety of artworks.",
      hosts: "Art Department",
      location: "University Art Gallery",
      time: "Friday, May 24th, 5:00pm PDT"
    },
    {
      name: "Music Concert: Battle of the Bands",
      type: "Music",
      description: "Experience the ultimate battle of the bands as student musicians compete for the title! Enjoy a night of live music.",
      hosts: "Music Department",
      location: "Campus Amphitheater",
      time: "Saturday, May 25th, 6:00pm PDT"
    }
  ];
  const filteredEvents = events.filter(event => {
    if (filters.type && event.type !== filters.type) return false;
    return true;
  }
  );

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  }

  const handleBack = () => {
    navigate("/explore");
  };

  return (
<div className = "content-wrapper">
  <div className = "search-wrapper">
  <div className="button-and-name">
          <h1>EVENTS</h1>
          <button onClick={handleBack} className="go-back-button">
            Go Back
          </button>
          </div>
          <p
          style={{
            color: "#D3D3D3",
            fontSize: "14px",
            margin: "0",
            textAlign: "left",
          }}
        >
        Great Events offered by SFSU, put together by faculty or students. 
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="SEARCH FOODS..."
            className="search-bar"
            style={{
              marginTop: "30px",
              width: "300px",
              height: "30px",
              borderRadius: "50px",
            }}
          />
        <p
            style={{ marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}
          >
            {" "}
            TYPE 
          </p>
          <select style={{
              marginTop: "10px",
              marginBottom: '10px',
              width: "300px",
              height: "30px",
              borderRadius: "50px",
            }}value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
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
          <select
            style={{
              marginTop: "10px",
              width: "300px",
              height: "30px",
              borderRadius: "50px",
            }}
          >
            <option value="">OPEN DATES</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>

          <p
            style={{ marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}
          >
            SORT BY RATINGS
          </p>
          <select
            style={{
              marginTop: "10px",
              width: "300px",
              height: "30px",
              borderRadius: "50px",
            }}
          >
            <option value="">LEVEL RATINGS</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
          <select
            style={{
              marginTop: "10px",
              width: "300px",
              height: "30px",
              borderRadius: "50px",
            }}
          >
            <option value="">ASCENDING / DESCENDING</option>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>

          <button className="search-button">SEARCH</button>
          </div>
  </div>
    <div className="grid-wrapper">
    {filteredEvents.length === 0 ? (
          <p>Sorry, there are no available events with those set preferences.</p>
        ) : 
          filteredEvents.map((event, index) => (
        <div key={index} className="grid-item">
          <p style={{ color: '#AD45FF', fontSize: '20px', fontWeight: 'bold', margin: '5', textAlign:'center', marginTop: '20px' }}>{event.name}</p>
          <p style={{ color: 'gray', fontSize: '14px', margin: '0', fontWeight: 'bold', textAlign:'center', marginBottom: '10px' }}>{event.type}</p>
          <p style = {{color: 'white', fontSize: '12px', marginTop: '0px'}}>{event.description}</p>
          <p style = {{color: 'gray', fontSize: '12px'}}>Hosts: {event.hosts}</p>
          <p style = {{color: 'gray', fontSize: '12px'}}>Location: {event.location}</p>
          <p style = {{color: 'gray', fontSize: '12px', marginBottom: '0px'}}>Time: {event.time}</p>
          <button className='route-button' >RSVP</button>
        </div>
      ))}
  </div>
  </div>
  );
}

export default Event;
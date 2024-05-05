import React, { useState , useEffect} from "react";
import "../ExploreTemplate.css";
import { useNavigate } from "react-router-dom";
import CreateEventForm from './CreateEventForm';
import RSVPForm from './RSVPForm';

function Event() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);

  const initialFilters = {
    type: "",
    host: "",
  };
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState(initialFilters);

  const [showCreateEventForm, setShowCreateEventForm] = useState(false);

  const [events, setEvents] = useState([]);

  // Function to fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("/events");
      if (response.ok) {
        const eventData = await response.json();
        setEvents(eventData);
      } else {
        console.error("Failed to fetch events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

   // Fetch events when component mounts
   useEffect(() => {
    fetchEvents();
  }, []);


  const formatDate = (dateTimeString) => {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
  
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', options);
  };


  const filteredEvents = events.filter((event) => {
    if (filters.type && event.event_type !== filters.type) return false;
    if (filters.host && event.event_host !== filters.host) return false;
    // Check if the event name contains the search query
    if (
      searchQuery &&
      !event.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleBack = () => {
    navigate("/explore");
  };

  const handleCreateEventClick = () => {
    setShowCreateEventForm(true); 
  };

  const handleRSVPClick = () => {
    setShowForm(true);
  };

  const handleSubmitRSVP = (formData) => {
    // Handle form submission
    console.log('RSVP form submitted:', formData);
  };

  const handleCloseCreateEventForm = () => {
    setShowCreateEventForm(false); // Close the CreateEvent form
  };

  const handleSubmitCreateEvent = (formData) => {
    // Handle CreateEvent form submission
    console.log('CreateEvent form submitted:', formData);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="content-wrapper">
      <div className="search-wrapper">
        <div className="button-and-name">
          <h2 style={{ color: "white" }}>CAMPUS EVENTS</h2>
          <button onClick={handleBack} className="go-back-button">
            Go Back
          </button>
        </div>
        <p
          style={{
            color: "gray",
            fontSize: "14px",
            margin: "0",
            textAlign: "left",
          }}
        >
          Experience the many events hosted by SFSU faculty and student body!
          From enriching cultural showcases to exhilarating sports tournaments, there's 
          something for everyone. Immerse yourself in the dynamic campus community and 
          discover the wide array of opportunities to engage, learn, and connect. 
        </p>

        <div className="search-container-te">
          <input
            type="text"
            placeholder="Search events by name..."
            className="search-bar"
            style={{
              marginTop: "30px",
              width: "300px",
              height: "40px",
              borderRadius: "50px",
            }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <p
            style={{ marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}
          >
            {" "}
            TYPE & CREATOR
          </p>
          <select
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "300px",
              height: "40px",
              borderRadius: "50px",
              className: "select-options",
            }}
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
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
              height: "40px",
              borderRadius: "50px",
              className: "select-options",
            }}
            value={filters.creator}
            onChange={(e) => handleFilterChange("host", e.target.value)}
          >
            <option value="">Hosted by</option>
            <option value="Professor">professor</option>
            <option value="Student">student</option>
          </select>

          <div className="button-container">
          <button onClick={handleCreateEventClick} className="search-button">
            Create An Event
          </button>
          <button onClick={handleResetFilters} className="search-button">
            Reset Filters
          </button>
          </div>

        </div>
        {showCreateEventForm && <CreateEventForm onSubmit={handleSubmitCreateEvent} onClose={handleCloseCreateEventForm} />}
      </div>
      <div className="grid-wrapper">
        {filteredEvents.length === 0 ? (
          <div
            className="grid-item"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <p>No Events Found.</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <div key={index} className="grid-item">
            <p
              style={{
                color: "#AD45FF",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "5",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {event.event_name}
            </p>
            <p
              style={{
                color: "gray",
                fontSize: "14px",
                margin: "0",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {event.event_type}
            </p>
            <p style={{ color: "white", fontSize: "12px", marginTop: "0px" }}>
              {event.event_description}
            </p>
            <p style={{ color: "gray", fontSize: "12px" }}>
              Hosts: {event.event_host}
            </p>
            <p style={{ color: "gray", fontSize: "12px" }}>
              Location: {event.event_location}
            </p>
            <p
              style={{ color: "gray", fontSize: "12px", marginBottom: "0px" }}
            >
               Time: {formatDate(event.event_time)}
            </p>
            <button onClick={handleRSVPClick} className="route-button">Register</button>
            </div>
          ))
        )}
      </div>
      {showForm && <RSVPForm onSubmit={handleSubmitRSVP} onClose={handleCloseForm} />}
    </div>
  );
}

export default Event;
import React, { useState } from 'react';
import './Event.css';

function Event() {

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
      description: "Explore the latest advancements in technology at our Tech Expo! Discover innovative projects and network with industry professionals.",
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
      description: "Discover the talent of our student artists at the Student Showcase Art Exhibition! View a variety of artworks in different mediums.",
      hosts: "Art Department",
      location: "University Art Gallery",
      time: "Friday, May 24th, 5:00pm PDT"
    },
    {
      name: "Music Concert: Battle of the Bands",
      type: "Music",
      description: "Experience the ultimate battle of the bands as student musicians compete for the title! Enjoy a night of live music and entertainment.",
      hosts: "Music Department",
      location: "Campus Amphitheater",
      time: "Saturday, May 25th, 6:00pm PDT"
    }
  ];

  return (
<div className = "event-container">
    <div className="event-grid">
    {events.length === 0 ? (
      <p>No events found.</p>
    ) : (
      events.map((event, index) => (
        <div key={index} className="event-panel">
          <p>________________________________</p>
          <p style={{ color: '#AD45FF', fontSize: '20px', fontWeight: 'bold', margin: '5' }}>{event.name}</p>
          <p style={{ color: 'gray', fontSize: '14px', margin: '0', fontWeight: 'bold' }}>{event.type}</p>
          <p>________________________________</p>
          <p>Description: {event.description}</p>
          <p>Hosts: {event.hosts}</p>
          <p>Location: {event.location}</p>
          <p>Time: {event.time}</p>
          <button >RSVP</button>
        </div>
      ))
    )}
  </div>
  </div>
  );
}

export default Event;
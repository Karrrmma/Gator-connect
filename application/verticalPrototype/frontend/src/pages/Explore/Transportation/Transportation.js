import React, { useState } from 'react';
import './Transportation.css';
import { useNavigate } from 'react-router-dom';

import bart_map from './bart_map.jpg';
import bart_night from './bart_night.jpg';
import route_28 from './route_28.jpg';
import route_28R from './route_28R.jpg';
import route_29 from './route_29.jpg';
import route_57 from './route_57.jpg';
import route_91 from './route_91.jpg';
import route_M from './route_M.jpg';

function Transportation() {
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const navigate = useNavigate();

  const routes = [
    { 
      name: "Route 28", 
      type: "Muni",
      image: route_28,
      accessibility: "Wheelchair accessible",
      hours: "Monday-Friday Service: 05:00am - 12:50am",
      pickUpLocation: "Off of 19th st, near Station Cafe",
      additionalInfo: "Route 28 serves downtown and the surrounding areas."
    },
    { 
      name: "Route 28R", 
      type: "Muni",
      image: route_28R,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "East campus bus stop",
      additionalInfo: "Route 28R is an express route with limited stops."
    },
    { 
      name: "Route 29", 
      type: "Muni",
      image: route_29,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "East campus bus stop",
      additionalInfo: "Route 29 runs through Sunset District."
    },
    { 
      name: "Route 57", 
      type: "Muni",
      image: route_57,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "South campus bus stop",
      additionalInfo: "Route 57 will run through parkmerced and take you to bart."
    },
    { 
      name: "Route 91 OWL", 
      type: "Muni",
      image: route_91,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Friday, 12am - 6am",
      pickUpLocation: "South campus bus stop",
      additionalInfo: "Route 91 will run through the entirety of SF."
    },
    { 
      name: "Route M", 
      type: "Muni Metro",
      image: route_M,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus entrance",
      additionalInfo: "Route M will run through Market st toward downtown."
    },
    { 
      name: "Bay Area Rapid Transit - Day", 
      type: "Bart Lines",
      image: bart_map,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Sunday, 5am - 9pm",
      pickUpLocation: "Daly City Bart Station",
      additionalInfo: "Bart will take you through the bay area, accesible via SFSU shuttle."
    },
    { 
      name: "Bay Area Rapid Transit - Night", 
      type: "Bart Lines",
      image: bart_night,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Sunday, 9pm - 12am",
      pickUpLocation: "Daly City Bart Station",
      additionalInfo: "Bart will take you through the bay area, accesible via SFSU shuttle."
    },
    { 
      name: "SFSU Shuttle",
      type: "Shuttle",
      image: bart_map,
      accessibility: "Wheelchair accessible",
      hours: "Monday - Friday, 7am - 6:30pm",
      pickUpLocation: "Campus Main Entrance",
      additionalInfo: "Shuttle will take you to Daly City Bart station."
    },
  ];

  const handleClick = (route) => {
    setSelectedRoute(route);
    setShowRouteMap(true);
  }

  return (
    <div className="route-container">
      <h1>Transportation</h1>
      
      
      <div className="route-grid">
        {routes.map((route, index) => (
          <div key={index} className="route-panel">
            <h2>{route.name}</h2>
            <h3>{route.type}</h3>
            <p>Accessibility: {route.accessibility}</p>
            <p>Hours: {route.hours}</p>
            <p>Pick-Up Location: {route.pickUpLocation}</p>
            <p>{route.additionalInfo}</p>
            <button onClick={() => handleClick(route)}>View Route Map</button>
          </div>
        ))}
      </div>
      {showRouteMap && (
        <div className="route-map">
          <img src={selectedRoute.image} alt={selectedRoute.name} />
          <button onClick={() => setShowRouteMap(false)}>Close Map</button>
        </div>
      )}
    </div>
  );
}

export default Transportation;
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
  const [filters, setFilters] = useState({
    type: '',
    accessibility: false,
    midnight: false,
    direction: '',
  });
  const navigate = useNavigate();

  const routes = [
    { 
      name: "Route 28", 
      type: "Muni",
      image: route_28,
      accessibility: true,
      hours: "Monday-Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route 28 serves downtown and the surrounding areas.",
      midnight: false,
      direction: ["Golden Gate Park", "Bart Station", "Golden Gate Bridge", "Marina", "Park Presidio", "Sunset"]
    },
    { 
      name: "Route 28R", 
      type: "Muni",
      image: route_28R,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route 28R is an express route with limited stops.",
      midnight: false,
      direction: ["Golden Gate Park", "Bart Station", "Park Presidio", "Sunset"]
    },
    { 
      name: "Route 29", 
      type: "Muni",
      image: route_29,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route 29 runs through Sunset District.",
      midnight: false,
      direction: ["Golden Gate Park", "Sunset", "Park Presidio", "Bart Station", "Bayshore"]
    },
    { 
      name: "Route 57", 
      type: "Muni",
      image: route_57,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "South Campus, near Mashouf",
      additionalInfo: "Route 57 will run through parkmerced and take you to bart.",
      midnight: false,
      direction: ["Lake Merced", "Fort Funston", "Bart Station", "West Portal"]
    },
    { 
      name: "Route 91 OWL", 
      type: "Muni",
      image: route_91,
      accessibility: true,
      hours: "Monday - Friday, 12am - 6am",
      pickUpLocation: "South campus bus stop, near Mashouf",
      additionalInfo: "Route 91 will run through the entirety of SF.",
      midnight: true,
      direction: ["Golden Gate Park", "Bart Station", "Golden Gate Bridge", "Marina", "Park Presidio", "Downtown", "Bayshore", "West Portal"]
    },
    { 
      name: "Route M", 
      type: "Muni Metro",
      image: route_M,
      accessibility: true,
      hours: "Monday - Friday, 5am - 12:50am",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Route M will run through Market st toward downtown.",
      midnight: false,
      direction: ["West Portal", "Bart Station", "Downtown"]
    },
    { 
      name: "Bay Area Rapid Transit - Day", 
      type: "Bart Lines",
      image: bart_map,
      accessibility: true,
      hours: "Monday - Sunday, 5am - 9pm",
      pickUpLocation: "Daly City Bart Station",
      additionalInfo: "Bart will take you through the bay area, accesible via SFSU shuttle.",
      midnight: false,
      direction: "Leave SF"
    },
    { 
      name: "Bay Area Rapid Transit - Night", 
      type: "Bart Lines",
      image: bart_night,
      accessibility: true,
      hours: "Monday - Sunday, 9pm - 12am",
      pickUpLocation: "Daly City Bart Station",
      additionalInfo: "Bart will take you through the bay area, accesible via SFSU shuttle.",
      midnight: false,
      direction: "Leave SF"
    },
    { 
      name: "SFSU Shuttle",
      type: "Shuttle",
      image: bart_map,
      accessibility: false,
      hours: "Monday - Friday, 7am - 6:30pm",
      pickUpLocation: "Main Campus Entrance, 19th St",
      additionalInfo: "Shuttle will take you to Daly City Bart station.",
      midnight: false,
      direction: "Bart Station"
    },
  ];

  const filteredRoutes = routes.filter(route => {
    if (filters.type && route.type !== filters.type) return false;
    if (filters.accessibility && !route.accessibility) return false;
    if (filters.midnight && !route.midnight) return false;
    // Filter by direction
  if (filters.direction) {
    // Check if route direction is an array
    if (Array.isArray(route.direction)) {
      // If it's an array, check if any of the stops match the selected direction
      if (!route.direction.includes(filters.direction)) return false;
    } else {
      // If it's a string, directly compare with the selected direction
      if (route.direction !== filters.direction) return false;
    }
  }
    return true;
  });

  const handleClick = (route) => {
    setSelectedRoute(route);
    setShowRouteMap(true);
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  }

  return (

    <div className="route-container">
    <h1>Transportation</h1> 
    <h4>Lines that will meet you on campus!</h4>

      <div className="filter-bar">
      
          <p>________________</p>      
          <p>Refine your travel plans.</p>
          
          <div className="search-container">

          <div>
        <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)}>
          <option value="">Select Transit Type</option>
          <option value="Shuttle">Shuttle</option>
          <option value="Muni">Muni</option>
          <option value="Muni Metro">Muni Metro</option>
          <option value="Bart Lines">Bart Lines</option>
        </select>
      </div>
      <div>
        <select value={filters.direction} onChange={(e) => handleFilterChange('direction', e.target.value)}>
          <option value="">Select Destination</option>
          <option value="Bart Station">Bart Station</option>
          <option value="Downtown">Downtown</option>
          <option value="Leave SF">Leave SF</option>
          <option value="Lake Merced">Lake Merced</option>
          <option value="Sunset">Sunset</option>
          <option value="Golden Gate Park">Golden Gate Park</option>
          <option value="Marina">Marina</option>
          <option value="Bayshore">Bayshore</option>
          <option value="West Portal">West Portal</option>
          <option value="Golden Gate Bridge">Golden Gate Bridge</option>
          <option value="Park Presidio">Park Presidio</option>
          <option value="Fort Funston">Fort Funston</option>
          
        </select>
      </div>

      <div>
            <label name ="accessible">
              <input 
                type="checkbox" 
                checked={filters.accessibility} 
                onChange={(e) => handleFilterChange('accessibility', e.target.checked)} 
              />
              Wheelchair accessible
            </label>
          </div>
        
            <div>
        <label name = "midnight">
          <input 
            type="checkbox" 
            checked={filters.midnight} 
            onChange={(e) => handleFilterChange('midnight', e.target.checked)} 
          />
          Runs after midnight
        </label>
      </div>
      <p>________________</p>   
          </div>
      </div>
      
      <div className="route-grid">
        {filteredRoutes.length === 0 ? (
          <p>Sorry, there are no available routes with those set preferences.</p>
        ) : 
          filteredRoutes.map((route, index) => (
          <div key={index} className="route-panel">
            <p>________________________________</p>
            <p style ={{ color: '#AD45FF', fontSize: '20px', fontWeight: 'bold', margin:'5' }}>{route.name}</p>
            <p style = {{ color: 'gray', fontSize: '14px', margin: '0', fontWeight: 'bold'}}>{route.type}</p>
            <p>________________________________</p>
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
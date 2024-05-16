import React, { useState } from "react";
import "../ExploreTemplate.css";
import { useNavigate } from "react-router-dom";
import { RouteData } from "./RouteData";

function Transportation() {
  const navigate = useNavigate();
  const [showRouteMap, setShowRouteMap] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const initialFilters = {
    type: "",
    accessibility: false,
    midnight: false,
    direction: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const routes = RouteData;

  const filteredRoutes = routes.filter((route) => {
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
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleBack = () => {
    navigate("/explore");
  };

  return (
    <div className="content-wrapper">
      <div className="search-wrapper">
        <div className="button-and-name">
          <h2 style={{ color: "white" }}>TRANSPORTATION</h2>
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
          Embark on a journey through the bustling streets of San Francisco with our 
          comprehensive transportation guide. Whether it's a scenic
          ride through the city or a swift commute to your next adventure, our transportation 
          page equips you with the knowledge to traverse San Francisco seamlessly. 
        </p>

        <div className="search-container-te">
          <h4 style={{ marginTop: "30px", marginBottom: "30px" }}>
            Refine your travel plans:
          </h4>
          <select
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: "300px",
              height: "40px",
              borderRadius: "50px",
            }}
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
          >
            <option value="">Select Transit Type</option>
            <option value="Shuttle">Shuttle</option>
            <option value="Muni">Muni</option>
            <option value="Muni Metro">Muni Metro</option>
            <option value="Bart Lines">Bart Lines</option>
          </select>

          <select
            style={{
              marginTop: "10px",
              width: "300px",
              height: "40px",
              borderRadius: "50px",
            }}
            value={filters.direction}
            onChange={(e) => handleFilterChange("direction", e.target.value)}
          >
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

          <div className="checkbox">
            <input
              type="checkbox"
              checked={filters.accessibility}
              onChange={(e) =>
                handleFilterChange("accessibility", e.target.checked)
              }
            />
            <label name="accessible">Wheelchair accessible </label>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              checked={filters.midnight}
              onChange={(e) => handleFilterChange("midnight", e.target.checked)}
            />
            <label name="midnight">Runs after midnight</label>
          </div>
          <div>
            <button onClick={handleResetFilters} className="search-button">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid-wrapper">
        {filteredRoutes.length === 0 ? (
          <div
            className="grid-item"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            <p>No available routes.</p>
          </div>
        ) : (
          filteredRoutes.map((route, index) => (
            <div key={index} className="grid-item">
              <p
                style={{
                  color: "#AD45FF",
                  fontSize: "20px",
                  fontWeight: "bold",
                  margin: "5",
                  marginTop: "20px",
                  textAlign: "center",
                }}
              >
                {route.name}
              </p>
              <p
                style={{
                  color: "gray",
                  fontSize: "14px",
                  margin: "0",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                {route.type}
              </p>
              <p
                style={{ color: "white", fontSize: "12px", marginTop: "20px" }}
              >
                {route.additionalInfo}
              </p>
              <p style={{ color: "gray", fontSize: "12px" }}>
                Hours: {route.hours}
              </p>
              <p style={{ color: "gray", fontSize: "12px" }}>
                Pick-Up Location: {route.pickUpLocation}
              </p>

              <button
                className="route-button"
                onClick={() => handleClick(route)}
              >
                View Map
              </button>
            </div>
          ))
        )}
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

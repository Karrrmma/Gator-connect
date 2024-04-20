import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaUtensils, FaSchool, FaBus } from "react-icons/fa";

function Explore() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const routes = [
    {
      path: "foodvendor",
      text: "FOOD VENDORS",
      description: "Find a variety of food vendors on campus.",
      icon: FaUtensils,
    },
    {
      path: "transportation",
      text: "TRANSPORTATION",
      description: "Discover transportation options available for students.",
      icon: FaBus,
    },
    {
      path: "event",
      text: "CAMPUS EVENTS",
      description: "Stay updated on upcoming campus events.",
      icon: FaSchool,
    },
  ];

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    margin: "30px 0",
    fontSize: "1rem",
    borderRadius: "20px",
    border: "none",
    outline: "none",
    backgroundColor: "black",
    color: "white",
    height: "5%",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "20px 0",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "black",
    color: "#fff",
    textDecoration: "none",
  };

  const textStyle = {
    marginLeft: "20px", // Space between icon and text
  };

  const checkItOutStyle = {
    padding: "10px 20px",
    borderRadius: "50px",
    backgroundColor: "#AD45FF",
    color: "white",
    textDecoration: "none",
    fontSize: "12px",
    width: "160px",
  };

  return (
    <section style={containerStyle}>
      <h1 style={{ marginBottom: "0.5em" }}>EXPLORE</h1>
      <p> Let's explore lots of useful functionalities ! </p>
      <input
        type="text"
        placeholder="SEARCH..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={inputStyle}
      />
      {routes.map((route, index) => (
        <Link key={route.text} to={`/explore/${route.path}`} style={itemStyle}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <route.icon style={{ width: '40px' }} />
            <div style={textStyle}>
              <h2 style={{ margin: "0", fontSize: "17px" }}>{route.text}</h2>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                {route.description}
              </p>
            </div>
          </div>
          <div style={checkItOutStyle}>CHECK IT OUT</div>
        </Link>
      ))}
      <Link
        to="/home"
        style={{
          ...checkItOutStyle,
          marginTop: "30px",
          backgroundColor: "gray",
        }}
      >
        BACK HOME
      </Link>
    </section>
  );
}

export default Explore;

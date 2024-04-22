import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../ExploreTemplate.css";
import { FaStar, FaCommentDots } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const vendorsInfo = {
  "Cafe 101": {
    location: "Cesar Chavez Student, Plaza Level",
    schedule: {
      Monday: "07:30 am - 04:00 pm",
      Tuesday: "07:30 am - 04:00 pm",
      Wednesday: "07:30 am - 04:00 pm",
      Thursday: "07:30 am - 04:00 pm",
      Friday: "07:30 am - 02:30 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Cafe Rosso": {
    location: "Centennial Walkway (behind Burk Hall)",
    schedule: {
      Monday: "07:00 am - 05:00 pm",
      Tuesday: "07:00 am - 05:00 pm",
      Wednesday: "07:00 am - 05:00 pm",
      Thursday: "07:00 am - 05:00 pm",
      Friday: "07:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "City Cafe": {
    location: "Cesar Student Center, West Plaza",
    schedule: {
      Monday: "10:00 am - 04:30 pm",
      Tuesday: "10:00 am - 04:30 pm",
      Wednesday: "10:00 am - 04:30 pm",
      Thursday: "10:00 am - 04:30 pm",
      Friday: "10:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Clean Bites": {
    location: "Mashouf Wellness Center",
    schedule: {
      Monday: "11:00 am - 06:00 pm",
      Tuesday: "11:00 am - 06:00 pm",
      Wednesday: "11:00 am - 06:00 pm",
      Thursday: "11:00 am - 06:00 pm",
      Friday: "11:00 am - 04:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Farm Fresh Underground": {
    location: "Cesar Chavez Student Center, Lower Conference Level",
    schedule: {
      Monday: "10:00 am - 03:00 pm",
      Tuesday: "10:00 am - 03:00 pm",
      Wednesday: "10:00 am - 03:00 pm",
      Thursday: "10:00 am - 03:00 pm",
      Friday: "CLOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Gold Coast Grill & Catering": {
    location: "Cesar Chavez Student Center, Plaza Level",
    schedule: {
      Monday: "08:00 am - 04:00 pm",
      Tuesday: "08:00 am - 04:00 pm",
      Wednesday: "08:00 am - 04:00 pm",
      Thursday: "08:00 am - 04:00 pm",
      Friday: "08:00 am - 02:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Good to Go": {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "ClOSED",
      Tuesday: "ClOSED",
      Wednesday: "ClOSED",
      Thursday: "ClOSED",
      Friday: "ClOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
  },
  "Halal Shop": {
    location: "Cesar Chavez Student Center, West Plaza",
    schedule: {
      Monday: "09:00 am - 06:00 pm",
      Tuesday: "09:00 am - 06:00 pm",
      Wednesday: "09:00 am - 06:00 pm",
      Thursday: "09:00 am - 06:00 pm",
      Friday: "09:00 am - 06:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "HSS 121 Cafe": {
    location: "1st floor of Health & Social Sciences Building, HSS 121",
    schedule: {
      Monday: "08:00 am - 03:00 pm",
      Tuesday: "08:00 am - 03:00 pm",
      Wednesday: "08:00 am - 03:00 pm",
      Thursday: "08:00 am - 03:00 pm",
      Friday: "ClOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Natural Sensations": {
    location: "Cesar Chavez Student Center, Plaza Level",
    schedule: {
      Monday: "08:00 am - 04:00 pm",
      Tuesday: "08:00 am - 04:00 pm",
      Wednesday: "08:00 am - 04:00 pm",
      Thursday: "08:00 am - 04:00 pm",
      Friday: "08:00 am - 02:30 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Nizario's Pizza": {
    location: "Cesar Chavez Studnet Center, Recreation & Dining Level",
    schedule: {
      Monday: "10:00 am - 06:00 pm",
      Tuesday: "10:00 am - 06:00 pm",
      Wednesday: "10:00 am - 06:00 pm",
      Thursday: "10:00 am - 06:00 pm",
      Friday: "10:00 am - 06:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Peet's Coffee & Tea": {
    location: "First Floor of the J. Paul Leonard Library",
    schedule: {
      Monday: "07:00 am - 08:00 pm",
      Tuesday: "07:00 am - 08:00 pm",
      Wednesday: "07:00 am - 08:00 pm",
      Thursday: "07:00 am - 08:00 pm",
      Friday: "07:00 am - 04:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  Quickly: {
    location: "Cesar Chavez Student Center, West Plaza",
    schedule: {
      Monday: "10:00 am - 05:30 pm",
      Tuesday: "10:00 am - 05:30 pm",
      Wednesday: "10:00 am - 05:30 pm",
      Thursday: "10:00 am - 05:30 pm",
      Friday: "10:00 am - 05:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Station Cafe": {
    location: "19th Avenue (in front of HSS Building)",
    schedule: {
      Monday: "07:00 am - 05:00 pm",
      Tuesday: "07:00 am - 05:00 pm",
      Wednesday: "07:00 am - 05:00 pm",
      Thursday: "07:00 am - 05:00 pm",
      Friday: "07:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  Subway: {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "07:00 am - 11:00 pm",
      Tuesday: "07:00 am - 11:00 pm",
      Wednesday: "07:00 am - 11:00 pm",
      Thursday: "07:00 am - 11:00 pm",
      Friday: "09:00 am - 09:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Taqueria Girasol": {
    location: "Cesar Chavez Student Center, Plaza Level",
    schedule: {
      Monday: "08:00 am - 04:00 pm",
      Tuesday: "08:00 am - 04:00 pm",
      Wednesday: "08:00 am - 04:00 pm",
      Thursday: "08:00 am - 04:00 pm",
      Friday: "08:00 am - 02:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Taza Smoothies & Wraps": {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "09:00 am - 04:00 pm",
      Tuesday: "09:00 am - 04:00 pm",
      Wednesday: "09:00 am - 04:00 pm",
      Thursday: "09:00 am - 04:00 pm",
      Friday: "09:00 am - 03:00 pm",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "The Pub at SFSU": {
    location: "Cesar Chavez Student Center, Lower Conference Level",
    schedule: {
      Monday: "12:00 am - 05:00 pm",
      Tuesday: "12:00 am - 07:00 pm",
      Wednesday: "12:00 am - 07:00 pm",
      Thursday: "12:00 am - 07:00 pm",
      Friday: "CLOSED",
      Saturday: "CLOSED",
      Sunday: "CLOSED",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
  "Village Market & Pizza": {
    location: "Village at Centennial Square",
    schedule: {
      Monday: "10:00 am - 11:00 pm",
      Tuesday: "10:00 am - 11:00 pm",
      Wednesday: "10:00 am - 11:00 pm",
      Thursday: "10:00 am - 11:00 pm",
      Friday: "10:00 am - 11:00 pm",
      Saturday: "10:00 am - 11:00 pm",
      Sunday: "11:00 am - 11:00 pm",
    },
    menu: [
      { name: "House Coffee", price: "$2.50" },
      { name: "Matcha Green Latte", price: "$4.05" },
      { name: "Thai Tea Latte", price: "$4.05" },
      { name: "Hot Chocolate", price: "$3.65" },
      { name: "Espresso", price: "$2.60" },
      { name: "Cappuccino", price: "$3.55" },
      { name: "Americano", price: "$2.75" },
      { name: "Cafe Mocha", price: "$4.45" },
      { name: "Gator", price: "$4.45" },
      { name: "Tuxedo Mocha", price: "$4.45" },
      { name: "White Mocha", price: "$4.45" },
      { name: "Vanilla Cream Latte", price: "$4.45" },
    ],
  },
};

function VendorDetail() {
  const location = useLocation();
  const vendorFromState = location.state?.vendor;

  let { name } = useParams();
  name = decodeURIComponent(name.replace(/-/g, " "));
  const navigate = useNavigate();
  const vendor = { ...vendorsInfo[name], ...vendorFromState }; 

  const [menuItems, setMenuItems] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuRating, setMenuRating] = useState("");
  const [menuReview, setMenuReview] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/vendordetail/${name}`);
        const data = await response.json();
        if (response.ok) {
          setMenuItems(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
    fetchData();
  }, [name]);

  if (!vendor) {
    return <div>Loading vendor details...</div>;
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredItems = menuItems.filter((item) =>
    item.menu_name.toLowerCase().includes(searchText)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      vendor_name: name,
      menu_name: menuName,
      menu_rating: menuRating,
      menu_review: menuReview,
    };

    try {
      const response = await fetch("/vendordetail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      if (response.ok) {
        setMenuItems([...menuItems, postData]);
        navigate("/explore/foodVendor");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const handleBack = () => {
    navigate("/explore/foodVendor");
  };

  const handleReviewChange = (event) => {
    const newText = event.target.value;
    // Limit the review to 100 characters
    if (newText.length <= 100) {
      setMenuReview(newText);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="search-wrapper">
        <div className="button-and-name">
          <h1 style={{ color: "white" }}>FOOD VENDORS</h1>
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
          This explanation will be varied depending on the type of vendor_name.
        </p>

        <div className="extended-search-container">
          <h2 style={{ color: "#AD45FF" }}>{name}</h2>
          <p
            style={{
              color: "white",
              fontSize: "14px",
              margin: "0",
              lineHeight: "10px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <FaStar style={{ color: "yellow" }} />
            {vendor.average_rating.toFixed(1)} ratings
            <FaCommentDots style={{ marginLeft: "5px" }} /> {vendor.num_reviews}{" "}
            reviews
          </p>

          <div className="button-and-name">
            <input
              type="text"
              placeholder="SEARCH FOOD HERE"
              className="search-bar"
              value={searchText}
              onChange={handleSearchChange}
              style={{
                marginTop: "20px",
                marginLeft: "30px",
                width: "240px",
                height: "30px",
                borderRadius: "50px",
              }}
            />
          </div>

          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
            }}
          >
            {" "}
            SCHEDULE
          </p>
          <p style={{ color: "#D3D3D3", fontSize: "14px", textAlign: "left" }}>
            {Object.entries(vendor.schedule).map(([day, hours]) => (
              <p key={day}>{`${day}: ${hours}`}</p>
            ))}
          </p>
          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
              textAlign: "left",
            }}
          >
            {" "}
            LOCATION
          </p>
          <p
            style={{
              color: "#D3D3D3",
              fontSize: "14px",
              marginBottom: "15px",
              textAlign: "center",
              paddingLeft: "70px",
              paddingRight: "70px",
            }}
          >
            {vendor.location}
          </p>

          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#AD45FF",
              textAlign: "left",
            }}
          >
            {" "}
            Rate & Review
          </p>
          <p
            style={{
              color: "#D3D3D3",
              fontSize: "14px",
              marginBottom: "15px",
              textAlign: "left",
            }}
          >
            Share your experience to help others
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                style={{ width: "300px", height: "30px", borderRadius: "50px" }}
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="FOOD NAME"
                required
              />
            </div>
            <div className="input-group">
              <input
                style={{ width: "300px", height: "30px", borderRadius: "50px" }}
                type="number"
                value={menuRating}
                onChange={(e) => setMenuRating(e.target.value)}
                placeholder="LEVEL RATINGS"
                step="0.5"
                min="0"
                max="5"
                required
              />
            </div>
            <div className="input-group">
              <textarea
                style={{ width: "300px", height: "30px", borderRadius: "50px" }}
                value={menuReview}
                onChange={(e) => {
                  if (e.target.value.length <= 100) {
                    setMenuReview(e.target.value);
                  }

                  handleReviewChange(e);
                }}
                placeholder="WRITE YOUR FEEDBACK HERE..."
              />
            </div>
            <button type="submit" className="go-back-button">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div
        className="menu-item-wrapper"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="menu-wrapper"
          style={{
            width: "800px",
            height: "300px",
            marginLeft: "15px",
            marginBottom: "70px",
            display: "grid",
            gridTemplate: "repeat(3, 1fr)",
            gap: "10px",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <h2 style={{ color: "#AD45FF", margin: "0 0 20px 0" }}>Menu</h2>
          {vendor.menu && vendor.menu.length > 0 ? (
            <div
              style={{
                gap: "15px",
                alignItems: "center",
              }}
            >
              {vendor.menu.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    background: "#2C2C2E",
                    borderRadius: "5px",
                    color: "white",
                    fontSize: "18px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>{item.name}</strong> {item.price}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "white" }}>No menu available.</p>
          )}
        </div>
        <div className="grid-wrapper">
          {filteredItems.length > 0 &&
          filteredItems.some(
            (item) => item.menu_rating > 0 || item.menu_review > 0
          ) ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="small-grid-item"
                style={{
                  backgroundColor: "black",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  overflow: "hidden",
                  borderRadius: "30px",
                  width: "250px",
                  height: "190px",
                  paddingLeft: "14px",
                  marginBottom: "47px",
                  marginRight: "10px",
                }}
              >
                <h3>{item.menu_name}</h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    margin: "0",
                    lineHeight: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <FaStar style={{ color: "yellow", marginRight: "5px" }} />
                  {item.menu_rating} ratings
                </p>
                <p
                  style={{
                    color: "white",
                    fontSize: "14px",
                    marginTop: "10px",
                    lineHeight: "20px",
                    display: "flex",
                    width: "100%",
                    paddingRight: "15px",
                  }}
                >
                  <FaCommentDots
                    style={{
                      marginRight: "10px",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  <span>{item.menu_review}</span>
                </p>
              </div>
            ))
          ) : (
            <div
              className="empty-grid-placeholder"
              style={{
                backgroundColor: "black",
                color: "white",
                width: "250px",
                height: "190px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "30px",
                marginBottom: "47px",
              }}
            >
              No Ratings &amp; Comments
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDetail;

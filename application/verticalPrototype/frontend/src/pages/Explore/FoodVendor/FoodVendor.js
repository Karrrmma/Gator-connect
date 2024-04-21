import React, { useState, useEffect, useRef } from "react";
import '../ExploreTemplate.css';
import { useNavigate } from "react-router-dom";
import { FaStar, FaCommentDots } from "react-icons/fa";

import vendorImage1 from "./vendorimg/vendor1.jpg";
import vendorImage2 from "./vendorimg/vendor2.jpg";
import vendorImage3 from "./vendorimg/vendor3.jpg";
import vendorImage4 from "./vendorimg/vendor4.jpg";
import vendorImage5 from "./vendorimg/vendor5.jpg";
import vendorImage6 from "./vendorimg/vendor6.jpg";
import vendorImage7 from "./vendorimg/vendor7.jpg";
import vendorImage8 from "./vendorimg/vendor8.jpg";
import vendorImage9 from "./vendorimg/vendor9.jpg";
import vendorImage10 from "./vendorimg/vendor10.jpg";
import vendorImage11 from "./vendorimg/vendor11.jpg";
import vendorImage12 from "./vendorimg/vendor12.jpg";
import vendorImage13 from "./vendorimg/vendor13.jpg";
import vendorImage14 from "./vendorimg/vendor14.jpg";
import vendorImage15 from "./vendorimg/vendor15.jpg";
import vendorImage16 from "./vendorimg/vendor16.jpg";
import vendorImage17 from "./vendorimg/vendor17.jpg";
import vendorImage18 from "./vendorimg/vendor18.jpg";
import vendorImage19 from "./vendorimg/vendor19.jpg";

function FoodVendor() {
  const navigate = useNavigate();
  const initialVendorsRef = useRef(
    [
      {
        name: "Cafe 101",
        imageUrl: vendorImage1,
        short_description: "Classic coffee and snacks.",
        detailed_description:
          "Cafe 101 offers a variety of coffee blends, artisan teas, and small bites.",
      },
      {
        name: "Cafe Rosso",
        imageUrl: vendorImage2,
        short_description: "Italian café classics.",
        detailed_description:
          "Cafe Rosso serves traditional Italian coffees, homemade pastries, and paninis.",
      },
      {
        name: "City Cafe",
        imageUrl: vendorImage3,
        short_description: "Urban eatery hub.",
        detailed_description:
          "City Cafe offers a bustling urban atmosphere with a menu.",
      },
      {
        name: "Clean Bites",
        imageUrl: vendorImage4,
        short_description: "Healthy meals to-go.",
        detailed_description:
          "Clean Bites focuses on nutritious, whole-food meals.",
      },
      {
        name: "Farm Fresh Underground",
        imageUrl: vendorImage5,
        short_description: "Farm-to-table experience.",
        detailed_description:
          "Discover the taste of freshness at Farm Fresh Underground.",
      },
      {
        name: "Gold Coast Grill & Catering",
        imageUrl: vendorImage6,
        short_description: "Grill and barbecue.",
        detailed_description:
          "Gold Coast Grill offers an exquisite barbecue and grill menu.",
      },
      {
        name: "Good to Go",
        imageUrl: vendorImage7,
        short_description: "Quick, tasty bites.",
        detailed_description:
          "Good to Go is your best bet for fast, delicious meals.",
      },
      {
        name: "HSS 121 Cafe",
        imageUrl: vendorImage8,
        short_description: "Casual campus café.",
        detailed_description:
          "HSS 121 Cafe is a favorite spot for students and faculty.",
      },
      {
        name: "Village Market & Pizza",
        imageUrl: vendorImage9,
        short_description: "Gourmet pizzas and more.",
        detailed_description: "Fresh ingredients at Village Market & Pizza.",
      },
      {
        name: "Natural Sensations",
        imageUrl: vendorImage10,
        short_description: "Organic and natural.",
        detailed_description:
          "Natural Sensations offers a menu full of organic options.",
      },
      {
        name: "Nizario's Pizza",
        imageUrl: vendorImage11,
        short_description: "Classic pizzeria.",
        detailed_description: "Nizario's Pizza serves classic pizza favorites.",
      },
      {
        name: "Peet's Coffee & Tea",
        imageUrl: vendorImage12,
        short_description: "Rich coffees and teas.",
        detailed_description:
          "Peet's Coffee & Tea provides a superior coffee experience.",
      },
      {
        name: "Quickly",
        imageUrl: vendorImage13,
        short_description: "Snappy Asian fusion.",
        detailed_description:
          "Quickly is the go-to spot for Asian fusion treats.",
      },
      {
        name: "Halal Shop",
        imageUrl: vendorImage14,
        short_description: "Authentic Halal cuisine.",
        detailed_description:
          "The Halal Shop offers a variety of authentic Halal dishes.",
      },
      {
        name: "Station Cafe",
        imageUrl: vendorImage15,
        short_description: "Coffee and pastries.",
        detailed_description:
          "Station Cafe is your neighborhood stop for freshly brewed coffee.",
      },
      {
        name: "Subway",
        imageUrl: vendorImage16,
        short_description: "Fresh sandwiches made-to-order.",
        detailed_description: "Subway offers a variety of subs and salads.",
      },
      {
        name: "Taqueria Girasol",
        imageUrl: vendorImage17,
        short_description: "Sunny Mexican flavors.",
        detailed_description:
          "Taqueria Girasol brings you vibrant Mexican cuisine.",
      },
      {
        name: "Taza Smoothies & Wraps",
        imageUrl: vendorImage18,
        short_description: "Smoothies and wraps.",
        detailed_description:
          "Taza Smoothies & Wraps serves up health-conscious smoothies and wraps.",
      },
      {
        name: "The Pub at SFSU",
        imageUrl: vendorImage19,
        short_description: "Campus pub and grill.",
        detailed_description:
          "The Pub at SFSU offers a friendly campus atmosphere.",
      },
    ].map((vendor) => ({ ...vendor, average_rating: 0, num_reviews: 0 }))
  );

  const [vendors, setVendors] = useState(initialVendorsRef.current);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch("/vendor-average-ratings");
        const data = await response.json();
        if (response.ok) {
          const fetchedRatings = data.reduce((acc, item) => {
            acc[item.vendor_name] = {
              average_rating: Number(item.average_rating),
              num_reviews: item.num_reviews,
            };
            return acc;
          }, {});
          const updatedVendors = initialVendorsRef.current.map((vendor) => ({
            ...vendor,
            average_rating: fetchedRatings[vendor.name]?.average_rating || 0,
            num_reviews: fetchedRatings[vendor.name]?.num_reviews || 0,
          }));
          setVendors(updatedVendors);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }

    fetchVendors();
  }, []);

  const handleImageClick = (name) => {
    const formattedName = encodeURIComponent(name.replace(/\s+/g, "-"));
    const vendorData = vendors.find((v) => v.name === name);
    if (vendorData) {
      navigate(`/explore/foodvendor/${formattedName}`, {
        state: { vendor: vendorData },
      });
    }
  };

  const handleBack = () => {
    navigate("/explore");
  };

  return (
    <div className="content-wrapper">
      <div className="search-wrapper">
        <div className="button-and-name">
          <h1>FOOD VENDORS</h1>
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
          Explore the diverse dining options available at San Francisco State
          University. Discover a world of flavors right here at SFSU with our
          selection of food vendors. From quick bites to fine dining, see what
          SFSU has to offer in terms of food and beverages. Browse through our
          comprehensive list of vendors.
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
            DATE & TIME
          </p>
          <select
            style={{
              marginTop: "10px",
              width: "300px",
              height: "30px",
              borderRadius: "50px",
            }}
          >
            <option value="">OPEN HOURS</option>
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
        {vendors.map((vendor, index) => (
          <div
            className="grid-item"
            key={index}
            onClick={() => handleImageClick(vendor.name)}
          >
            <img
              src={vendor.imageUrl}
              alt={`Vendor ${vendor.name}`}
              style={{ width: "220px", height: "137px" }}
            />
            <div>
              <p
                style={{
                  color: "#AD45FF",
                  fontSize: "20px",
                  marginTop: "12px",
                  fontWeight: "bold",
                }}
              >
                {vendor.name}
              </p>
              <p style={{ color: "gray", fontSize: "14px", margin: "0" }}>
                {vendor.short_description}
              </p>
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
                <FaCommentDots style={{ marginLeft: "5px" }} />{" "}
                {vendor.num_reviews} reviews
              </p>

              <p style={{ color: "gray", fontSize: "14px", marginTop: "7px" }}>
                {vendor.detailed_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodVendor;

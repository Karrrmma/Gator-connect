import React, { useState, useEffect, useRef } from "react";
import "../ExploreTemplate.css";
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
  const [searchTerm, setSearchTerm] = useState("");
  const initialVendorsRef = useRef(
    [
      {
        name: "Cafe 101",
        imageUrl: vendorImage1,
        short_description: "Classic coffee and snacks",
        detailed_description:
          "Cafe 101 offers a variety of coffee blends, artisan teas, and small bites.",
      },
      {
        name: "Cafe Rosso",
        imageUrl: vendorImage2,
        short_description: "Italian café classics",
        detailed_description:
          "Cafe Rosso serves traditional Italian coffees, homemade pastries, and paninis.",
      },
      {
        name: "City Cafe",
        imageUrl: vendorImage3,
        short_description: "Urban eatery hub",
        detailed_description:
          "City Cafe offers a bustling urban atmosphere with a menu.",
      },
      {
        name: "Clean Bites",
        imageUrl: vendorImage4,
        short_description: "Healthy meals to-go",
        detailed_description:
          "Clean Bites focuses on nutritious, whole-food meals.",
      },
      {
        name: "Farm Fresh Underground",
        imageUrl: vendorImage5,
        short_description: "Farm-to-table experience",
        detailed_description:
          "Discover the taste of freshness at Farm Fresh Underground.",
      },
      {
        name: "Gold Coast Grill & Catering",
        imageUrl: vendorImage6,
        short_description: "Grill and barbecue",
        detailed_description:
          "Gold Coast Grill offers an exquisite barbecue and grill menu.",
      },
      {
        name: "Good to Go",
        imageUrl: vendorImage7,
        short_description: "Quick, tasty bites",
        detailed_description:
          "Good to Go is your best bet for fast, delicious meals.",
      },
      {
        name: "HSS 121 Cafe",
        imageUrl: vendorImage8,
        short_description: "Casual campus café",
        detailed_description:
          "HSS 121 Cafe is a favorite spot for students and faculty.",
      },
      {
        name: "Village Market & Pizza",
        imageUrl: vendorImage9,
        short_description: "Gourmet pizzas and more",
        detailed_description: "Fresh ingredients at Village Market & Pizza.",
      },
      {
        name: "Natural Sensations",
        imageUrl: vendorImage10,
        short_description: "Organic and natural",
        detailed_description:
          "Natural Sensations offers a menu full of organic options.",
      },
      {
        name: "Nizario's Pizza",
        imageUrl: vendorImage11,
        short_description: "Classic pizzeria",
        detailed_description: "Nizario's Pizza serves classic pizza favorites.",
      },
      {
        name: "Peet's Coffee & Tea",
        imageUrl: vendorImage12,
        short_description: "Rich coffees and teas",
        detailed_description:
          "Peet's Coffee & Tea provides a superior coffee experience.",
      },
      {
        name: "Quickly",
        imageUrl: vendorImage13,
        short_description: "Snappy Asian fusion",
        detailed_description:
          "Quickly is the go-to spot for Asian fusion treats.",
      },
      {
        name: "Halal Shop",
        imageUrl: vendorImage14,
        short_description: "Authentic Halal cuisine",
        detailed_description:
          "The Halal Shop offers a variety of authentic Halal dishes.",
      },
      {
        name: "Station Cafe",
        imageUrl: vendorImage15,
        short_description: "Coffee and pastries",
        detailed_description:
          "Station Cafe is your neighborhood stop for freshly brewed coffee.",
      },
      {
        name: "Subway",
        imageUrl: vendorImage16,
        short_description: "Fresh sandwiches made-to-order",
        detailed_description: "Subway offers a variety of subs and salads.",
      },
      {
        name: "Taqueria Girasol",
        imageUrl: vendorImage17,
        short_description: "Sunny Mexican flavors",
        detailed_description:
          "Taqueria Girasol brings you vibrant Mexican cuisine.",
      },
      {
        name: "Taza Smoothies & Wraps",
        imageUrl: vendorImage18,
        short_description: "Smoothies and wraps",
        detailed_description:
          "Taza Smoothies & Wraps serves up health-conscious smoothies and wraps.",
      },
      {
        name: "The Pub at SFSU",
        imageUrl: vendorImage19,
        short_description: "Campus pub and grill",
        detailed_description:
          "The Pub at SFSU offers a friendly campus atmosphere.",
      },
    ].map((vendor) => ({ ...vendor, average_rating: 0, num_reviews: 0 }))
  );

  const [vendors, setVendors] = useState(initialVendorsRef.current);
  // Search filter
  const [fullVendors, setFullVendors] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [commentFilter, setCommentFilter] = useState("");
  const [sortDirectionRatings, setSortDirectionRatings] = useState("");
  const [sortDirectionComments, setSortDirectionComments] = useState("");
  const [priorityRatings, setPriorityRatings] = useState(false);
  const [priorityComments, setPriorityComments] = useState(false);

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
          setFullVendors(updatedVendors);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }

    fetchVendors();
  }, []);

  // Filter by minimum rating
  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  // Filter by minimum comment
  const handleCommentFilterChange = (event) => {
    setCommentFilter(event.target.value);
  };

  // Filter by vendor name
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter by sort rating
  const handleSortDirectionRatingsChange = (event) => {
    setSortDirectionRatings(event.target.value);
  };

  // Filter by sort comment
  const handleSortDirectionCommentsChange = (event) => {
    setSortDirectionComments(event.target.value);
  };

  const handlePriorityRatingsChange = () => {
    if (!priorityRatings) {
      setPriorityRatings(true);
      setPriorityComments(false);
    } else {
      setPriorityRatings(false);
    }
  };

  const handlePriorityCommentsChange = () => {
    if (!priorityComments) {
      setPriorityComments(true);
      setPriorityRatings(false);
    } else {
      setPriorityComments(false);
    }
  };

  const handleSearchSubmit = () => {
    let filteredVendors = fullVendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (ratingFilter) {
      filteredVendors = filteredVendors.filter(
        (vendor) => vendor.average_rating >= parseFloat(ratingFilter)
      );
    }

    if (commentFilter) {
      filteredVendors = filteredVendors.filter(
        (vendor) => vendor.num_reviews >= parseInt(commentFilter, 10)
      );
    }
    // Need to fix to handle dynamic filtering properly
    // **************************************************
    if (priorityRatings && priorityComments) {
      if (sortDirectionRatings && sortDirectionComments) {
        filteredVendors.sort((a, b) => {
          const ratingSort =
            sortDirectionRatings === "asc"
              ? a.average_rating - b.average_rating
              : b.average_rating - a.average_rating;
          const commentSort =
            sortDirectionComments === "asc"
              ? a.num_reviews - b.num_reviews
              : b.num_reviews - a.num_reviews;
          return priorityRatings
            ? ratingSort || commentSort
            : commentSort || ratingSort;
        });
      }
    } else if (sortDirectionRatings && priorityRatings) {
      filteredVendors.sort((a, b) => {
        return sortDirectionRatings === "asc"
          ? a.average_rating - b.average_rating
          : b.average_rating - a.average_rating;
      });
    } else if (sortDirectionComments && priorityComments) {
      filteredVendors.sort((a, b) => {
        return sortDirectionComments === "asc"
          ? a.num_reviews - b.num_reviews
          : b.num_reviews - a.num_reviews;
      });
    } else if (sortDirectionComments) {
      // Only for sort by comment
      filteredVendors.sort((a, b) => {
        return sortDirectionComments === "asc"
          ? a.num_reviews - b.num_reviews
          : b.num_reviews - a.num_reviews;
      });
    } else if (sortDirectionRatings) {
      // Only for sort by rating
      filteredVendors.sort((a, b) => {
        return sortDirectionRatings === "asc"
          ? a.average_rating - b.average_rating
          : b.average_rating - a.average_rating;
      });
    }

    setVendors(filteredVendors);
  };
  // **************************************************

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setRatingFilter("");
    setCommentFilter("");
    setSortDirectionRatings("");
    setSortDirectionComments("");
    setPriorityRatings(false);
    setPriorityComments(false);
    setVendors(fullVendors);
  };

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
          <h2 style={{ color: "white" }}>FOOD VENDORS</h2>
          <button onClick={handleBack} className="go-back-button">
            GO BACK
          </button>
        </div>
        <p
          style={{
            color: "gray",
            fontSize: "14px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          Discover the diverse dining options available at SFSU. From quick
          bites to fine dining, see what our campus has to offer in terms of
          food and beverages. Browse through our comprehensive list of food
          vendors to explore more!
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="🔎 SEARCH FOOD VENDOR..."
            className="search-bar"
            // style={{
            //   marginTop: "30px",
            //   width: "300px",
            //   height: "30px",
            //   borderRadius: "50px",
            //   backgroundColor: "gray",
            //   color: "red",
            // }}
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />

          <p
            style={{ marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}
          >
            RATINGS
          </p>
          <select
            value={ratingFilter}
            onChange={handleRatingFilterChange}
            className="select-options"
          >
            <option value="">Select minimum ratings</option>
            {Array.from({ length: 9 }, (_, i) => (i + 1) * 0.5).map(
              (rating) => (
                <option key={rating} value={rating}>{` ${rating.toFixed(
                  1
                )}`}</option>
              )
            )}
          </select>
          <select
            value={sortDirectionRatings}
            onChange={handleSortDirectionRatingsChange}
            className="select-options"
          >
            <option value="">Sort level of ratings</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <p
            style={{ marginTop: "20px", fontSize: "16px", fontWeight: "bold" }}
          >
            {" "}
            COMMENTS
          </p>
          <select
            value={commentFilter}
            onChange={handleCommentFilterChange}
            className="select-options"
          >
            <option value="">Select min number of comments</option>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>{` ${num}`}</option>
            ))}
          </select>
          <select
            value={sortDirectionComments}
            onChange={handleSortDirectionCommentsChange}
            className="select-options"
          >
            <option value="">Sort number of comments</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <div className="checkbox">
            <input
              type="checkbox"
              checked={priorityRatings}
              onChange={handlePriorityRatingsChange}
            />
            <label> Rating Priority </label>
          </div>

          <div className="checkbox">
            <input
              type="checkbox"
              checked={priorityComments}
              onChange={handlePriorityCommentsChange}
            />
            <label> Comment Priority</label>
          </div>

          <div>
            <button
              className="reset-filters-button"
              onClick={handleResetFilters}
            >
              RESET FILTER
            </button>
            <button className="search-button" onClick={handleSearchSubmit}>
              SEARCH
            </button>
          </div>
        </div>
      </div>

      <div className="grid-wrapper">
        {vendors.length > 0 ? (
          vendors.map((vendor, index) => (
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
                    marginRight: "12px",
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
                  <FaStar style={{ color: "yellow", marginRight: "2px" }} />
                  {vendor.average_rating.toFixed(1)} ratings
                  <FaCommentDots
                    style={{ marginLeft: "7px", marginRight: "2px" }}
                  />{" "}
                  {vendor.num_reviews} reviews
                </p>
                <p
                  style={{ color: "gray", fontSize: "14px", marginTop: "7px" }}
                >
                  {vendor.detailed_description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="grid-item"
            style = {{ justifyContent: 'center', alignItems: 'center'}}
          >
            <div>No vendors found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodVendor;

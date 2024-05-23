import React, { useState, useEffect, useRef } from 'react';
import '../ExploreTemplate.css';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaCommentDots } from 'react-icons/fa';

import { getVendors } from '../../../services/Explore/ExploreService';
import { VendorData } from './VendorData';

function FoodVendor() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const initialVendorsRef = useRef(
    VendorData.map((vendor) => ({
      ...vendor,
      average_rating: 0,
      num_reviews: 0,
    }))
  );

  const [vendors, setVendors] = useState(initialVendorsRef.current);
  // Search filter
  const [fullVendors, setFullVendors] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('');
  const [commentFilter, setCommentFilter] = useState('');
  const [sortDirectionRatings, setSortDirectionRatings] = useState('');
  const [sortDirectionComments, setSortDirectionComments] = useState('');
  const [priorityRatings, setPriorityRatings] = useState(false);
  const [priorityComments, setPriorityComments] = useState(false);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const data = await getVendors();
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
      } catch (error) {
        console.error('Fetch Error:', error);
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
            sortDirectionRatings === 'asc'
              ? a.average_rating - b.average_rating
              : b.average_rating - a.average_rating;
          const commentSort =
            sortDirectionComments === 'asc'
              ? a.num_reviews - b.num_reviews
              : b.num_reviews - a.num_reviews;
          return priorityRatings
            ? ratingSort || commentSort
            : commentSort || ratingSort;
        });
      }
    } else if (sortDirectionRatings && priorityRatings) {
      filteredVendors.sort((a, b) => {
        return sortDirectionRatings === 'asc'
          ? a.average_rating - b.average_rating
          : b.average_rating - a.average_rating;
      });
    } else if (sortDirectionComments && priorityComments) {
      filteredVendors.sort((a, b) => {
        return sortDirectionComments === 'asc'
          ? a.num_reviews - b.num_reviews
          : b.num_reviews - a.num_reviews;
      });
    } else if (sortDirectionComments) {
      // Only for sort by comment
      filteredVendors.sort((a, b) => {
        return sortDirectionComments === 'asc'
          ? a.num_reviews - b.num_reviews
          : b.num_reviews - a.num_reviews;
      });
    } else if (sortDirectionRatings) {
      // Only for sort by rating
      filteredVendors.sort((a, b) => {
        return sortDirectionRatings === 'asc'
          ? a.average_rating - b.average_rating
          : b.average_rating - a.average_rating;
      });
    }

    setVendors(filteredVendors);
  };
  // **************************************************

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRatingFilter('');
    setCommentFilter('');
    setSortDirectionRatings('');
    setSortDirectionComments('');
    setPriorityRatings(false);
    setPriorityComments(false);
    setVendors(fullVendors);
  };

  const handleImageClick = (name) => {
    const formattedName = encodeURIComponent(name.replace(/\s+/g, '-'));
    const vendorData = vendors.find((v) => v.name === name);
    if (vendorData) {
      navigate(`/explore/foodvendor/${formattedName}`, {
        state: { vendor: vendorData },
      });
    }
  };

  const handleBack = () => {
    navigate('/explore');
  };

  return (
    <div className="content-wrapper">
      <div className="search-wrapper">
        <div className="button-and-name">
          <h2 style={{ color: 'white' }}>FOOD VENDORS</h2>
          <button onClick={handleBack} className="go-back-button">
            GO BACK
          </button>
        </div>
        <p
          style={{
            color: 'gray',
            fontSize: '14px',
            marginTop: '10px',
            textAlign: 'left',
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
            placeholder="🔎 ENTER FOOD VENDOR NAME..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />

          <p
            style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}
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
            style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}
          >
            {' '}
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
                style={{ width: '220px', height: '137px' }}
              />
              <div>
                <p
                  style={{
                    color: '#AD45FF',
                    fontSize: '20px',
                    marginTop: '12px',
                    marginRight: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {vendor.name}
                </p>
                <p style={{ color: 'gray', fontSize: '14px', margin: '0' }}>
                  {vendor.short_description}
                </p>
                <p
                  style={{
                    color: 'white',
                    fontSize: '14px',
                    margin: '0',
                    lineHeight: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <FaStar style={{ color: 'yellow', marginRight: '2px' }} />
                  {vendor.average_rating.toFixed(1)} ratings
                  <FaCommentDots
                    style={{ marginLeft: '7px', marginRight: '2px' }}
                  />{' '}
                  {vendor.num_reviews} reviews
                </p>
                <p
                  style={{ color: 'gray', fontSize: '14px', marginTop: '7px' }}
                >
                  {vendor.detailed_description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div
            className="grid-item"
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <div>No vendors found.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodVendor;

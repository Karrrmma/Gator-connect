import React, { useState, useEffect, useRef } from 'react';
import './FoodVendor.css';
import { useNavigate } from 'react-router-dom';

import vendorImage1 from './vendor1.jpg';
import vendorImage2 from './vendor2.jpg';
import vendorImage3 from './vendor3.jpg';
import vendorImage4 from './vendor4.jpg';
import vendorImage5 from './vendor5.jpg';
import vendorImage6 from './vendor6.jpg';
import vendorImage7 from './vendor7.jpg';
import vendorImage8 from './vendor8.jpg';
import vendorImage9 from './vendor9.jpg';
import vendorImage10 from './vendor10.jpg';
import vendorImage11 from './vendor11.jpg';
import vendorImage12 from './vendor12.jpg';
import vendorImage13 from './vendor13.jpg';
import vendorImage14 from './vendor14.jpg';
import vendorImage15 from './vendor15.jpg';
import vendorImage16 from './vendor16.jpg';
import vendorImage17 from './vendor17.jpg';
import vendorImage18 from './vendor18.jpg';
import vendorImage19 from './vendor19.jpg';

function FoodVendor() {
  const navigate = useNavigate();
  const initialVendorsRef = useRef([
    { name: "Cafe 101", imageUrl: vendorImage1 },
    { name: "Cafe Rosso", imageUrl: vendorImage2 },
    { name: "City Cafe", imageUrl: vendorImage3 },
    { name: "Clean Bites", imageUrl: vendorImage4 },
    { name: "Farm Fresh Underground", imageUrl: vendorImage5 },
    { name: "Gold Coast Grill & Catering", imageUrl: vendorImage6 },
    { name: "Good to Go", imageUrl: vendorImage7 },
    { name: "HSS 121 Cafe", imageUrl: vendorImage8 },
    { name: "Village Market & Pizza", imageUrl: vendorImage9 },
    { name: "Natural Sensations", imageUrl: vendorImage10 },
    { name: "Nizario's Pizza", imageUrl: vendorImage11 },
    { name: "Peet's Coffee & Tea", imageUrl: vendorImage12 },
    { name: "Quickly", imageUrl: vendorImage13 },
    { name: "Halal Shop", imageUrl: vendorImage14 },
    { name: "Station Cafe", imageUrl: vendorImage15 },
    { name: "Subway", imageUrl: vendorImage16 },
    { name: "Taqueria Girasol", imageUrl: vendorImage17 },
    { name: "Taza Smoothies & Wraps", imageUrl: vendorImage18 },
    { name: "The Pub at SFSU", imageUrl: vendorImage19 }
  ].map(vendor => ({ ...vendor, average_rating: 0 })));  // default average rate as 0.0

  const [vendors, setVendors] = useState(initialVendorsRef.current);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch('/vendor-average-ratings');
        const data = await response.json();
        if (response.ok) {
          const fetchedRatings = data.reduce((acc, item) => {
            acc[item.vendor_name] = item.average_rating;
            return acc;
          }, {});
          const updatedVendors = initialVendorsRef.current.map(vendor => ({
            ...vendor,
            average_rating: fetchedRatings[vendor.name] || 0
          }));
          setVendors(updatedVendors);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    }

    fetchVendors();
  }, []); 

  const handleImageClick = (name) => {
    const formattedName = encodeURIComponent(name.replace(/\s+/g, '-'));
    navigate(`/explore/foodvendor/${formattedName}`);
  };

  return (
    <div>
      <h1>Food Vendors</h1>
      <div className="grid-container">
        {vendors.map((vendor, index) => (
          <div className="grid-item" key={index} onClick={() => handleImageClick(vendor.name)}>
            <img src={vendor.imageUrl} alt={`Vendor ${vendor.name}`} style={{ width: '250px', height: '250px' }} />
            <div className="vendor-info">
              <h3>{vendor.name}</h3>
              <p>Rating: {vendor.average_rating.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodVendor;


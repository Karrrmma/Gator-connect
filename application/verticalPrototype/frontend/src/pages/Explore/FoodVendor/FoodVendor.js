import React, { useState } from 'react';
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
  const [items] = useState([
    { imageUrl: vendorImage1, name: "Cafe 101", rating: "4.5" },
    { imageUrl: vendorImage2, name: "Cafe Rosso", rating: "4.5" },
    { imageUrl: vendorImage3, name: "City Cafe", rating: "4.5" },
    { imageUrl: vendorImage4, name: "Clean Bites", rating: "4.5" },
    { imageUrl: vendorImage5, name: "Farm Fresh Underground", rating: "4.5" },
    { imageUrl: vendorImage6, name: "Gold Coast Grill & Catering", rating: "4.5" },
    { imageUrl: vendorImage7, name: "Good to Go", rating: "4.5" },
    { imageUrl: vendorImage8, name: "HSS 121 Cafe", rating: "4.5" },
    { imageUrl: vendorImage9, name: "Village Market & Pizza", rating: "4.5" },
    { imageUrl: vendorImage10, name: "Natural Sensations", rating: "4.5" },
    { imageUrl: vendorImage11, name: "Nizario's Pizza", rating: "4.5" },
    { imageUrl: vendorImage12, name: "Peet's Coffee & Tea", rating: "4.5" },
    { imageUrl: vendorImage13, name: "Quickly", rating: "4.5" },
    { imageUrl: vendorImage14, name: "Halal Shop", rating: "4.5" },
    { imageUrl: vendorImage15, name: "Station Cafe", rating: "4.5" },
    { imageUrl: vendorImage16, name: "Subway", rating: "4.5" },
    { imageUrl: vendorImage17, name: "Taqueria Girasol", rating: "4.5" },
    { imageUrl: vendorImage18, name: "Taza Smoothies & Wraps", rating: "4.5" },
    { imageUrl: vendorImage19, name: "The Pub at SFSU", rating: "4.5" }
  ]);
  const navigate = useNavigate();

  const handleImageClick = (name) => {
    const formattedName = encodeURIComponent(name.replace(/\s+/g, '-'));
    navigate(`/explore/foodvendor/${formattedName}`);
  };

  return (
    <div>
      <h1>Food Vendors</h1>
      <div className="grid-container">
        {items.map((item, index) => (
          <div className="grid-item" key={index} onClick={() => handleImageClick(item.name)}>
            <img src={item.imageUrl} alt={`Vendor ${item.name}`} style={{ width: '250px', height: '250px' }} />
            <div className="vendor-info">
              <h3>{item.name}</h3>
              <p>Rating: {item.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodVendor;

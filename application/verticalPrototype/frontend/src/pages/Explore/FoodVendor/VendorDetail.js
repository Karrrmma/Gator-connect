import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FoodVendor.css';  

function VendorDetail() {
    let { name } = useParams();
    name = decodeURIComponent(name.replace(/-/g, ' '));
    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [menuRating, setMenuRating] = useState('');
    const [menuReview, setMenuReview] = useState('');

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
                console.error('Fetch Error:', error);
            }
        }
        fetchData();
    }, [name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            vendor_name: name,
            menu_name: menuName,
            menu_rating: menuRating,
            menu_review: menuReview,
            resource_id: 'Food Vendor'
        };

        try {
            const response = await fetch('/vendordetail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            if (response.ok) {
                setMenuItems([...menuItems, postData]);
                navigate('/explore/foodVendor');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Submit Error:', error);
        }
    };

    const handleBack = () => {
        navigate('/explore/foodVendor');
    };


    return (
        <div className="vendor-detail-container">
            <div className="top-bar">
                <button onClick={handleBack} className="back-button">Back</button>
                <h1>{name}</h1>
            </div>
            <div className="schedule-and-form">
            <div className="schedule">
                
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Menu Name</label>
                            <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} placeholder="Menu Name" required />
                        </div>
                        <div className="input-group">
                            <label>Menu Rating</label>
                            <input type="number" value={menuRating} onChange={(e) => setMenuRating(e.target.value)} placeholder="Menu Rating" step="0.1" min="0" max="5" required />
                        </div>
                        <div className="input-group">
                            <label>Menu Review</label>
                            <textarea value={menuReview} onChange={(e) => setMenuReview(e.target.value)} placeholder="Menu Review" />
                        </div>
                    <button type="submit" className="submit-button">Submit</button>    
                </form>
            </div>
            </div>
            <div className="menu-items-container"> 
                {menuItems.map((item, index) => (
                <div key={index} className="menu-item">
                    <h3>{item.menu_name}</h3>
                    <p>Rating: {item.menu_rating}</p>
                    <p>Review: {item.menu_review}</p>
                </div>
            ))}
        </div>

        </div>
    );
}

export default VendorDetail;



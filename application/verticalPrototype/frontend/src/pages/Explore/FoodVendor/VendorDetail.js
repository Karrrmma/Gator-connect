import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VendorDetail() {
    let { name } = useParams();
    name = decodeURIComponent(name.replace(/-/g, ' '));
    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState([]);
    const [menuName, setMenuName] = useState('');
    const [menuRating, setMenuRating] = useState('');
    const [menuReview, setMenuReview] = useState('');

    // Fetch menu items when component mounts
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

    return (
        <div>
            <h1>{name}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} placeholder="Menu Name" required />
                <input type="number" value={menuRating} onChange={(e) => setMenuRating(e.target.value)} placeholder="Menu Rating" step="0.1" min="0" max="5" required />
                <textarea value={menuReview} onChange={(e) => setMenuReview(e.target.value)} placeholder="Menu Review" />
                <button type="submit">Submit</button>
            </form>
            <div>
                {menuItems.map((item, index) => (
                    <div key={index}>
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


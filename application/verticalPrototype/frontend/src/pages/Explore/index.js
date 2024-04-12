import React, { useState } from 'react';
import { Link} from 'react-router-dom';

function Explore() {

    const [hoverIndex, setHoverIndex] = useState(-1);
    const [searchQuery, setSearchQuery] = useState('');


    const buttonStyle = (isHovered) => ({
        display: 'block',
        width: '100%',
        marginTop: '30px',
        padding: '20px 0',
        fontSize: '18px',
        textAlign: 'center',
        backgroundColor: isHovered ? 'powderblue' : '',
        transition: 'background-color 0.3s',
    });


    const searchStyle = {
        marginTop: '20px', 
        fontSize: '18px',
        display: 'block', 
        width: '100%',
        marginBottom: '30px',
        height:'100%'
    };

    // Search Query ---- ** Do we need separate search bar.js --> might be
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // 1. Food Vendor 2. Transportation 3. Event
    const routes = [
        { path: 'foodvendor', text: 'Food Vendor' },
        { path: 'transportation', text: 'Transportation' },
        { path: 'event', text: 'Event' }
    ];


    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div style={{ width: '599px', margin: 'auto', marginTop: '25px' }}>
                    <h1 style={{ textAlign: 'center', marginTop: '25px' }}> Resources </h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        style={searchStyle}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {routes.map((route, index) => (
                        <Link
                            key={index}
                            to={route.path}
                            style={buttonStyle(index === hoverIndex)}
                            className="btn btn-primary"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(-1)}
                        >
                            {route.text}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Explore;









import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaSchool, FaBus } from 'react-icons/fa';

function Explore() {
  const [searchQuery, setSearchQuery] = useState(false);
  //const[filteredItems, setFilteredItems] =useState([]);

  const [items, setItems] = useState([]);

  const [containerWidth, setContainerWidth] = useState('60%');

  const handleSearchSubmit = (event) => {
    setSearchQuery(true);
  };

  const routes = [
    {
      path: 'foodvendor',
      text: 'FOOD VENDORS',
      description:
        'Discover mouthwatering dishes from our diverse campus food vendors. Engage with user reviews and ratings to make informed choices and contribute feedback!',
      icon: FaUtensils,
    },
    {
      path: 'transportation',
      text: 'TRANSPORTATION',
      description:
        'Explore convenient and available transportation options for commuting to and from SFSU campus enhances the student experience and fosters a seamless journey to academic success.',
      icon: FaBus,
    },
    {
      path: 'event',
      text: 'CAMPUS EVENTS',
      description:
        "Whether you're passionate about art, entertainment, culture, technology, wellness, or sports, there's something for everyone. Embark on a journey of discovery and excitement with campus diverse array of events!",
      icon: FaSchool,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      // Update the container width based on the screen width
      if (window.innerWidth <= 768) {
        setContainerWidth('100%');
      } else {
        setContainerWidth('50%');
      }
    };

    // Call handleResize initially and add event listener for resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 20px',
    width: containerWidth,
  };

  const inputStyle = {
    width: '100%',
    padding: '15px',
    margin: '30px 0',
    fontSize: '1rem',
    borderRadius: '20px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'black',
    color: 'white',
    height: '5%',
  };

  const itemStyle = {
    // display: "flex",
    alignItems: 'left',
    // justifyContent: "space-between",
    display: 'flex',
    flexDirection: 'column',
    // width: "700px",
    // maxWidth: "80%",
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'black',
    color: '#fff',
    textDecoration: 'none',
  };

  const textStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'left',
    marginLeft: '20px', // Space between icon and text
    textAlign: 'left',
  };

  const checkItOutStyle = {
    padding: '10px 20px',
    borderRadius: '50px',
    backgroundColor: '#AD45FF',
    color: 'white',
    textDecoration: 'none',
    fontSize: '12px',
    width: '160px',
    marginTop: '20px',
    backgroundColor: 'gray',
    fontWeight: 'bold',
    fontSize: '15px',
  };

  const searchBarStyle = {
    width: containerWidth,
  };

  return (
    <section style={containerStyle}>
      <h1
        style={{ fontSize: '2.0rem', marginBottom: '0.5rem', color: 'white' }}
      >
        EXPLORE
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'gray' }}>
        Let's discover all the resources and opportunities available to SFSU
        students
      </p>

      {routes.map((route, index) => (
        <div key={route.text} style={itemStyle}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <route.icon
              style={{
                width: '55px',
                color: 'orange',
                marginBottom: 'auto',
                margin: '0',
              }}
            />
            <div style={textStyle}>
              <h2 style={{ margin: '0', fontSize: '20px' }}>{route.text}</h2>
            </div>
            <Link to={`/explore/${route.path}`} className="checkitout-btn">
              CHECK IT OUT
            </Link>
          </div>
          <p
            style={{
              marginTop: '15px',
              fontSize: '14px',
              color: 'gray',
              textAlign: 'left',
            }}
          >
            {route.description}
          </p>
        </div>
      ))}
      <Link to="/home" className="back-btn">
        BACK HOME
      </Link>
    </section>
  );
}

export default Explore;

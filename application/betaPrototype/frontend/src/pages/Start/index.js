import React, { useState, useEffect } from 'react';
// import Gator from '../../assets/images/gator.png'
import { Link } from 'react-router-dom';
import LOGO from '../../assets/images/gator_logo_happy.PNG';
// import LOGO2 from '../../assets/images/gator_logo.PNG';
import THUMBNAIL1 from '../../assets/images/thumbnail1.png';
import THUMBNAIL2 from '../../assets/images/thumbnail2.png';
import THUMBNAIL3 from '../../assets/images/thumbnail3.png';
import THUMBNAIL4 from '../../assets/images/thumbnail4.png';
import THUMBNAIL5 from '../../assets/images/thumbnail5.png';

// thumbnail img for phone size
import THUMBNAIL1SM from '../../assets/images/thumbnail1small.png';
import THUMBNAIL2SM from '../../assets/images/thumbnail2small.png';
import THUMBNAIL3SM from '../../assets/images/thumbnail3small.png';
import THUMBNAIL4SM from '../../assets/images/thumbnail4small.png';
import THUMBNAIL5SM from '../../assets/images/thumbnail5small.png';
import './start.css';
import { AiFillInstagram, AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";

function Start() {
    const previewsDesktop = [THUMBNAIL1, THUMBNAIL2, THUMBNAIL3, THUMBNAIL4, THUMBNAIL5];
    const previewsMobile = [THUMBNAIL1SM, THUMBNAIL2SM, THUMBNAIL3SM, THUMBNAIL4SM, THUMBNAIL5SM];
    const [currentPreview, setCurrentPreview] = useState(previewsDesktop[0]);
    const [highlightedButtonIndex, setHighlightedButtonIndex] = useState(0);
    
    useEffect(() => {
        const updatePreview = () => {
            const previews = window.innerWidth <= 768 ? previewsMobile : previewsDesktop;
            const nextIndex = (previews.indexOf(currentPreview) + 1) % previews.length;
            setCurrentPreview(previews[nextIndex]);
            setHighlightedButtonIndex(nextIndex);
        };

        const interval = setInterval(updatePreview, 8000); // Change image every 8 seconds

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [currentPreview, previewsDesktop, previewsMobile]);

    const handleButtonClick = (index) => {
        const previews = window.innerWidth <= 768 ? previewsMobile : previewsDesktop;
        setCurrentPreview(previews[index]);
        setHighlightedButtonIndex(index);
    };

    const highlightedButtonStyle = {
        backgroundColor: '#AD45FF',
        color: 'white',
    };

    const nonHighlightedButtonStyle = {
        backgroundColor: 'white',
        color: 'black',
    };

    return (
        <div className="start-page">
            <div className="header-section">
                <div className="header">
                    <div className="logo-title-wrapper">
                        <div className='logo-wrapper'>
                            <img src={LOGO} alt="Gator" className="logo" />
                        </div>
                        <div>
                            <h1 style={{ color: 'green' }}>GATOR CONNECT</h1>
                            <p style={{ color: 'green', fontSize: '20px' }}>First social media platform for the SFSU students!</p>
                        </div>
                    </div>
                    <div className="login-button-wrapper">
                        <Link to='/login'>
                            <button className='login-button' type="submit">LOGIN</button>
                        </Link>
                    </div>
                </div>
                <div className="preview-wrapper">
                    <img src={currentPreview} alt="Background" className="preview-image" />
                </div>
            </div>
            <div className="content-section">
                <div className="content d-flex flex-column align-items-center justify-content-center">
                    <div className='button-group'>
                        <button onClick={() => handleButtonClick(0)} style={highlightedButtonIndex === 0 ? highlightedButtonStyle : nonHighlightedButtonStyle}>👪 <span className="hide-on-mobile">Make friends</span></button>
                        <button onClick={() => handleButtonClick(1)} style={highlightedButtonIndex === 1 ? highlightedButtonStyle : nonHighlightedButtonStyle}>🍔 <span className="hide-on-mobile">Find food vendors</span></button>
                        <button onClick={() => handleButtonClick(2)} style={highlightedButtonIndex === 2 ? highlightedButtonStyle : nonHighlightedButtonStyle}>🚌 <span className="hide-on-mobile">Check bus routes</span></button>
                        <button onClick={() => handleButtonClick(3)} style={highlightedButtonIndex === 3 ? highlightedButtonStyle : nonHighlightedButtonStyle}>🎉 <span className="hide-on-mobile">Explore events</span></button>
                        <button onClick={() => handleButtonClick(4)} style={highlightedButtonIndex === 4 ? highlightedButtonStyle : nonHighlightedButtonStyle}>🗨️ <span className="hide-on-mobile"> Chat to everyone</span></button>
                    </div>
                    <div className='footer'>
                        <p>Let's make an account to explore more!</p>
                        <Link to='/register'>
                            <button className='register-button'>
                                REGISTER NOW
                            </button>
                        </Link>
                        <div className='below'>
                            <div className='social-media-links'>
                                <Link to='/about'>
                                    <button className='about-button'>
                                        ABOUT US
                                    </button>
                                </Link>
                                <Link to='https://www.instagram.com'><AiFillInstagram /></Link>
                                <Link to='https://www.twitter.com'><AiFillTwitterSquare /></Link>
                                <Link to='https://www.facebook.com'><AiFillFacebook /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;
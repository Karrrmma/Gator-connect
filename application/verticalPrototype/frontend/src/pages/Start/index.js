import React, { useState, useEffect } from 'react';
// import Gator from '../../assets/images/gator.png'
import { Link } from 'react-router-dom';
import LOGO from '../../assets/images/gator_logo_happy.PNG';
import LOGO2 from '../../assets/images/gator_logo.PNG';
import './start.css';

function Start() {
    // const previews = [preview1, preview2, preview3, preview4, preview5];
    // i have no clue how to implement this properly, with sliding transitions
    // sample images for now!
    const previews = [LOGO, LOGO2, LOGO, LOGO2, LOGO];
    const [currentPreview, setCurrentPreview] = useState(previews[0]);
    const [index, setIndex] = useState(0);

    const handleButtonClick = () => {
        setIndex((index + 1) % previews.length);
        setCurrentPreview(previews[index]);
    };

    return (
        <div className="start-page">
            <div className="header-section">
                <div className="header">
                    <div className="logo-title-wrapper">
                        <div className='logo-wrapper'>
                            <img src={LOGO} alt="Gator" className="logo" />
                        </div>
                        <h1 className='ml-2'>GATOR CONNECT</h1>
                    </div>
                    <div className="login-button-wrapper">
                        <Link to='/login'>
                            <button className='login-button' type="submit">LOGIN</button>
                        </Link>
                    </div>
                </div>
                {/* <div className="preview-wrapper" style={{ backgroundImage: `url(${currentPreview})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transform: transitioning ? 'translateX(-100%)' : 'translateX(0)' }}></div> */}
                {/* <div className="preview-next" style={{ backgroundImage: `url(${nextPreview})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transform: transitioning ? 'translateX(0)' : 'translateX(100%)' }}></div> */}
                <div className="preview" style={{ backgroundImage: `url(${currentPreview})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
            </div>
            <div className="content-section">
                <div className="content d-flex flex-column align-items-center justify-content-center">
                    <div className='button-group' onClick={handleButtonClick}>
                        <button>👪 Make friends</button>
                        <button>🍔 Find food vendors</button>
                        <button>🚌 Check bus routes</button>
                        <button>🎉 Explore events</button>
                        <button>💭 Chat public channels</button>
                    </div>
                    <div className='footer'>
                        <p>Let's make an account to explore more!</p>
                        <Link to='/register'>
                            <button className='register-button'>
                                REGISTER NOW
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;
import React, { useState, useEffect } from 'react';
// import Gator from '../../assets/images/gator.png'
import { Link } from 'react-router-dom';
import LOGO from '../../assets/images/gator_logo_happy.PNG';
// import LOGO2 from '../../assets/images/gator_logo.PNG';
import THUMBNAIL1 from '../../assets/images/thumbnail1.png';
import THUMBNAIL2 from '../../assets/images/thumbnail2.png';
import THUMBNAIL3 from '../../assets/images/thumbnail3.png';
import THUMBNAIL4 from '../../assets/images/thumbnail4.png';
import THUMBNAIL5 from '../../assets/images/thumbnail5.jpg';
import './start.css';

function Start() {
    // const previews = [preview1, preview2, preview3, preview4, preview5];
    // i have no clue how to implement this properly, with sliding transitions
    // sample images for now!
    // const previews = [LOGO, LOGO2, LOGO, LOGO2, LOGO];
    const previews = [THUMBNAIL1, THUMBNAIL2, THUMBNAIL3, THUMBNAIL4, THUMBNAIL5];
    const [currentPreview, setCurrentPreview] = useState(previews[0]);
    // const [index, setIndex] = useState(0);

    // const handleButtonClick = () => {
    //     setIndex((index + 1) % previews.length);
    //     setCurrentPreview(previews[index]);
    // };

    const handleButtonClick = (index) => {
        setCurrentPreview(previews[index]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment index to switch to the next preview
            // setIndex((prevIndex) => (prevIndex + 1) % previews.length);
            setCurrentPreview((prevPreview) => {
                const nextIndex = (previews.indexOf(prevPreview) + 1) % previews.length;
                return previews[nextIndex];
            });
        }, 2000); // Change image every 2 seconds

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [previews]); // Run effect only once on component mount

    // useEffect(() => {
    //     // Update current preview when index changes
    //     setCurrentPreview(previews[index]);
    // }, [index, previews]);

    return (
        <div className="start-page">
            <div className="header-section">
                <div className="header">
                    <div className="logo-title-wrapper">
                        <div className='logo-wrapper'>
                            <img src={LOGO} alt="Gator" className="logo" />
                        </div>
                        <h1 className='ml-2' style={{ color: 'white' }}>GATOR CONNECT</h1>
                    </div>
                    <div className="login-button-wrapper">
                        <Link to='/login'>
                            <button className='login-button' type="submit">LOGIN</button>
                        </Link>
                    </div>
                </div>
                {/* <div className="preview-wrapper" style={{ backgroundImage: `url(${currentPreview})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transform: transitioning ? 'translateX(-100%)' : 'translateX(0)' }}></div> */}
                {/* <div className="preview-next" style={{ backgroundImage: `url(${nextPreview})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', transform: transitioning ? 'translateX(0)' : 'translateX(100%)' }}></div> */}
                <div className="preview" style={{ backgroundImage: `url(${currentPreview})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
            </div>
            <div className="content-section">
                <div className="content d-flex flex-column align-items-center justify-content-center">
                    <div className='button-group' /*onClick={handleButtonClick}*/>
                        <button onClick={() => handleButtonClick(0)}>👪 Make friends</button>
                        <button onClick={() => handleButtonClick(1)}>🍔 Find food vendors</button>
                        <button onClick={() => handleButtonClick(2)}>🚌 Check bus routes</button>
                        <button onClick={() => handleButtonClick(3)}>🎉 Explore events</button>
                        <button onClick={() => handleButtonClick(4)}>🗨️ Chat to everyone</button>
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
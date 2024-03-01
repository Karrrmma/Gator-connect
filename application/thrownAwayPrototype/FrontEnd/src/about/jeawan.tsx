import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../index.css';
import myPhoto from '../assets/images/jeawannf.jpg';

function Jeawan() {
    return (
        <div>
            <h1>Jeawan Jang</h1>
            <img src={myPhoto} alt="Jeawan Photo" className="jeawan-photo"/>
            <div className="back-link">
                <Link to="/">Back to About</Link>
            </div>
        </div>
    );
}

export default Jeawan;
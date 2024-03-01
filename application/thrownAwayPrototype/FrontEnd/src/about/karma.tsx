import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../index.css';
import myPhoto from '../assets/images/karma.jpeg';

function Karma() {
    return (
        <div>
            <h1>Karma Gyalpo</h1>
            <img src={myPhoto} alt="Karma Photo" className="karma-photo"/>
            <div className="back-link">
                <Link to="/">Back to About</Link>
            </div>
        </div>
    );
}

export default Karma;
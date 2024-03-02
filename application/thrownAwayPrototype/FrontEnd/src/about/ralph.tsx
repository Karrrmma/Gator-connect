import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../index.css';
import myPhoto from '../assets/images/ralph.png';

function Ralph() {
    return (
        <div>
            <h1>Ralph Quiambao</h1>
            <img src={myPhoto} alt="Ralph Photo" className="ralph-photo"/>
            <div className="back-link">
                <Link to="/">Back to About</Link>
            </div>
        </div>
    );
}

export default Ralph;
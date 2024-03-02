import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../index.css';
import myPhoto from '../assets/images/cat.jpg';

function Dustin() {
    return (
        <div>
            <h1>Dustin Meza</h1>
            <img src={myPhoto} alt ="Dustin Photo" className="dustin-photo"/>
            <div className="back-link">
                <Link to="/">Back to About</Link>
            </div>
        </div>
    );
}

export default Dustin;

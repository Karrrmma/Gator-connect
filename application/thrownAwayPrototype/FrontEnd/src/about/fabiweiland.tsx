import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../index.css';
import myPhoto from '../assets/images/fabiweiland.jpeg';

function Fabian() {
    return (
        <div>
            <h1>Fabian Weiland</h1>
            <img src={myPhoto} alt="fabian Photo" className="hoanganh-photo"/>
            <div className="back-link">
                <Link to="/">Back to About</Link>
            </div>
        </div>
    );
}

export default Fabian;
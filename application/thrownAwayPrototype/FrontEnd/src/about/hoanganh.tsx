import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import '../index.css';
import myPhoto from '../assets/images/hoanganh.png';

function HoangAnh() {
    return (
        <div>
            <h1>Hoang-Anh Tran</h1>
            <img src={myPhoto} alt="Hoang-Anh Photo" className="hoanganh-photo"/>
            <div className="back-link">
                <Link to="/">Back to About</Link>
            </div>
        </div>
    );
}

export default HoangAnh;

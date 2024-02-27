import React from 'react';

import '../index.css';
import myPhoto from '../assets/images/jeawannf.jpg';

function Jeawan() {
    return (
        <div>
            <h1>Jeawan Jang</h1>
            <img src={myPhoto} alt="Jeawan Photo" className="jeawan-photo"/>
        </div>
    );
}

export default Jeawan;
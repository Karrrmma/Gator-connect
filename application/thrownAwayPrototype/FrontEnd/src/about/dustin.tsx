import React from 'react';

import '../index.css';
import myPhoto from '../assets/images/cat.jpg';

function Dustin() {
    return (
        <div>
            <h1>Dustin Meza</h1>
            <img src={myPhoto} alt ="Dustin Photo" className="dustin-photo"/>
        </div>
    );
}

export default Dustin;

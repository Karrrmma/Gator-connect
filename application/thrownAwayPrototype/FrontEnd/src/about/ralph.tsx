import React from 'react';

import '../index.css';
import myPhoto from '../assets/images/ralph.png';

function Ralph() {
    return (
        <div>
            <h1>Ralph Quiambao</h1>
            <img src={myPhoto} alt="Ralph Photo" className="ralph-photo"/>
        </div>
    );
}

export default Ralph;
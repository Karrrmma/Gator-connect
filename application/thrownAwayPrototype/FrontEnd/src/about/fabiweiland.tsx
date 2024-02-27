import React from 'react';

import '../index.css';
import myPhoto from '../assets/images/fabiweiland.jpeg';

function Fabian() {
    return (
        <div>
            <h1>Fabian Weiland</h1>
            <img src={myPhoto} alt="fabian Photo" className="hoanganh-photo"/>
        </div>
    );
}

export default Fabian;
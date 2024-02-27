import React from 'react';

import '../index.css';
import myPhoto from '../assets/images/hoanganh.png';

function HoangAnh() {
    return (
        <div>
            <h1>Hoang-Anh Tran</h1>
            <img src={myPhoto} alt="Hoang-Anh Photo" className="hoanganh-photo"/>
        </div>
    );
}

export default HoangAnh;

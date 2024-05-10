import React from 'react';
import AboutPicture from '../../../assets/images/About.jpg';
import { Link } from 'react-router-dom';
import './about.css';

function About() {
    return (
        <div className='form-container'>
            <div className='form-wrapper about-wrapper mt-5'>
                <Link to='/'>
                    <div className='back-text'><u>back home</u></div>
                </Link>
                <h1 className='mb-3'>About Us</h1>
                <img src={AboutPicture} style ={{width: '755px', height: '566px'}}></img> {/* This is formatted for a group picture right now, change later as needed */}
                <p>From left to right:</p>
                <div className='names-wrapper mb-3'>
                    <p>Backend Lead: Karma Gyalpo</p>
                    <p>Team Lead: Hoang-Anh Tran</p>
                    <p>Docs-editor: Jeawan Jang</p>
                    <p>Frontend Lead: Ralph Quiambao</p>
                    <p>Database-admin: Dustin Meza</p>
                    <p>Github-master: Fabian Weiland</p>
                </div>
                <div className='description mb-5'>
                    <p>Hello! We are Team 3 also known as Thream. We were put together 
                       in CSC 648-05 to work in a Software Engineering environment.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
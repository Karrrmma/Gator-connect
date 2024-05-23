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
                <h1 className='mb-3'>ABOUT US</h1>
                <div className='description'>
                    <p>Hello! We are Team 3 also known as Thream. <br></br> We were put together 
                       in CSC 648-05 to work in a Software Engineering environment.</p>
                </div>
                <img src={AboutPicture}  className='team-img'></img> {/* This is formatted for a group picture right now, change later as needed */}
                <p className='mt-2'>FROM LEFT TO RIGHT</p>
                <div className='names-wrapper mb-3'>
                    <p>Backend Lead: Karma Gyalpo</p>
                    <p>Database Admin: Jeawan Jang</p>
                    <p>Team Lead: Hoang-Anh Tran</p>
                    <p>Frontend Lead: Ralph Quiambao</p>
                    <p>Docs Editor: Dustin Meza</p>
                    <p>Github Master: Fabian Weiland</p>
                </div>
            </div>
        </div>
    );
}

export default About;
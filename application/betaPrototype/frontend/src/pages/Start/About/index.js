import React from 'react';
import Gator from '../../../assets/images/About.jpg';
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
                <img src={Gator} style ={{width: '500px', height: '400px'}}></img> {/* This is formatted for a group picture right now, change later as needed */}
                <div className='names-wrapper'>
                    <p>Name 1: Hoang-Anh Tran</p>
                    <p>Name 2: Karma Gyalpo</p>
                    <p>Name 3: Fabian Weiland</p>
                    <p>Name 4: Dustin Meza</p>
                    <p>Name 5: Jeawan Jang</p>
                    <p>Name 6: Ralph Quiambao</p>
                </div>
            </div>
        </div>
    );
}

export default About;
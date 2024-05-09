import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
import { MAJORS } from '../constants/majors';
import { YEARS } from '../constants/years';
import NewPostPopup from '../pages/Profile/NewPostPopup';

const SearchBar = ({ onSearch }) => {
    // const [searchTerm, setSearchTerm] = useState('');

    const [username, setUsername] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    // const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (username || major || year) {
            setSubmitted(true);
        }
        onSearch({ username, major, year });
    }

    return (
        <div className='search-body'>
            <div className="search-header">Search any SFSU users to connect and make more friends!</div>

            <form className='search-home-container' onSubmit={handleSearchSubmit} id="search-bar" >

                {/* <p className="search-content">Search BY</p> */}

                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="Search by username..." />
                <select className="form-control" value={major} onChange={e => setMajor(e.target.value)}>
                    <option value="">Select major</option>
                    {MAJORS.map((major, index) => <option key={major} value={major}>{major}</option>)}
                </select>
                <select className='form-control'value={year} onChange={e => setYear(e.target.value)}>
                    <option value="">Select school year</option>
                    {YEARS.map((year, index) => <option key={year} value={year}>{year}</option>)}
                </select>
                <button type="submit" id="search-bar-button"><FaSearch /></button>
            </form>

            <div className="welcome-container">
                <div className="welcome-circle"></div>
                <p className="welcome-text">WELCOME TO GATOR CONNECT</p>
                <p className='welcome'>Best social media platform <br/> for SFSU students!</p>
            </div>
            <p className='guide'>
                {submitted ? '\u00A0' : 'SCROLL DOWN TO EXPLORE MORE POSTS FROM EVERYONE'}
            </p>
            
        </div>

    );
}

export default SearchBar;
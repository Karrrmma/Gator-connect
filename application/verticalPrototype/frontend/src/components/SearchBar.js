import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';
import { MAJORS } from '../constants/majors';

const SearchBar = ({ onSearch }) => {
    // const [searchTerm, setSearchTerm] = useState('');

    const [username, setUsername] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    // const [content, setContent] = useState('');

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        onSearch({ username, major, year });
    }

    return (
        <div className='search-body'>
            <div className="search-header">Search any SFSU users to connect and make more friends!</div>

            <form className='search-home-container' onSubmit={handleSearchSubmit} id="search-bar" >

                {/* <p className="search-content">Search BY</p> */}

                <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="Search by username..." />
                <select className="form-control" value={major} onChange={e => setMajor(e.target.value)}>
                    <option >Select major</option>
                    {MAJORS.map(major => <option value={major}>{major}</option>)}
                </select>
                <input type="text" className="form-control" value={year} onChange={e => setYear(e.target.value)} placeholder="Select school year..." />
                {/* <input type="text" className="form-control" id="search-bar-input" value={content} onChange={e => setContent(e.target.value)} placeholder="content..." /> */}
                {/* <input type="text" class="form-control" id="search-bar-input" value={searchTerm} onChange={handleSearchChange} placeholder="Search for posts..." /> */}
                <button type="submit" id="search-bar-button"><FaSearch /></button>
            </form>

            {/* <p className='welcome'>WELCOME TO GATOR CONNECT</p> */}
            <div className="welcome-container">
                <div className="welcome-circle"></div>
                <p className="welcome-text">WELCOME TO GATOR CONNECT</p>
                <p className='welcome'>Best social media platform <br/> for SFSU students!</p>
            </div>

            <p className='guide'> SCROLL DOWN TO EXPLORE MORE POSTS FROM EVERYONE</p>
        </div>

    );
}

export default SearchBar;
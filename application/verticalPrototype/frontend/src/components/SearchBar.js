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
        <div>
            <div className="search-header">Search to explore, connect, and make more friends!</div>

            <form onSubmit={handleSearchSubmit} id="search-bar" >
                
                <p className="search-content">Search BY</p>
                
                <input type="text" className="form-control"  value={username} onChange={e => setUsername(e.target.value)} placeholder="username..." />
                <select className="form-control" value={major} onChange={e => setMajor(e.target.value)}>
                    <option >Any major</option>
                    {MAJORS.map(major => <option value={major}>{major}</option>)}
                </select>
                <input type="text" className="form-control" value={year} onChange={e => setYear(e.target.value)} placeholder="school year..." />
                {/* <input type="text" className="form-control" id="search-bar-input" value={content} onChange={e => setContent(e.target.value)} placeholder="content..." /> */}
                {/* <input type="text" class="form-control" id="search-bar-input" value={searchTerm} onChange={handleSearchChange} placeholder="Search for posts..." /> */}
                <button type="submit" id="search-bar-button"><FaSearch /></button>
            </form>
        
                <p className='welcome'>WELCOME TO GATOR CONNECT</p>

                <p className='welcome'>- Social Media Platform for SFSU students -</p>
                <p className='guide'> SCROLL DOWN TO EXPLORE MORE POSTS FROM EVERYONE</p>
        </div>
        
    );
}

export default SearchBar;
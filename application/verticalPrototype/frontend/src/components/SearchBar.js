import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './SearchBar.css';

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
        <form class="w-50" onSubmit={handleSearchSubmit} id="search-bar" >
            <p className="search-content">Search users by</p>
            <input type="text" className="form-control" id="search-bar-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="username..." />
            <input type="text" className="form-control" id="search-bar-input" value={major} onChange={e => setMajor(e.target.value)} placeholder="major..." />
            <input type="text" className="form-control" id="search-bar-input" value={year} onChange={e => setYear(e.target.value)} placeholder="school year..." />
            {/* <input type="text" className="form-control" id="search-bar-input" value={content} onChange={e => setContent(e.target.value)} placeholder="content..." /> */}
            {/* <input type="text" class="form-control" id="search-bar-input" value={searchTerm} onChange={handleSearchChange} placeholder="Search for posts..." /> */}
            <button type="submit" id="search-bar-button"><FaSearch /></button>
        </form>
    );
}

export default SearchBar;
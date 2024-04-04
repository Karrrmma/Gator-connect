import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    // const [searchTerm, setSearchTerm] = useState('');

    const [username, setUsername] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [content, setContent] = useState('');

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        onSearch({ username, major, year, content });
        // try {
        //     // need to implement backend for this before testing
        //     const res = await fetch(`search?query=${searchTerm}`); 
        //     if (!res.ok) {
        //         throw new Error('fail');
        //     }
        //     const data = await res.json();
        //     console.log(data);
        // } catch (error) {
        //     console.error('Error searching for posts', error);
        // }
    }

    return (
        <form class="w-50" onSubmit={handleSearchSubmit} id="search-bar">
            <input type="text" className="form-control" id="search-bar-input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Search by username..." />
            <input type="text" className="form-control" id="search-bar-input" value={major} onChange={e => setMajor(e.target.value)} placeholder="Search by major..." />
            <input type="text" className="form-control" id="search-bar-input" value={year} onChange={e => setYear(e.target.value)} placeholder="Search by year..." />
            <input type="text" className="form-control" id="search-bar-input" value={content} onChange={e => setContent(e.target.value)} placeholder="Search by content..." />
            <button type="submit" id="search-bar-button">Search</button>
            {/* <input type="text" class="form-control" id="search-bar-input" value={searchTerm} onChange={handleSearchChange} placeholder="Search for posts..." /> */}
        </form>
    );
}

export default SearchBar;
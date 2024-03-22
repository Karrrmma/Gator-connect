import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            // need to implement backend for this before testing
            const res = await fetch(`search?query=${searchTerm}`); 
            if (!res.ok) {
                throw new Error('fail');
            }
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error('Error searching for posts', error);
        }
    }

    return (
        <form onSubmit={handleSearchSubmit} id="search-bar">
            <input type="text" class="form-control" id="search-bar-input" value={searchTerm} onChange={handleSearchChange} placeholder="Search for posts..." />
        </form>
    );
}

export default SearchBar;
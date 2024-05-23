/**
 * SearchBar.js
 * - The search bar component that is displayed on the home page.
 * - This is responsible for handling the search query and parsing it
 *   to search for users based on their username, major, and/or school year.
 */
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';
import { MAJORS } from '../constants/MAJORS';

const SearchBar = ({ onSearch }) => {
  const [submitted] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const { username, major, year } = parseSearchQuery(searchQuery);
    onSearch({ username, major, year });
  };

  const parseSearchQuery = (query) => {
    const keywords = query.trim().toLowerCase().split(' ');
    console.log('Keywords:', keywords);

    let username = '';
    let major = '';
    let year = '';

    for (let i = 0; i < keywords.length; i++) {
      const formattedKeyword = keywords[i].trim();
      console.log('Formatted Keyword:', formattedKeyword);

      const matchedMajor = MAJORS.find((m) =>
        m.toLowerCase().includes(formattedKeyword)
      );
      if (matchedMajor) {
        major = matchedMajor;
        console.log('Major:', major);
      } else if (!isNaN(formattedKeyword) && formattedKeyword.length === 4) {
        year = formattedKeyword;
        console.log('Year:', year);
      } else {
        // If not major or year, consider it part of the username
        username += formattedKeyword + ' ';
      }
    }
    console.log('Parsed Query:', { username: username.trim(), major, year });
    return { username: username.trim(), major, year };
  };

  return (
    <div className="search-body">
      <div className="search-header">
        Search any SFSU users to connect and make more friends!
      </div>

      <form
        className="search-home-container"
        onSubmit={handleSearchSubmit}
        id="search-bar"
      >
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by username, major, school year..."
        />
        <button type="submit" id="search-bar-button">
          <FaSearch />
        </button>
      </form>

      <div className="welcome-container">
        <div className="welcome-circle"></div>
        <p className="welcome-text">WELCOME TO GATOR CONNECT</p>
        <p className="welcome">
          Best social media platform <br /> for SFSU students!
        </p>
      </div>
      <p className="guide">
        {submitted
          ? '\u00A0'
          : 'SCROLL DOWN TO EXPLORE MORE POSTS FROM EVERYONE'}
      </p>
    </div>
  );
};

export default SearchBar;

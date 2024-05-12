// NOT USING ...

// import React, { useState } from 'react';
// import { FaSearch } from "react-icons/fa";
// import './NonSearchBar.css'
// import { MAJORS } from '../constants/majors';
// import { YEARS } from '../constants/years';
// import NewPostPopup from '../pages/Profile/NewPostPopup';

// const SearchBar = ({ onSearch }) => {
//     // const [searchTerm, setSearchTerm] = useState('');

//     const [search, setSearch] = useState('');

//     const [submitted, setSubmitted] = useState(false);

//     const handleSearchSubmit = async (event) => {
//         event.preventDefault();
//         if(search){
//             setSubmitted(true);
//             onSearch(search.trim());
//         }
       
//     }

//     return (
//         <div className='search-body'>
//             <div className="search-header"></div>

//             <form className='search-home-container' onSubmit={handleSearchSubmit} id="search-bar">
//                 <input
//                     type="text"
//                     className="form-control"
//                     value={search}
//                     onChange={e => setSearch(e.target.value)}
//                     placeholder="Search by username, major, year..."
//                 />
//                 <button type="submit" id="search-bar-button">
//                     <FaSearch />
//                 </button>
//             </form>

//             {submitted && !search && (
//                 <p className="search-tip">Please enter a search term to find users or resources.</p>
//             )}
//         </div>

//     );
// }

// export default SearchBar;
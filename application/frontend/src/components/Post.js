import React, { useEffect, useState } from 'react';
import { FaCommentDots, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import TestPFP from '../assets/images/placeholder_pfp.png';
import Logo from '../assets/images/gator.png';
import SearchBar from './SearchBar';
// import {Link} from 'react-router-dom';
// import App from './../App';

function PostCard({ item }) {
    return (
        <div class="card" style={{ marginBottom: '20px' }}>
            <div class="card-body">
                <div class="d-flex justify-content-start align-items-center mb-2">
                    <img src={TestPFP} class="rounded-circle" alt="placeholder pfp" style={{ width: 40, height: 40 }}></img>
                    <h5 class="card-title ml-2">{item.username}</h5>
                </div>
                <p class="card-text text-left ml-5" style={{ color: 'black' }}>{item.content}</p>
                <img src={Logo} class="w-50" alt="post-image"></img>
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-success btn-sm mr-2 w-50"><FaRegThumbsUp /> Like</button>
                    <button type="button" class="btn btn-outline-danger btn-sm mr-2 w-50"><FaRegThumbsDown /> Dislike</button>
                    <button type="button" class="btn btn-outline-secondary btn-sm mr-2 w-50"><FaCommentDots /> Comment</button>
                </div>
            </div>
        </div>
    );
}

function Post() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    // calls fetchItems when component mounts
    useEffect(() => {
        fetchItems(searchQuery);
    }, [searchQuery]);



    // fetches test posts from handler.js
    // dynamically updates the page with the test posts
    // TODO: make it so that it updates when a button is pressed
    const fetchItems = async ({ username, major, year, content }) => {
        console.log(username, major, year, content); // debug
        const url = `/testpost?username=${username || ''}&major=${major || ''}&year=${year || ''}&content=${content || ''}`;
        const data = await fetch(url);
        const newItems = await data.json();
        setItems(prevItems => [...prevItems, ...newItems.slice(0, 3)]);
    };

    return (
        <>
            <SearchBar onSearch={setSearchQuery} />
            <section class="w-50">
                {items.map((item, index) => ( // index is a placeholder
                    <PostCard key={index} item={item} />
                ))
                }
            </section>
        </>
    );
}


export default Post;
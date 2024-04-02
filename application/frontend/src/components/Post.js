import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import TestPFP from '../assets/images/placeholder_pfp.png';
import SearchBar from './SearchBar';
// import App from './../App';
import { FaCommentDots, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';

function Post() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    // calls fetchItems when component mounts
    useEffect(()=> {
        fetchItems(searchQuery);
    }, [searchQuery]);
    

    
    // fetches test posts from handler.js
    // dynamically updates the page with the test posts
    // TODO: make it so that it updates when a button is pressed
    const fetchItems = async ({ username, major, year, content }) => { 
        console.log(username, major, year, content); // debug
        const url = `/testpost?username=${username || ''}&major=${major || ''}&year=${year || ''}&content=${content || ''}`;
        const data = await fetch(url);
        const items = await data.json();
        setItems(items);
    };

    return(
        <>
        <SearchBar onSearch={setSearchQuery}/>
            <section class="w-50">
                {items.map((item, index) => ( // index is a placeholder
                    <div class="card" key={index}>
                        <div class="card-body">
                            <div class="d-flex justify-content-start align-items-center mb-2">
                                <img src={TestPFP} class="rounded-circle" alt="placeholder pfp" style={{width: 40, height: 40}}></img>
                                <h5 class="card-title ml-2">{item.username}</h5>
                            </div>
                            <p id="post-content" class="card-text text-left ml-5">{item.content}</p>
                            <div class="d-flex justify-content-end">
                                
                                <button type="button" class="btn btn-outline-secondary btn-sm mr-2"><FaCommentDots /> Comment</button>
                                <button type="button" class="btn btn-outline-success btn-sm mr-2"><FaRegThumbsUp /> Like</button>
                                <button type="button" class="btn btn-outline-danger btn-sm"><FaRegThumbsDown /> Dislike</button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </section>
        </>
    );
}

export default Post;
import React, { useEffect, useState } from 'react';
import { FaCommentDots, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import TestPFP from '../assets/images/placeholder_pfp.png';
import Logo from '../assets/images/gator.png';
import Gru from '../assets/images/gru.jpg';
import Vector from '../assets/images/vector.jpg';
import SearchBar from './SearchBar';
// import {Link} from 'react-router-dom';
// import App from './../App';

function PostCard({ item, avatar }) {
    return (
        <div class="card" style={{ marginBottom: '30px' }}>
            <div class="card-body">
                <div class="d-flex justify-content-start align-items-center mb-2">
                    <img src={avatar} class="rounded-circle" alt="placeholder pfp" style={{ width: 40, height: 40 }}></img>
                    <h5 class="card-title ml-2">{item.username}</h5>
                </div>

                <p class="card-text text-left" style={{ color: 'black', fontSize: '20px'}}>{item.content}</p>
                {item.imageUrl && <img src={item.imageUrl} class=" mb-3 mt-2" alt="placeholder"></img>}

                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-success btn-sm mr-2 w-50"><FaRegThumbsUp /><span className="d-lg-inline-block d-none"> Like</span></button>
                    <button type="button" class="btn btn-outline-danger btn-sm mr-2 w-50"><FaRegThumbsDown /><span className="d-lg-inline-block d-none">  Dislike</span></button>
                    <button type="button" class="btn btn-outline-secondary btn-sm mr-2 w-50"><FaCommentDots /><span className="d-lg-inline-block d-none">  Comment</span></button>
                </div>
            </div>
        </div>
    );
}

function UserCard({ username, major }) {
    return (
        <div class="card" style={{ marginBottom: '30px' }}>
            <div class="card-body">
                <div class="d-flex justify-content-start align-items-center mb-2">
                    <img src={TestPFP} class="rounded-circle" alt="placeholder pfp" style={{ width: 40, height: 40 }}></img>
                    <div class="text-left">
                        <h5 class="card-title ml-2 mb-0">{username}</h5>
                        <div class="text-muted small ml-2 mt-0 major">{major}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Post() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [noUsersFound, setNoUsersFound] = useState(false);

    // calls fetchItems when component mounts
    useEffect(() => {
        fetchItems(searchQuery);
    }, [searchQuery]);



    // fetches test posts from handler.js
    // dynamically updates the page with the test posts from the backend
    const fetchItems = async ({ username, major, year }) => {
        // console.log(username, major, year); // debug
        let url = '/search';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, major, year }),
        };
    
        if (!username && !major && !year) {
            url = '/testpost';
            options = {};
            // console.log("fetching test post INSTEAD");
        }
        
        const response = await fetch(url, options);
        const newItems = await response.json();
        
        if (!newItems.results || newItems.results.length === 0) {
            setNoUsersFound(true);
        } else {
            setNoUsersFound(false);
        }
        
        if (url === '/search') {
            setItems(newItems.results);
        } else {
            setItems(newItems.slice(0,3));
        }
    };

    return (
        <>            
            <SearchBar onSearch={setSearchQuery} />
            {Object.values(searchQuery).some(value => value) ? (
                <>
                    {noUsersFound ? <p>No users found.</p> : null}
                    <section class="w-50">
                        {items.map((item, index) => {
                            if (item) {
                                return <UserCard key={index} username={item.username} major={item.major} />;
                            }
                            return null;
                        })}
                    </section>
                </>
            ) : (
                <section class="w-50">
                    {items.map((item, index) => <PostCard key={index} item={item} avatar={Logo} />)}
                    <PostCard item={{ username: 'Felonious Gru', content: 'Hey! Do you know Despicable Me 4 in theaters this July 3rd 2024!', imageUrl: Gru }} avatar={Gru}/>
                    <PostCard item={{ username: 'Jose Ortiz', content: 'I love Gator Connect app :) '}} avatar={TestPFP}/>
                    <PostCard item={{ username: 'Vector Perkins', content: 'Really?!', imageUrl: Vector }} avatar={Vector}/>
                </section>
            )}
        </>
    );
}


export default Post;
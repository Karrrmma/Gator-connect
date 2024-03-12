import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import TestPFP from '../images/placeholder_pfp.png';
// import App from './../App';

function Post() {
    // calls fetchItems when component mounts
    useEffect( ()=> {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]);
    
    // fetches test posts from handler.js
    // dynamically updates the page with the test posts
    const fetchItems = async () => { 
        const data = await fetch('/testpost');
        const items = await data.json();
        setItems(items);
    };

    return(
        <section class="w-50">
            {items.map(item => (
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-start align-items-center mb-2">
                            <img src={TestPFP} class="rounded-circle" alt="placeholder pfp" style={{width: 40, height: 40}}></img>
                            <h5 class="card-title ml-2">{item.username}</h5>
                        </div>
                        <p id="post-content" class="card-text text-left ml-5">{item.content}</p>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-outline-secondary btn-sm mr-2">Comment</button>
                            <button type="button" class="btn btn-outline-success btn-sm mr-2">Like</button>
                            <button type="button" class="btn btn-outline-danger btn-sm">Dislike</button>
                        </div>
                    </div>
                </div>
            ))
            }
        </section>
    );
}

export default Post;
import React from 'react';
import { useForm } from '../../hooks/useForm';

function NewPost() {
    const [post, handleChange] = useForm({
        title: '',
        content: '',
        username: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // debug
        console.log("New Post:", post); 

        // UNCOMMENT THIS WHEN YOU WANNA MAKE A POST REQUEST
        // const response = await fetch('/newpost', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(post),
        // });

        // debug
        // const data = await response.json();
        // console.log(data);
    };


    return (
        <div class=" justify-content-start align-items-center mb-2">
            <h1>New Post</h1>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <input type="text" name="username" placeholder="Username" className="mr-3" />
                <input type="text" name="title" placeholder="Title" className="mr-3" />
                <input type="text" name="content" placeholder="Content" className="mr-3" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewPost;
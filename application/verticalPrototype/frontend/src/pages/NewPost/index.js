import React from 'react';
import { useForm } from '../../hooks/useForm';

function NewPost() {
    const [post, handleChange] = useForm({
        post_content: '',
        user_id: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // debug
        console.log("New Post:", post); 

        // COMMENT THIS TO TEST
        // TODO: clean up fetch requests and store them in one location
        // change how login works, or change token to username and grab username from storage
        const response = await fetch('/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">New Post</h1>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className="form-group">
                    <input type="text" name="user_id" placeholder="User ID" className="form-control" />
                </div>
                <div className="form-group">
                    <input type="text" name="post_content" placeholder="Content" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default NewPost;
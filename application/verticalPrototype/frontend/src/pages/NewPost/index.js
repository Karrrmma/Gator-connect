import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { getCurrentUserId } from '../../utils/decodeData';

function NewPost() {
    const [confirmation, setConfirmation] = useState('');

    const userId = getCurrentUserId();
    const [post, handleChange] = useForm({
        post_content: '',
        user_id: userId
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // debug
        // console.log("New Post:", post); 

        // DISCONNECTED FROM BACKEND
        // TODO: clean up fetch requests and store them in one location
        // const response = await fetch('/newpost', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(post),
        // });

        // const data = await response.json();
        // console.log(data);
        setConfirmation('New post has been successfully created!');
        // if (response.ok) {
        //     setConfirmation('New post has been successfully created!');
        // } else {
        //     setConfirmation('Failed to create new post.');
        // }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">ADD NEW POST</h1>

            <form onSubmit={handleSubmit} onChange={handleChange}>
                <div className="form-group">
                    <input type="text" name="post_content" placeholder="Content" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {confirmation && <p>{confirmation}</p>}
        </div>
    );
}

export default NewPost;
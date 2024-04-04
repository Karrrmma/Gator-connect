import React from 'react';
import { Link } from 'react-router-dom';

function Notification() {
    return (
        <section>
            <div>
                <h1 className="mt-5">Notification page</h1>
                <p class="mt-5">Sorry! This page will be implemented in a further milestone.</p>
                <Link to="/home">Return to Home</Link>
            </div>
        </section>
    );
}

export default Notification;
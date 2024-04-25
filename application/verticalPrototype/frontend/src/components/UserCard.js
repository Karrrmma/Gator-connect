import { React } from 'react';

function UserCard({ fullname, username, icon }) {
    // return (
    //     <div class="card" style={{ marginBottom: '30px' }}>
    //         <div class="card-body">
    //             <div class="d-flex justify-content-start align-items-center mb-2">
    //                 <div class="text-left">
    //                     <h5 class="card-title ml-2 mb-0">{fullname}</h5>
    //                     <div class="text-muted small ml-2 mt-0 major">{username}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div className="friend-item">
            <div className="friend-container">
                <div className="avatar">{icon}</div>
                <div className='friend-info'>
                    <div className="friend-name text-white">{fullname}</div>
                    <div className="friend-username text-white">{username}</div>
                </div>
            </div>
            <div className="friend-action">
                <button className="unfriend">Unfriend</button>
            </div>
        </div>
    );
}

export default UserCard;
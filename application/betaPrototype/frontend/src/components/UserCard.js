import { React } from 'react';
import { Link } from 'react-router-dom';

function UserCard({
  fullname,
  username,
  icon,
  userId,
  onUnfriend,
  onClosePopup,
}) {
  return (
    <div className="friend-item">
      <div className="friend-container">
        <Link
          to={`/profile/${userId}`}
          className="avatar"
          onClick={onClosePopup}
        >
          {icon}
        </Link>
        <div className="friend-info">
          <Link
            to={`/profile/${userId}`}
            className="fullname"
            style={{ fontSize: '16px' }}
            onClick={onClosePopup}
          >
            {fullname}
          </Link>
          <div className="friend-username text-white">{username}</div>
        </div>
      </div>
      <div className="friend-action">
        <button className="unfriend" onClick={() => onUnfriend(userId)}>
          Unfriend
        </button>
      </div>
    </div>
  );
}

export default UserCard;

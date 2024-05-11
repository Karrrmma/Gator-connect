import apiCall from "../apiCall";

export const getFriendReqs = async (userId) => {
    return apiCall(`/api/friends/requests?userId=${userId}`);
}

export const acceptFriendReq = async (id) => {
    return apiCall(`/api/friends/accept/${id}`, 'POST');
}

export const declineFriendReq = async (id) => {
    return apiCall(`/api/friends/decline/${id}`, 'DELETE');
}

// `/api/friends/requests?userId=${userId}`
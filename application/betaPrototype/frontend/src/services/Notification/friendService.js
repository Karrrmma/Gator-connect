import apiCall from "../apiCall";

export const getFriendReqs = async (userId) => {
    return apiCall(`/api/friends/requests?userId=${userId}`);
}

export const getFriendshipStatus = async (requesterId, receiverId) => {
    return apiCall(`/api/isFriend?requester_id=${requesterId}&receiver_id=${receiverId}`);
}

export const sendFriendReq = async (fields) => {
    return apiCall(`/api/friends/request`, 'POST', fields);
}

export const acceptFriendReq = async (id) => {
    return apiCall(`/api/friends/accept/${id}`, 'POST');
}

export const declineFriendReq = async (id) => {
    return apiCall(`/api/friends/decline/${id}`, 'DELETE');
}

export const unfriendUser = async (fields) => {
    return apiCall(`/api/friends/unfriend`, 'DELETE', fields);
}

export const getFriendList = async (userId) => {
    return apiCall(`/api/friends/requests?userId=${userId}`);
}




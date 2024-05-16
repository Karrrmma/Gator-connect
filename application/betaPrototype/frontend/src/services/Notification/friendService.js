import ApiCall from "../ApiCall";

export const getFriendReqs = async (userId) => {
    return ApiCall(`/api/friends/requests?userId=${userId}`);
}

export const getFriendshipStatus = async (requesterId, receiverId) => {
    return ApiCall(`/api/isFriend?requester_id=${requesterId}&receiver_id=${receiverId}`);
}

export const sendFriendReq = async (fields) => {
    return ApiCall(`/api/friends/request`, 'POST', fields);
}

export const acceptFriendReq = async (id) => {
    return ApiCall(`/api/friends/accept/${id}`, 'POST');
}

export const declineFriendReq = async (id) => {
    return ApiCall(`/api/friends/decline/${id}`, 'DELETE');
}

export const unfriendUser = async (fields) => {
    return ApiCall(`/api/friends/unfriend`, 'DELETE', fields);
}

export const getFriendList = async (userId) => {
    return ApiCall(`/api/friends/list?userId=${userId}`);
}


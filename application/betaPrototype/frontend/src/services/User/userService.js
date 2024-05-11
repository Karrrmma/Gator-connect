import apiCall from "../apiCall";

export const createProfile = async (fields) => {
    return apiCall('/api/profile/create', 'POST', fields, false);
}

export const updateProfile = async (fields) => {
    return apiCall('/api/profile/update', 'POST', fields);
}

export const getUserInfo = async (userId) => {
    return apiCall(`/api/profile/info/${userId}`);
}

export const searchUsers = async (fields) => {
    return apiCall(`/search`, 'POST', fields);
}
import apiCall from "../apiCall";

export const createProfile = async (fields) => {
    return apiCall('/api/profile/create', 'POST', fields, false);
}

// unused rn same w backend that i made
// TODO: change the FE editprofile to work with 
// export const updateProfile = async (fields) => { 
//     return apiCall('/api/profile/update', 'POST', fields);
// }

// can be found in handler.js (should be moved to profile routes)
export const updateProfile = async (fields) => {
    return apiCall('/editprofile', 'POST', fields);
} // change the backend route name for this later

export const getUserInfo = async (userId) => {
    return apiCall(`/api/profile/info/${userId}`);
}

export const searchUsers = async (fields) => {
    return apiCall(`/search`, 'POST', fields);
}
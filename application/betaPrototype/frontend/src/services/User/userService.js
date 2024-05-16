import ApiCall from "../ApiCall";

export const createProfile = async (fields) => {
    return ApiCall('/api/profile/create', 'POST', fields, false);
}

// unused rn same w backend that i made
// TODO: change the FE editprofile to work with 
// export const updateProfile = async (fields) => { 
//     return ApiCall('/api/profile/update', 'POST', fields);
// }

// can be found in handler.js (should be moved to profile routes)
export const updateProfile = async (fields) => {
    return ApiCall('/profile/edit', 'POST', fields);
} // change the backend route name for this later

export const getUserInfo = async (userId) => {
    return ApiCall(`/api/profile/info/${userId}`);
}

export const searchUsers = async (fields) => {
    return ApiCall(`/search`, 'POST', fields);
};
export const queryData = async (userId) => {
    return ApiCall(`/api/user/${userId}`);
};

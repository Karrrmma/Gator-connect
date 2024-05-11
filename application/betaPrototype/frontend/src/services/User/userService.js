import apiCall from "../apiCall";

export const createProfile = async (fields) => {
    return apiCall('/api/createprofile', 'POST', fields, false);
}

export const updateProfile = async (fields) => {
    return apiCall('/api/updateprofile', 'POST', fields, false);
}
import apiCall from "../apiCall";

export const createProfile = async (fields) => {
    return apiCall('/api/createprofile', 'POST', fields);
}
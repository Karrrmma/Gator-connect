import apiCall from "../apiCall";

// /newpost
export const createPost = async (fields) => {
    return apiCall('/newpost', 'POST', fields);
}
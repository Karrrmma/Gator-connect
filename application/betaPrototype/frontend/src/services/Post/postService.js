import apiCall from "../apiCall";

export const createPost = async (fields) => {
    return apiCall('/api/post/new', 'POST', fields);
}

export const getPosts = async () => {
    return apiCall('/api/posts');
}

export const getComments = async (postId) => {
    return apiCall(`/api/comments/${postId}`);
}

export const addComment = async (fields) => {
    return apiCall('/api/comments', 'POST', fields);
}

export const deleteComment = async (commentId, fields) => {
    return apiCall(`/api/comments/${commentId}`, 'DELETE', fields);
}

export const postHandleLike = async (method, fields) => {
    return apiCall('/api/likes', method, fields);
}
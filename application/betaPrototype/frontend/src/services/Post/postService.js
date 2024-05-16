import ApiCall from "../ApiCall";

export const createPost = async (fields) => {
  return ApiCall("/api/post/new", "POST", fields);
};

export const getPosts = async () => {
  return ApiCall("/api/posts");
};

export const getLikedPosts = async (userId) => {
  return ApiCall(`/api/likes/${userId}`);
};

export const getComments = async (postId) => {
  return ApiCall(`/api/comments/${postId}`);
};

export const addComment = async (fields) => {
  return ApiCall("/api/comments", "POST", fields);
};

export const deleteComment = async (commentId, fields) => {
  return ApiCall(`/api/comments/${commentId}`, "DELETE", fields);
};

export const postHandleLike = async (method, fields) => {
  return ApiCall("/api/likes", method, fields);
};

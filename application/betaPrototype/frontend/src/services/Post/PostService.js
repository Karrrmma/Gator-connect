/**
 * PostService.js
 * Calls the following endpoints:
 * - /api/post/new (POST)
 *   - body: {post_content, user_id}
 * 
 * - /api/posts (GET)
 *  - response: [{user_id, full_name, post_content, post_time, 
 *    num_comments, num_likes, imageUrl, post_id}...]
 * 
 * - /api/likes/:userId (GET)
 *   - response: [{post_id, liked}...]
 * 
 * - /api/likes/isLiked/:userId/:postId (GET)
 *   - response: {true/false}
 * 
 * - /api/comments/:postId (GET)
 *   - response: [{comment_id, user_id, full_name, comment_time, comment_content}...]
 * 
 * - /api/comments (POST)
 *   - body: {user_id, post_id, comment_content}
 * 
 * - /api/comments/:commentId (DELETE)
 *   - body: {commentId, {post_id}}
 *  
 * - /api/likes (POST/DELETE)
 *   - body: {user_id, post_id}
 *  
 */
import ApiCall from '../ApiCall';

export const createPost = async (fields) => {
  return ApiCall('/api/post/new', 'POST', fields);
};

export const getPosts = async () => {
  return ApiCall('/api/posts');
};

export const getLikedPosts = async (userId) => {
  return ApiCall(`/api/likes/${userId}`);
};

export const getIsPostLiked = async (userId, postId) => {
  return ApiCall(`/api/likes/isLiked/${userId}/${postId}`);
};

export const getComments = async (postId) => {
  return ApiCall(`/api/comments/${postId}`);
};

export const addComment = async (fields) => {
  return ApiCall('/api/comments', 'POST', fields);
};

export const deleteComment = async (commentId, fields) => {
  return ApiCall(`/api/comments/${commentId}`, 'DELETE', fields);
};

export const postHandleLike = async (method, fields) => {
  return ApiCall('/api/likes', method, fields);
};

/**
 * UserService.js
 * Calls the following endpoints:
 * - /api/profile/create (POST)
 *   - body: {username, avatar, biography}
 * 
 * - /api/profile/edit (POST)
 *   - body: {biography, account_id}
 * 
 * - /api/profile/info/:userId (GET)
 *   - response: {username, avatar, biography}
 * 
 * - /api/search (POST)
 *   - body: {username, major, year}
 *   - response: {results: [{username, avatar, major_or_department, user_id}...]}
 * 
 * - /api/user/:userId (GET)
 *   - response: {biography, department/major, friend_count, fullName, major, post_count
 *     posts, role, sfsu_email, user_id, username, year}
 */
import ApiCall from '../ApiCall';

export const createProfile = async (fields) => {
  return ApiCall('/api/profile/create', 'POST', fields, false);
};

export const updateProfile = async (fields) => {
  return ApiCall('/api/profile/edit', 'POST', fields);
};

export const getUserInfo = async (userId) => {
  return ApiCall(`/api/profile/info/${userId}`);
};

export const searchUsers = async (fields) => {
  return ApiCall(`/api/search`, 'POST', fields);
};
export const queryData = async (userId) => {
  return ApiCall(`/api/user/${userId}`);
};

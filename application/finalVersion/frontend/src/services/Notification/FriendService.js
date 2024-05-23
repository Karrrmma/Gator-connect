/**
 * FriendService.js
 * Calls the following endpoints:
 * - /api/friends/requests?userId={ID} (GET)
 *   - response: [{id, sender_id, avatar, sender}...]
 * 
 * - /api/isFriend?requester_id={ID}&receiver_id={ID} (GET)
 *   - response: {true/false}
 * 
 * - /api/friends/request (POST)
 *   - body: {requester_id, receiver_id}
 * 
 * - /api/friends/accept/{ID} (POST)
 * 
 * - /api/friends/decline/{ID} (DELETE)
 * 
 * - /api/friends/unfriend (DELETE)
 *   - body: {requester_id, receiver_id}
 * 
 * - /api/friends/list?userId={ID} (GET)
 *   - response: [{full_name, username, avatar, user_id}...]
 */
import ApiCall from '../ApiCall';

export const getFriendReqs = async (userId) => {
  return ApiCall(`/api/friends/requests?userId=${userId}`);
};

export const getFriendshipStatus = async (requesterId, receiverId) => {
  return ApiCall(
    `/api/isFriend?requester_id=${requesterId}&receiver_id=${receiverId}`
  );
};

export const sendFriendReq = async (fields) => {
  return ApiCall(`/api/friends/request`, 'POST', fields);
};

export const acceptFriendReq = async (id) => {
  return ApiCall(`/api/friends/accept/${id}`, 'POST');
};

export const declineFriendReq = async (id) => {
  return ApiCall(`/api/friends/decline/${id}`, 'DELETE');
};

export const unfriendUser = async (fields) => {
  return ApiCall(`/api/friends/unfriend`, 'DELETE', fields);
};

export const getFriendList = async (userId) => {
  return ApiCall(`/api/friends/list?userId=${userId}`);
};

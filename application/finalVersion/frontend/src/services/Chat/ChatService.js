/**
 * ChatService.js
 * Calls the following endpoints:
 * - /api/chat/getPublicMessages/{channel_names} (GET)
 *   - response: sorted by message_time 
 *     [{message_id, message_time, message_content, sender_id, message_type}...]
 * 
 * - /api/chat/sendPublicMessage (POST)
 *   - body: {sender_id, message_content, message_type}
 * 
 * - /api/chat/getPrivateMessages?{params} (GET)
 *   - response: sorted by message_time
 *     [{message_id, message_time, message_content, sender_id, message_type}...]
 * 
 * - /api/chat/sendPrivateMessage (POST)
 *   - body: {sender_id, message_content, receiver_name}
 * 
 * - /api/chat/getPrivateChats/{userId} (GET)
 *   - response: [{sender_id}...]
 * 
 * - /api/chat/getPrivateChats/noAnswer/{userId} (GET)
 *   - response: [{receiver_id}...]
 */
import ApiCall from '../ApiCall';

export const getPublicMessages = async (channel_names) => {
  return ApiCall(`/api/chat/getPublicMessages/${channel_names}`);
};

export const sendPublicMessage = async (fields) => {
  return ApiCall(`/api/chat/sendPublicMessage`, 'POST', fields);
};

export const getPrivateMessages = async (params) => {
  return ApiCall(`/api/chat/getPrivateMessages?${params}`);
};

export const sendPrivateMessage = async (fields) => {
  return ApiCall(`/api/chat/sendPrivateMessage`, 'POST', fields);
};

export const getPrivateChats = async (userId) => {
  return ApiCall(`/api/chat/getPrivateChats/${userId}`);
};

export const getUnansweredPrivateChats = async (userId) => {
  return ApiCall(`/api/chat/getPrivateChats/noAnswer/${userId}`);
};

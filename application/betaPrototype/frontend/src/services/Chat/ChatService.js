import ApiCall from "../ApiCall";

export const getPublicMessages = async (channel_names) => {
  return ApiCall(`/api/chat/getPublicMessages/${channel_names}`);
};

export const sendPublicMessage = async (fields) => {
  return ApiCall(`/api/chat/sendPublicMessage`, "POST", fields);
};

export const getPrivateMessages = async (params) => {
  return ApiCall(`/api/chat/getPrivateMessages?${params}`);
};

export const sendPrivateMessage = async (fields) => {
  return ApiCall(`/api/chat/sendPrivateMessage`, "POST", fields);
};

export const getPrivateChats = async (userId) => {
  return ApiCall(`/api/chat/getPrivateChats/${userId}`);
};

export const getUnansweredPrivateChats = async (userId) => {
  return ApiCall(`/api/chat/getPrivateChats/noAnswer/${userId}`);
};

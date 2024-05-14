import apiCall from "../apiCall";

export const getPublicMessages = async (channel_names) => {
    return apiCall(`/api/chat/getPublicMessages/${channel_names}`);
}

export const sendPublicMessage = async (fields) => {
    return apiCall(`/api/chat/sendPublicMessage`, 'POST', fields);
}

export const getPrivateMessages = async (params) => {
    return apiCall(`/api/chat/getPrivateMessages?${params}`);
}

export const sendPrivateMessage = async (fields) => {
    return apiCall(`/api/chat/sendPrivateMessage`, 'POST', fields);
}

export const getPrivateChats = async (userId) => {
    return apiCall(`/api/chat/getPrivateChats/${userId}`);
}

export const getUnansweredPrivateChats = async (userId) => {
    return apiCall(`/api/chat/getPrivateChats/noAnswer/${userId}`);
}
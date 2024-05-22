import ApiCall from '../ApiCall';

export const createProfile = async (fields) => {
  return ApiCall('/api/profile/create', 'POST', fields, false);
};

// can be found in handler.js (should be moved to profile routes)
export const updateProfile = async (fields) => {
  return ApiCall('/profile/edit', 'POST', fields);
};

export const getUserInfo = async (userId) => {
  return ApiCall(`/api/profile/info/${userId}`);
};

export const searchUsers = async (fields) => {
  return ApiCall(`/search`, 'POST', fields);
};
export const queryData = async (userId) => {
  return ApiCall(`/api/user/${userId}`);
};

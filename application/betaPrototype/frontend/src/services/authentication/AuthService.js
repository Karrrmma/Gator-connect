import ApiCall from '../ApiCall';

export const loginUser = async (fields) => {
  return ApiCall('/api/login', 'POST', fields, false);
};

export const registerUser = async (fields) => {
  return ApiCall('/api/register', 'POST', fields, false);
};

export const canRegister = async (fields) => {
  return ApiCall('/api/canRegister', 'POST', fields, false);
};

export const resetPassword = async (fields) => {
  return ApiCall('/api/resetPassword', 'POST', fields, false);
};

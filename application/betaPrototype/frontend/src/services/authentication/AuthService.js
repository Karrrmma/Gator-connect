/**
 * AuthService.js
 * Calls the following endpoints:
 * - /api/login (POST)
 *   - body: {username, password}
 *   - response: token
 * 
 * - /api/register (POST)
 *   - body: {fullname, sfsu_email, username, password, 
 *            major, year, role}
 *   
 * - /api/canRegister (POST)
 *   - body: {sfsu_email, username}
 *   - response: status 200 if can register, else 500
 * 
 * - /api/resetPassword (POST)
 *   - body: {username, email, newPassword}
 */
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

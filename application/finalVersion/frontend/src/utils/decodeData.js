/**
 * decodeData.js
 * - This file contains functions to decode the JWT token.
 * - The JWT token is signed with the current users username 
 *   along with their current user ID.
 */
import { jwtDecode } from 'jwt-decode';

export const decodeToken = () => {
  const token = localStorage.getItem('token');
  return token ? jwtDecode(token) : null;
};

export const getCurrentUsername = () => {
  const tokenData = decodeToken();
  return tokenData ? tokenData.username : null;
};

export const getCurrentUserId = () => {
  const tokenData = decodeToken();
  return tokenData ? tokenData.user_id : null;
};
/**
 * This function is used as a template to make API calls to the backend.
 * It takes in the endpoint, method, body, and a boolean (useToken) as parameters.
 *
 * When useToken is true, the function will require a JWT token to be passed in the headers.
 * This is true by default.
 */
import API_ROUTE from '../constants/API_ROUTE';

async function ApiCall(endpoint, method = 'GET', body, useToken = true) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (useToken) {
    // require JWT token by default
    const token = localStorage.getItem('token');
    // strip quotes from token
    const userToken = token.substring(1, token.length - 1);
    options.headers.Authorization = `Bearer ${userToken}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_ROUTE}${endpoint}`, options);

  if (!response.ok) {
    const responseBody = await response.json();
    // if the error is from token expiry, force the user to login again
    if (responseBody.tokenExpired) {
      console.log("token is expired asf");
      const error = new Error('Token expired. Please log in again.');
      error.tokenExpired = true;
      throw error;
    }
    throw new Error(responseBody.message);
  }

  return response.json();
}

export default ApiCall;

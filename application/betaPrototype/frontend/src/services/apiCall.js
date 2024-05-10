import API_ROUTE from "../constants/api_route";

//import token from "../hooks/useToken"
async function apiCall(endpoint, method = 'GET', body) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization' : `Bearer ${token}` 

      },
    };
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(`${API_ROUTE}${endpoint}`, options);
  
    if (!response.ok) {
      throw new Error(`API call failed using apiCall.js: ${response.status}`);
    }
  
    return response.json();
  }
  
  export default apiCall;
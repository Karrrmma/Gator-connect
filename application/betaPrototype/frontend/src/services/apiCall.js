import API_ROUTE from "../constants/api_route";

async function apiCall(endpoint, method = 'GET', body, useToken=true) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (useToken) { // require JWT token by default
      const token = localStorage.getItem('token');
      options.headers.Authorization = `Bearer ${token}`;
    }
  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(`${API_ROUTE}${endpoint}`, options);
  
    if (!response.ok) {
      // console.log(`Error ${response.status} given`);
      const responseBody = await response.json();
      throw new Error(responseBody.message);
    }
  
    return response.json();
  }
  
  export default apiCall;
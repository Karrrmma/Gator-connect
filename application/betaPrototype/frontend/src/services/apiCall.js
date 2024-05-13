import API_ROUTE from "../constants/api_route";

async function apiCall(endpoint, method = 'GET', body, useToken=true) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        
      },
    };
    
    if (useToken) { // require JWT token by default
      const token = sessionStorage.getItem('token');
      // strip quotes from token
      if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    } else {
        throw new Error('No token found in sessionStorage');
    }
}

  
    if (body) {
      options.body = JSON.stringify(body);
    }
  
    const response = await fetch(`${API_ROUTE}${endpoint}`, options);
  
    if (!response.ok) {
      const responseBody = await response.json();
      console.log(responseBody); // debug
      throw new Error(responseBody.message);
    }
  
    return response.json();
  }
  
  export default apiCall;
import API_ROUTE from "../constants/API_ROUTE";

async function ApiCall(endpoint, method = 'GET', body, useToken=true) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        
      },
    };
    
    if (useToken) { // require JWT token by default
      const token = sessionStorage.getItem('token');
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
      console.log(responseBody); // debug
      throw new Error(responseBody.message);
    }
  
    return response.json();
  }
  
  export default ApiCall;
import { useState } from 'react';
// hook
export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    let userToken = tokenString;
    if (!userToken) {
      return undefined;
    }
    // strip quotes from the obtained token
    userToken = userToken.substring(1, userToken.length - 1);
    return userToken;
  };

  // set inital state of token to the token in session storage
  const [token, setToken] = useState(getToken());
  // localStorage if you want to persist the token after the user closes the tab
  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken.token));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

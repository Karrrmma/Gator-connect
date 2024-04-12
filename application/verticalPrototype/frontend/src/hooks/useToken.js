import { useState } from 'react';
// hook
export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token; // return undefined instead of error if tokenString was null
    };
    // set inital state of token to the token in session storage
    const [token, setToken] = useState(getToken());

    // localStorage if you want to persist the token after the user closes the tab
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken.token)); 
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}
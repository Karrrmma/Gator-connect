import { useState } from 'react';
// hook
export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };
    
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken)); // localStorage if you want to persist the token
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}
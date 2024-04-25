import { useState } from 'react';
// hook
export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        let userToken = tokenString;
        console.log("calling getToken! STARTING expected value:\n" + userToken);
        if (!userToken) {
            return undefined;
        }
        // strip quotes from the obtained token
        userToken = userToken.substring(1, userToken.length - 1);
        console.log("calling getToken! SUBSTRING expected value:\n" + userToken);
        return userToken;
    };

    // set inital state of token to the token in session storage
    const [token, setToken] = useState(getToken());
    console.log("usestated token: " + token);
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
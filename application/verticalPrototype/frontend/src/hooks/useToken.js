import { useState } from 'react';
// hook
export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        // const userToken = JSON.parse(tokenString);
        // return userToken?.token; // return undefined instead of error if tokenString was null
        let userToken = tokenString;
        console.log("calling getToken! STARTING expected value:\n" + userToken);
        // strip quotes from obtained token
        if (!userToken) {
            // strip quotes from obtained token
            return undefined;
        }
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
    // console.log("getToken's token: " + token);
    return {
        setToken: saveToken,
        token
    }
}
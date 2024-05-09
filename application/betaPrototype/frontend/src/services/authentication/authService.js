// apiCall contains the API_ROUTE constant
import apiCall from "../apiCall";

export const loginUser = async (fields) => {
    return apiCall('/login', 'POST', fields);
}

export const registerUser = async (fields) => {
    return apiCall('/register', 'POST', fields);
}

export const resetPassword = async (fields) => {
    return apiCall('/reset-password', 'POST', fields);
}
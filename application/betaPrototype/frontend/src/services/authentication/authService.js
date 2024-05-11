// apiCall contains the API_ROUTE constant
import apiCall from "../apiCall";

export const loginUser = async (fields) => {
    return apiCall('/login', 'POST', fields, false);
}

export const registerUser = async (fields) => {
    return apiCall('/register', 'POST', fields, false);
}

export const canRegister = async (fields) => {
    return apiCall('/api/can_register', 'POST', fields, false);
}

export const resetPassword = async (fields) => {
    return apiCall('/reset-password', 'POST', fields, false);
}
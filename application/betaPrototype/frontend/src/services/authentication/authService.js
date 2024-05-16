import ApiCall from "../ApiCall";

export const loginUser = async (fields) => {
    return ApiCall('/login', 'POST', fields, false);
}

export const registerUser = async (fields) => {
    return ApiCall('/register', 'POST', fields, false);
}

export const canRegister = async (fields) => {
    return ApiCall('/api/can_register', 'POST', fields, false);
}

export const resetPassword = async (fields) => {
    return ApiCall('/reset-password', 'POST', fields, false);
}
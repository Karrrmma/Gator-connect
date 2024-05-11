import apiCall from "../apiCall";

export const createEvent = async (fields) => {
    return apiCall('/api/create_event', 'POST', fields);
}

export const getEvents = async () => {
    return apiCall('/api/events');
}

export const getVendors = async () => {
    return apiCall('/vendor-average-ratings');
}

export const getVendorData = async (name) => {
    return apiCall(`/api/vendordetail/${name}`);
}

export const postVendorReview = async (fields) => {
    return apiCall(`/api/vendordetail`, 'POST', fields);
}
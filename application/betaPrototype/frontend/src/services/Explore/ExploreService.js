import ApiCall from "../ApiCall";

export const createEvent = async (fields) => {
  return ApiCall("/api/createEvent", "POST", fields);
};

export const getEvents = async () => {
  return ApiCall("/api/events");
};

export const getVendors = async () => {
  return ApiCall("/api/vendorAverageRatings");
};

export const getVendorData = async (name) => {
  return ApiCall(`/api/vendordetail/${name}`);
};

export const postVendorReview = async (fields) => {
  return ApiCall(`/api/vendordetail`, "POST", fields);
};

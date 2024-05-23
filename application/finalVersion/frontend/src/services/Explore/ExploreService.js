/**
 * ExploreService.js
 * Calls the following endpoints:
 * - /api/createEvent (POST)
 *  - body: {event_description, event_type, event_name, event_location, 
 *    event_host, event_time, event_creator}
 * 
 * - /api/events (GET)
 *   - response: [{event_description, event_type, event_name, event_location, 
 *    event_host, event_time, event_creator, event_id}...]
 * 
 * - /api/vendorAverageRatings (GET)
 *   - response: [{vendor_name, average_rating, num_reviews}...]
 * 
 * - /api/vendordetail/:name (GET)
 *   - response: [{menu_name, menu_rating, menu_review}...]
 * 
 * - /api/vendordetail (POST)
 *   - body: {menu_name, menu_rating, menu_review, vendor_name}
 */
import ApiCall from '../ApiCall';

export const createEvent = async (fields) => {
  return ApiCall('/api/createEvent', 'POST', fields);
};

export const getEvents = async () => {
  return ApiCall('/api/events');
};

export const getVendors = async () => {
  return ApiCall('/api/vendorAverageRatings');
};

export const getVendorData = async (name) => {
  return ApiCall(`/api/vendordetail/${name}`);
};

export const postVendorReview = async (fields) => {
  return ApiCall(`/api/vendordetail`, 'POST', fields);
};

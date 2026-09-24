import api from "./api";

/**
 * Create a new booking request
 * @param {Object} bookingData - { tourId, travelDate, numberOfGuests, contactPhone, specialRequests }
 */
export const createBooking = async (bookingData) => {
  const { data } = await api.post("/bookings", bookingData);
  return data;
};

/**
 * Fetch all bookings made by the logged-in user
 */
export const getMyBookings = async () => {
  const { data } = await api.get("/bookings/my-bookings");
  return data;
};

/**
 * Fetch a single booking by ID
 * @param {string} id
 */
export const getBookingById = async (id) => {
  const { data } = await api.get(`/bookings/${id}`);
  return data;
};

/**
 * Cancel a booking
 * @param {string} id
 */
export const cancelBooking = async (id) => {
  const { data } = await api.put(`/bookings/${id}/cancel`);
  return data;
};

import api from "./api";

/**
 * Fetch aggregated statistics for admin dashboard overview
 */
export const getDashboardStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

/**
 * Fetch all platform bookings with status filter & pagination
 * @param {Object} params - { status, page, limit }
 */
export const getAllBookings = async (params = {}) => {
  const { data } = await api.get("/bookings", { params });
  return data;
};

/**
 * Update the status of a booking (confirmed, rejected, completed, cancelled)
 * @param {string} id
 * @param {string} status
 */
export const updateBookingStatus = async (id, status) => {
  const { data } = await api.put(`/bookings/${id}/status`, { status });
  return data;
};

/**
 * Fetch all tour packages for administration management
 * @param {Object} params
 */
export const getAllTours = async (params = {}) => {
  const { data } = await api.get("/tours", {
    params: { limit: 100, ...params },
  });
  return data;
};

/**
 * Create a new tour package
 * @param {Object} tourData
 */
export const createTour = async (tourData) => {
  const { data } = await api.post("/tours", tourData);
  return data;
};

/**
 * Update an existing tour package
 * @param {string} id
 * @param {Object} tourData
 */
export const updateTour = async (id, tourData) => {
  const { data } = await api.put(`/tours/${id}`, tourData);
  return data;
};

/**
 * Delete a tour package
 * @param {string} id
 */
export const deleteTour = async (id) => {
  const { data } = await api.delete(`/tours/${id}`);
  return data;
};

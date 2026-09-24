import api from "./api";

/**
 * Fetch all tour packages with optional search, filtering, and pagination parameters
 * @param {Object} params - { search, division, category, minPrice, maxPrice, sort, page, limit }
 */
export const getTours = async (params = {}) => {
  const { data } = await api.get("/tours", { params });
  return data;
};

/**
 * Fetch a single tour package by its ID or slug
 * @param {string} idOrSlug
 */
export const getTourById = async (idOrSlug) => {
  const { data } = await api.get(`/tours/${idOrSlug}`);
  return data;
};

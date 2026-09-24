import api from "./api";

/**
 * Register a new user
 * @param {Object} userData - { name, email, password, phone }
 */
export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

/**
 * Log in an existing user
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

/**
 * Get current authenticated user's profile
 */
export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

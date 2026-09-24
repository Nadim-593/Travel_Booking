/*
 * services/api.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central Axios HTTP client instance.
 *
 * WHY use a shared Axios instance?
 *   - The base URL is configured in ONE place (from .env.local)
 *   - Authentication tokens are automatically attached to every request
 *     via an Axios REQUEST interceptor — no need to manually add headers
 *     in every component
 *   - Error handling is standardised in one RESPONSE interceptor
 *   - If the API URL ever changes, you update ONE line here
 *
 * USAGE in any component or service file:
 *   import api from "@/services/api";
 *   const { data } = await api.get("/tours");
 *   const { data } = await api.post("/auth/login", { email, password });
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000, // Abort request if server doesn't respond within 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── REQUEST Interceptor ──────────────────────────────────────────────────────
// Runs automatically before EVERY outgoing request.
// Reads the JWT from localStorage and appends it to the Authorization header.
api.interceptors.request.use(
  (config) => {
    // localStorage is only available in the browser (not during SSR)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("deshiyo_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── RESPONSE Interceptor ─────────────────────────────────────────────────────
// Runs automatically on EVERY response (success or failure).
api.interceptors.response.use(
  // Success: just pass the response through unchanged
  (response) => response,

  // Error: standardise error handling
  (error) => {
    if (error.response) {
      // Server responded with a non-2xx status code
      const { status } = error.response;

      if (status === 401) {
        // Token is expired or invalid — clean up session and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("deshiyo_token");
          localStorage.removeItem("deshiyo_user");
          // Only redirect if we're not already on an auth page
          if (!window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
          }
        }
      }
    } else if (error.code === "ECONNABORTED") {
      // Request timed out — attach a friendly message
      error.message = "Request timed out. Please check your connection.";
    } else if (!error.response) {
      // Network error (server unreachable / CORS issue)
      error.message =
        "Cannot connect to the server. Please try again later.";
    }

    return Promise.reject(error);
  }
);

export default api;

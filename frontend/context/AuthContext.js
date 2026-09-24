"use client";

import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "@/services/authService";

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored token and restore session on application load
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("deshiyo_token");
        if (storedToken) {
          setToken(storedToken);
          try {
            // Verify token with backend /api/auth/me
            const response = await authService.getMe();
            if (response && response.user) {
              setUser(response.user);
            }
          } catch (error) {
            console.warn("[Auth] Stored token expired or invalid:", error.message);
            localStorage.removeItem("deshiyo_token");
            localStorage.removeItem("deshiyo_user");
            setUser(null);
            setToken(null);
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response && response.token) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("deshiyo_token", response.token);
      localStorage.setItem("deshiyo_user", JSON.stringify(response.user));
    }
    return response;
  };

  // Register handler
  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response && response.token) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("deshiyo_token", response.token);
      localStorage.setItem("deshiyo_user", JSON.stringify(response.user));
    }
    return response;
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("deshiyo_token");
    localStorage.removeItem("deshiyo_user");
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

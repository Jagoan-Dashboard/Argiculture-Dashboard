// src/lib/auth-helpers.ts
// Helper functions untuk authentication dengan cookie management

/**
 * Set authentication token ke localStorage DAN cookies
 * Cookies diperlukan untuk middleware Next.js (server-side)
 * localStorage untuk client-side
 */
export const setAuthData = (token: string, userData: any) => {
  // Save to localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("user_id", userData.id.toString());

  // Save to cookies (untuk middleware)
  // Cookies akan expire dalam 7 hari (bisa disesuaikan)
  const expiryDays = 7;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);

  document.cookie = `token=${token}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Strict`;
};

/**
 * Clear semua auth data dari localStorage DAN cookies
 */
export const clearAuthData = () => {
  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("user_id");

  // Clear cookies
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict";
};

/**
 * Get token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

/**
 * Get user data from localStorage
 */
export const getAuthUser = (): any | null => {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};

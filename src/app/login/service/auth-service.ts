// src/app/login/service/auth-service.ts
import apiClient from "@/lib/api-client";

// ===== TYPE DEFINITIONS =====
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      // tambahkan field lain sesuai response dari backend
    };
    token: string;
  };
}

// ===== AUTH SERVICE =====

/**
 * Login service
 * @param credentials - Email dan password user
 * @returns Promise dengan response berisi user data dan token
 */
export const loginService = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    // TODO: Sesuaikan endpoint dengan backend Anda
    const response = await apiClient.post<LoginResponse>(
      "/auth/login", // Sesuaikan endpoint
      credentials,
    );

    return response.data;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

/**
 * Logout service (optional - jika backend memerlukan logout endpoint)
 * @returns Promise
 */
export const logoutService = async (): Promise<void> => {
  try {
    // TODO: Sesuaikan endpoint dengan backend Anda jika ada
    await apiClient.post("/auth/logout");
  } catch (error) {
    console.error("Logout service error:", error);
    throw error;
  }
};

/**
 * Verify token service (optional - untuk validasi token)
 * @returns Promise dengan user data
 */
export const verifyTokenService = async () => {
  try {
    // TODO: Sesuaikan endpoint dengan backend Anda
    const response = await apiClient.get("/auth/verify");

    return response.data;
  } catch (error) {
    console.error("Verify token service error:", error);
    throw error;
  }
};

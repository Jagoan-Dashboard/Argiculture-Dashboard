

import { apiClient } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/api-endpoints";
import { LoginResponse, User } from "@/types/user";

interface LoginCredentials {
  identifier: string;
  password: string;
}

export class AuthService {
  /**
   * Login user with identifier and password
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        ENDPOINTS.LOGIN,
        credentials
      );

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post(ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
      
    } finally {
      
      this.clearAuthData();
    }
  }

  /**
   * Get current user info
   */
  static async getCurrentUser() {
    try {
      const response = await apiClient.get(ENDPOINTS.ME);
      return response.data;
    } catch (error) {
      console.error("Get current user error:", error);
      throw error;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(): boolean {
    const tokenExpiry = localStorage.getItem("token_expiry");
    
    if (!tokenExpiry) {
      return true;
    }

    const expiryTime = parseInt(tokenExpiry, 10);
    const currentTime = Date.now();

    return currentTime >= expiryTime;
  }

  /**
   * Clear all auth data from localStorage
   */
  static clearAuthData(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token_expiry");
  }

  /**
   * Save auth data to localStorage
   */
  static saveAuthData(token: string, user: User, expiresIn: number): void {
    const expiryTime = Date.now() + expiresIn * 1000; 
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("user_id", user.id.toString());
    localStorage.setItem("token_expiry", expiryTime.toString());
  }
}
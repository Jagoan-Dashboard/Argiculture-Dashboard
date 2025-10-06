// src/lib/api-client.ts
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { clearAuthData } from "./auth-helpers";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});

// ===== REQUEST INTERCEPTOR =====
// Automatically add Authorization header to every request
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        // Add Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);

    return Promise.reject(error);
  },
);

// ===== RESPONSE INTERCEPTOR =====
// Handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Token invalid/expired
          console.log("🔐 Unauthorized access - clearing auth data");

          // Clear auth data (localStorage + cookies)
          clearAuthData();

          // Show error toast
          toast.error("Sesi Anda telah berakhir", {
            description: "Silakan login kembali untuk melanjutkan",
          });

          // Redirect to login (after a short delay to show toast)
          setTimeout(() => {
            // Only redirect if not already on login page
            if (!window.location.pathname.includes("/login")) {
              window.location.href = "/login";
            }
          }, 1000);

          break;

        case 403:
          // Forbidden - No permission
          toast.error("Akses Ditolak", {
            description:
              "Anda tidak memiliki izin untuk mengakses resource ini",
          });
          break;

        case 404:
          // Not Found
          toast.error("Resource Tidak Ditemukan", {
            description: "Endpoint yang diminta tidak tersedia",
          });
          break;

        case 422:
          // Validation Error
          const validationMessage =
            data?.message || "Data yang dikirim tidak valid";

          toast.error("Validasi Error", {
            description: validationMessage,
          });
          break;

        case 429:
          // Too Many Requests
          toast.error("Terlalu Banyak Permintaan", {
            description: "Silakan tunggu beberapa saat sebelum mencoba lagi",
          });
          break;

        case 500:
          // Internal Server Error
          toast.error("Server Error", {
            description:
              "Terjadi kesalahan pada server. Silakan coba lagi nanti",
          });
          break;

        default:
          // Generic error
          const genericMessage =
            data?.message || "Terjadi kesalahan yang tidak diketahui";

          toast.error("Error", {
            description: genericMessage,
          });
      }
    } else if (error.request) {
      // Network error - no response received
      console.error("🌐 Network Error:", error.request);
      toast.error("Masalah Koneksi", {
        description:
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda",
      });
    } else {
      // Something else happened
      console.error("⚠️ Unknown Error:", error.message);
      toast.error("Error", {
        description: "Terjadi kesalahan yang tidak terduga",
      });
    }

    return Promise.reject(error);
  },
);

// ===== UTILITY FUNCTIONS =====
// Note: Sebagian besar auth utilities sudah dipindahkan ke lib/auth-helpers.ts

// Function to make authenticated request manually (if needed)
export const authenticatedRequest = async (config: AxiosRequestConfig) => {
  if (typeof window === "undefined") {
    throw new Error("Cannot make authenticated request on server side");
  }

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token available");
  }

  return apiClient({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

// ===== EXPORT DEFAULT =====
export default apiClient;

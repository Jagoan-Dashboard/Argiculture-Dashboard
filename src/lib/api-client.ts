
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

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



apiClient.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem("token");

    if (token) {
      
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);



apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error);

    
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          
          console.log("🔐 Unauthorized access - clearing auth data");

          
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("user_id");
          localStorage.removeItem("token_expiry");

          
          toast.error("Sesi Anda telah berakhir", {
            description: "Silakan login kembali untuk melanjutkan",
          });

          
          setTimeout(() => {
            
            if (!window.location.pathname.includes("/login")) {
              window.location.href = "/login";
            }
          }, 1000);

          break;

        case 403:
          
          toast.error("Akses Ditolak", {
            description:
              "Anda tidak memiliki izin untuk mengakses resource ini",
          });
          break;

        case 404:
          
          toast.error("Resource Tidak Ditemukan", {
            description: "Endpoint yang diminta tidak tersedia",
          });
          break;

        case 422:
          
          const validationMessage =
            data?.message || "Data yang dikirim tidak valid";

          toast.error("Validasi Error", {
            description: validationMessage,
          });
          break;

        case 429:
          
          toast.error("Terlalu Banyak Permintaan", {
            description: "Silakan tunggu beberapa saat sebelum mencoba lagi",
          });
          break;

        case 500:
          
          toast.error("Server Error", {
            description:
              "Terjadi kesalahan pada server. Silakan coba lagi nanti",
          });
          break;

        default:
          
          const genericMessage =
            data?.message || "Terjadi kesalahan yang tidak diketahui";

          toast.error("Error", {
            description: genericMessage,
          });
      }
    } else if (error.request) {
      
      console.error("🌐 Network Error:", error.request);
      toast.error("Masalah Koneksi", {
        description:
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda",
      });
    } else {
      
      console.error("⚠️ Unknown Error:", error.message);
      toast.error("Error", {
        description: "Terjadi kesalahan yang tidak terduga",
      });
    }

    return Promise.reject(error);
  }
);




export const setAuthToken = (token: string | null) => {
  if (token) {
    
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    
    delete apiClient.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};


export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};


export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  return !!token;
};


export const authenticatedRequest = async (config: AxiosRequestConfig) => {
  const token = getAuthToken();

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


export default apiClient;
// hooks/useLogin.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../service/validation";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import z from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // ===== MOCK LOGIN (Untuk Testing) =====
      // TODO: Uncomment code di bawah untuk menggunakan API real
      /*
      import { loginService } from '../service/auth-service';

      const response = await loginService({
        email: data.email,
        password: data.password
      });

      // Call login from AuthContext (will save to localStorage + cookies)
      login(response.data.user, response.data.token);
      */

      // ===== TEMPORARY: Mock Implementation =====
      console.log("Login attempt:", { ...data, rememberMe });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login response
      // const mockUser = {
      //   id: 1,
      //   nama: "Admin User",
      //   email: data.email,
      //   role: "admin",
      //   no_wa: "1234567890",
      //   foto: "",
      //   alamat: "",
      //   pekerjaan: "",
      //   status: "",
      //   created_at: "",
      //   updated_at: "",
      // };

      // const mockToken = "mock-jwt-token-" + Date.now();

      // Call login from AuthContext (will save to localStorage + cookies)
      // login(mockUser, mockToken);
      // ===== END MOCK =====

      // Show success toast
      toast.success("Login berhasil!", {
        description: "Selamat datang kembali",
      });

      // Redirect to dashboard
      router.push("/dashboard-admin");
    } catch (error) {
      console.error("Login error:", error);

      // Show error toast
      toast.error("Login gagal", {
        description: "Email atau password salah. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => {
    // Clear specific field error when user starts typing
    if (errors[field]) {
      clearErrors(field);
    }
  };

  return {
    // State
    rememberMe,
    showPassword,
    isLoading,
    isSubmitting,
    errors,
    
    // Actions
    setRememberMe,
    setShowPassword,
    setIsLoading,
    
    // Form methods
    register,
    handleSubmit,
    onSubmit,
    handleInputChange
  };
};
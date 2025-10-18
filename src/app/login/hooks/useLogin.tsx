import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../service/validation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthService } from "../service/auth-service";
import { toast } from "sonner";
import z from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      
      const response = await AuthService.login({
        identifier: data.identifier,
        password: data.password,
      });

      
      if (response.success && response.data) {
        const { token, user, expires_in } = response.data;

        
        AuthService.saveAuthData(token, user, expires_in);
        login(user, token);

        
        toast.success("Login Berhasil!", {
          description: `Selamat datang, ${user.username}`,
        });

        
        router.push("/dashboard-admin");
      } else {
        
        toast.error("Login Gagal", {
          description: response.message || "Terjadi kesalahan saat login",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error);

      
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Email atau password salah";

      
      setError("root", {
        type: "manual",
        message: errorMessage,
      });

      
      toast.error("Login Gagal", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => {
    
    if (errors[field]) {
      clearErrors(field);
    }
    
    if (errors.root) {
      clearErrors("root");
    }
  };

  return {
    
    rememberMe,
    showPassword,
    isLoading,
    isSubmitting,
    errors,

    
    setRememberMe,
    setShowPassword,
    setIsLoading,

    
    register,
    handleSubmit,
    onSubmit,
    handleInputChange,
  };
};
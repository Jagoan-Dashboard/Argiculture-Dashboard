

"use client";

import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { User } from "@/types/user";
import { useRouter, usePathname } from "next/navigation";
import { AuthService } from "@/app/login/service/auth-service";

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          
          if (AuthService.isTokenExpired()) {
            console.log("Token expired, clearing auth data");
            AuthService.clearAuthData();
            setUser(null);
            
            // TEMPORARILY DISABLED: Redirect to login if token is expired
            // if (pathname?.startsWith("/dashboard-admin")) {
            //   router.push("/login");
            // }
          } else {
            
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          }
        } else {
          
          setUser(null);
          
          // TEMPORARILY DISABLED: Redirect to login if no user/token
          // if (pathname?.startsWith("/dashboard-admin")) {
          //   router.push("/login");
          // }
        }
      } catch (error) {
        console.error("AuthContext: Error checking auth:", error);
        AuthService.clearAuthData();
        setUser(null);
        
        // TEMPORARILY DISABLED: Redirect to login on error
        // if (pathname?.startsWith("/dashboard-admin")) {
        //   router.push("/login");
        // }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  
  const login = useCallback(
    (userData: User, token: string) => {
      setUser(userData);
      AuthService.saveAuthData(token, userData, 3600);
    },
    []
  );

  
  const logout = useCallback(async () => {
    try {
      
      await AuthService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  
  const isAuthenticated = useMemo(() => {
    return !!user && !AuthService.isTokenExpired();
  }, [user]);

  
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      if (AuthService.isTokenExpired()) {
        console.log("Token expired, logging out...");
        logout();
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [user, logout]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [user, login, logout, isAuthenticated, isLoading]
  );

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto" />
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
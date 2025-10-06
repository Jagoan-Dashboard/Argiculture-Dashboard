// context/AuthContext.tsx
"use client";

import { createContext, useState, ReactNode, useMemo, useEffect, useContext } from "react";
import { User } from "@/types/user";
import { setAuthData, clearAuthData, getAuthUser } from "@/lib/auth-helpers";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Restore user dari localStorage jika ada
    const storedUser = getAuthUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    // Save ke localStorage DAN cookies
    setAuthData(token, userData);
    setUser(userData);
  };

  const logout = () => {
    // Clear localStorage DAN cookies
    clearAuthData();
    setUser(null);

    // Redirect ke login page
    router.push("/login");
  };

  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
      isLoading,
    }),
    [user, isAuthenticated, isLoading],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        <p className="ml-4 text-lg">Loading...</p>
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
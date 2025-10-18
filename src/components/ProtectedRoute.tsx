

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    
    if (isLoading) return;

    
    if (!isAuthenticated && pathname?.startsWith("/dashboard-admin")) {
      console.log("User not authenticated, redirecting to login...");
      router.push("/login");
    }

    
    if (isAuthenticated && pathname === "/login") {
      console.log("User already authenticated, redirecting to dashboard...");
      router.push("/dashboard-admin");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto" />
          <p className="text-lg text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  
  if (pathname?.startsWith("/dashboard-admin")) {
    if (!isAuthenticated) {
      return null; 
    }
    return <>{children}</>;
  }

  
  if (pathname === "/login") {
    if (isAuthenticated) {
      return null; 
    }
    return <>{children}</>;
  }

  
  return <>{children}</>;
}
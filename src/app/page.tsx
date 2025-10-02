"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect ke halaman dashboard-admin atau login
    router.push("/dashboard-admin");
    // Atau jika ingin redirect ke login:
    // router.push("/login");
    // Atau ke halaman home baru:
    // router.push("/home");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Mengalihkan...</p>
      </div>
    </div>
  );
}
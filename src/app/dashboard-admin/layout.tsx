

import DashboardAdminLayout from "@/components/DashboardLayout";
// import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProtectedRoute>
      <DashboardAdminLayout>{children}</DashboardAdminLayout>
    // </ProtectedRoute>
  );
}
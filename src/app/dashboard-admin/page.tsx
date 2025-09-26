'use client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatsType } from "./types/stats";
import { Home } from "lucide-react";
import { MapSection } from "./components/MapSection";
import { AspirationsData, AspirationsSection } from "./components/AspirationsSection";
import { StatusChart } from "./components/StatusChart";
import CardStats from "./components/CardStats";
import { CommodityChartSection } from "./components/ComodityChartSection";

// app/dashboard-admin/page.tsx
export default function DashboardPage() {
  // Sample data
  const statsData: StatsType[] = [
    {
      id: 1,
      title: "Total Luas Lahan",
      value: "324.5",
      unit: "Hektar (Ha)",
      change: "+2.1%",
      isPositive: true,
      icon: "lets-icons:road-fill",
      color: "text-green-600"
    },
    {
      id: 2,
      title: "Jumlah Laporan Hama/Penyakit",
      value: "81",
      unit: "Laporan",
      change: "5.3%",
      isPositive: false,
      icon: "fa6-solid:road-circle-xmark",
      color: "text-green-500"
    },
    {
      id: 3,
      title: "Total Laporan Penyuluh",
      value: "201",
      unit: "Laporan",
      change: "+5.1%",
      isPositive: true,
      icon: "mdi:users",
      color: "text-green-600"
    }
  ];

  const commodityData = [
    { name: "Padi Sawah", value: 6, fullName: "Padi Sawah" },
    { name: "Jagung", value: 11, fullName: "Jagung" },
    { name: "Kedelai", value: 7, fullName: "Kedelai" },
    { name: "Ubi Jalar", value: 7, fullName: "Ubi Jalar" },
    { name: "Kacang Tanah", value: 9, fullName: "Kacang Tanah" },
    { name: "Ubi Kayu", value: 7, fullName: "Ubi Kayu" },
    { name: "Padi Ladang", value: 10, fullName: "Padi Ladang" },
  ];

  const statusData = [
    { name: "Milik Sendiri", value: 50, color: "#4F46E5" },
    { name: "Sewa", value: 33.3, color: "#33AD5C" },
    { name: "Pinjam/Bebas Sewa", value: 16.7, color: "#F97316" }
  ];

  const aspirasiData: AspirationsData = {
    categories: [
      {
        title: "Kendala Utama",
        color: "green",
        items: [
          { id: 1, title: "Akses pasar", value: 40, percentage: 40, color: "green" },
          { id: 2, title: "Irigasi Sulit", value: 37, percentage: 37, color: "green" },
          { id: 3, title: "Hama", value: 31, percentage: 31, color: "green" },
        ]
      },
      {
        title: "Harapan & Kebutuhan Petani",
        color: "pink",
        items: [
          { id: 4, title: "Cold storage", value: 46, percentage: 40, color: "pink" },
          { id: 5, title: "Irigasi Sulit", value: 37, percentage: 40, color: "pink" },
        ]
      }
    ]
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <div className=" bg-gray-50 rounded-lg p-4 lg:p-6">
        <div className="w-full space-y-6">
          {/* Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard-admin">
                  <Home className="w-4 h-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Executive</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Kabupaten Ngawi</p>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard Pertanian</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Sektor Pertanian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Pangan</SelectItem>
                  <SelectItem value="dark">Sektor Perikanan</SelectItem>
                  <SelectItem value="system">Sektor Peternakan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardStats statsData={statsData} />
          </div>

          {/* Main Content Grid  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-auto-flow-dense">
            {/* Map Section - Bisa tinggi besar */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <MapSection />
              <CommodityChartSection commodityData={commodityData} />
            </div>

            {/* Aspirations Section - Tinggi normal */}
            <div className="flex flex-col gap-6">
              <AspirationsSection data={aspirasiData} />
              <StatusChart statusData={statusData} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
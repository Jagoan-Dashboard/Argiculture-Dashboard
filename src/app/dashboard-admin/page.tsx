'use client';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatsType } from "./types/stats";
import { Home } from "lucide-react";
import { MapSection } from "./components/MapSection";
import { AspirationsSection } from "./components/AspirationsSection";
import { StatusChart } from "./components/StatusChart";
import CardStats from "./components/CardStats";
import { CommodityChartSection } from "./components/ComodityChartSection";
import { useExecutiveDashboard } from "./hooks/useExecutiveDashboard";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useState, useMemo } from "react";
import { 
  SECTOR_OPTIONS, 
  COMMODITY_NAME_MAP, 
  LAND_STATUS_MAP, 
  CONSTRAINT_MAP, 
  HOPE_MAP, 
  AspirationsData
} from "./types/executive";
import { CommodityData } from "./types/comodity";

export default function DashboardPage() {
  // State untuk sector filter
  const [selectedSector, setSelectedSector] = useState<string>('pangan');

  // Fetch data menggunakan custom hook
  const { data, loading, error, refetch } = useExecutiveDashboard({
    commodity_type: selectedSector,
  });

  // Transform data untuk stats cards
  const statsData: StatsType[] = useMemo(() => {
    if (!data) return [];
    
    return [
      {
        id: 1,
        title: "Total Luas Lahan",
        value: data.total_land_area.toLocaleString('id-ID'),
        unit: "Hektar (Ha)",
        change: "+2.1%",
        isPositive: true,
        icon: "lets-icons:road-fill",
        color: "text-green-600"
      },
      {
        id: 2,
        title: "Jumlah Laporan Hama/Penyakit",
        value: data.pest_disease_reports.toString(),
        unit: "Laporan",
        change: "5.3%",
        isPositive: false,
        icon: "fa6-solid:road-circle-xmark",
        color: "text-green-500"
      },
      {
        id: 3,
        title: "Total Laporan Penyuluh",
        value: data.total_extension_reports.toString(),
        unit: "Laporan",
        change: "+5.1%",
        isPositive: true,
        icon: "mdi:users",
        color: "text-green-600"
      }
    ];
  }, [data]);

  // Transform data untuk commodity chart
  const commodityData: CommodityData[] = useMemo(() => {
    if (!data) return [];
    
    const allCommodities = [
      ...(data.commodity_by_sector.food_crops || []),
      ...(data.commodity_by_sector.horticulture || []),
      ...(data.commodity_by_sector.plantation || []),
    ];

    return allCommodities.map(item => ({
      name: COMMODITY_NAME_MAP[item.name] || item.name,
      value: item.count,
      fullName: COMMODITY_NAME_MAP[item.name] || item.name,
    }));
  }, [data]);

  // Transform data untuk status chart
  const statusData = useMemo(() => {
    if (!data?.land_status_distribution) return [];
    
    const colors = ['#4F46E5', '#33AD5C', '#F97316'];
    
    return data.land_status_distribution.map((item, index) => ({
      name: LAND_STATUS_MAP[item.status] || item.status,
      value: item.percentage,
      color: colors[index % colors.length],
    }));
  }, [data]);

  // Transform data untuk aspirasi
  const aspirasiData: AspirationsData = useMemo(() => {
    if (!data) return { categories: [] };

    const categories = [];

    // Kendala Utama (hijau)
    if (data.main_constraints && data.main_constraints.length > 0) {
      categories.push({
        title: "Kendala Utama",
        color: "green" as const,
        items: data.main_constraints.map((item, index) => ({
          id: index + 1,
          title: CONSTRAINT_MAP[item.constraint] || item.constraint,
          value: item.count,
          percentage: item.percentage,
          color: "green" as const,
        })),
      });
    }

    // Harapan & Kebutuhan Petani (pink)
    if (data.farmer_hopes_needs.hopes && data.farmer_hopes_needs.hopes.length > 0) {
      categories.push({
        title: "Harapan & Kebutuhan Petani",
        color: "pink" as const,
        items: data.farmer_hopes_needs.hopes.map((item, index) => ({
          id: index + 100,
          title: HOPE_MAP[item.hope] || item.hope,
          value: item.count,
          percentage: item.percentage,
          color: "pink" as const,
        })),
      });
    }

    return { categories };
  }, [data]);

  // Handler untuk perubahan sector
  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    refetch({
      commodity_type: value,
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Spinner variant="circle" size={48} className="mx-auto mb-4" />
              <p className="text-gray-600">Memuat dashboard executive...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => refetch({ commodity_type: selectedSector })}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
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
                <BreadcrumbPage className="text-gray-600 font-medium">Executive</BreadcrumbPage>
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
              <Select value={selectedSector} onValueChange={handleSectorChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Pilih Sektor" />
                </SelectTrigger>
                <SelectContent>
                  {SECTOR_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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
              <MapSection commodityMapData={data?.commodity_map} />
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
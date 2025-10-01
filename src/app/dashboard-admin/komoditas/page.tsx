"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { StatsType } from '../types/stats';
import CardStats from '../components/CardStats';
import { MapSection } from '../components/MapSection';
import { KeyComponent } from './components/KeyComponents';
import { Key } from './types/key';
import { ProductivityChartSection } from './components/ProductivityChartSection';
import { ProductivityData } from './types/productivity';
import { useCommodityAnalysis } from './hooks/useCommodityAnalysis';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { format } from 'date-fns';
import { COMMODITY_OPTIONS } from './types/commodity';

const KomoditasListPage = () => {
  // State untuk commodity dan date range
  const [selectedCommodity, setSelectedCommodity] = useState<string>('Padi');
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2024, 0, 1), // 1 Jan 2024
    to: new Date(2024, 11, 31), // 31 Des 2024
  });

  // API params
  const apiParams = useMemo(() => ({
    commodity_name: selectedCommodity,
    start_date: format(dateRange.from, 'yyyy-MM-dd'),
    end_date: format(dateRange.to, 'yyyy-MM-dd'),
  }), [selectedCommodity, dateRange]);

  // Fetch data menggunakan custom hook
  const { data, loading, error, refetch } = useCommodityAnalysis(apiParams);

  // Transform data untuk stats cards
  const statsData: StatsType[] = useMemo(() => {
    if (!data) return [];
    
    return [
      {
        id: 1,
        title: "Total Produksi",
        value: data.total_production.toLocaleString('id-ID'),
        unit: "Ton",
        change: `${data.production_growth >= 0 ? '+' : ''}${data.production_growth.toFixed(1)}%`,
        isPositive: data.production_growth >= 0,
        icon: "lets-icons:road-fill",
        color: "text-green-600"
      },
      {
        id: 2,
        title: "Total Luas Panen",
        value: data.total_harvested_area.toLocaleString('id-ID'),
        unit: "Hektar (Ha)",
        change: `${data.harvested_area_growth >= 0 ? '+' : ''}${data.harvested_area_growth.toFixed(1)}%`,
        isPositive: data.harvested_area_growth >= 0,
        icon: "fa6-solid:road-circle-xmark",
        color: "text-green-500"
      },
      {
        id: 3,
        title: "Produktivitas",
        value: data.productivity.toLocaleString('id-ID'),
        unit: "Ton/Ha",
        change: `${data.productivity_growth >= 0 ? '+' : ''}${data.productivity_growth.toFixed(1)}%`,
        isPositive: data.productivity_growth >= 0,
        icon: "mdi:users",
        color: "text-green-600"
      }
    ];
  }, [data]);

  // Transform data untuk productivity chart
  const productivityData: ProductivityData[] = useMemo(() => {
    if (!data?.productivity_trend) return [];
    
    return data.productivity_trend.map(item => ({
      year: item.year,
      value: item.productivity,
      production: item.production,
      area: item.area
    }));
  }, [data]);

  // Key insights
  const keyInsight: Key[] = [
    {
      id: 1,
      icon: "material-symbols:trending-up",
      title: "Peningkatan Produksi Padi Konsisten",
      description: "Produksi padi 2024 meningkat 0,49%",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: "material-symbols:agriculture",
      title: "Peningkatan Luas Panen",
      description: "Kenaikan konsisten, menunjukkan ekspansi pertanian",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: "material-symbols:speed",
      title: "Produktivitas Padi Cenderung Stagnan",
      description: "Efisiensi per hektar perlu ditingkatkan agar lebih optimal",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  const keyStrategy: Key[] = [
    {
      id: 1,
      icon: "material-symbols:integration-instructions",
      title: "Integrasi Mesin dengan Data Pertanian",
      description: "Adopsi teknologi pertanian modern",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: "material-symbols:settings",
      title: "Optimalisasi Mekanisasi Pertanian",
      description: "Memfokuskan pada pelatihan mesin bagi petani",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: "material-symbols:share",
      title: "Distribusi Peralatan yang Merata",
      description: "Tersedia secara merata di seluruh wilayah pertanian",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  // Handler untuk perubahan commodity
  const handleCommodityChange = (value: string) => {
    setSelectedCommodity(value);
    refetch({
      ...apiParams,
      commodity_name: value,
    });
  };

  // Handler untuk perubahan date range
  const handleDateUpdate = (values: { range: { from: Date; to: Date | undefined } }) => {
    if (values.range.to) {
      setDateRange({
        from: values.range.from,
        to: values.range.to,
      });
      
      refetch({
        commodity_name: selectedCommodity,
        start_date: format(values.range.from, 'yyyy-MM-dd'),
        end_date: format(values.range.to, 'yyyy-MM-dd'),
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Spinner variant="circle" size={48} className="mx-auto mb-4" />
              <p className="text-gray-600">Memuat analisis komoditas...</p>
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
                onClick={() => refetch(apiParams)}
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
                <BreadcrumbPage className="text-gray-600 font-medium">Komoditas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Kabupaten Ngawi</p>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard Komoditas</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <DateRangePicker
                onUpdate={handleDateUpdate}
                initialDateFrom={dateRange.from}
                initialDateTo={dateRange.to}
                align="center"
                locale="id-ID"
                showCompare={false}
              />
              <Select value={selectedCommodity} onValueChange={handleCommodityChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Pilih Komoditas" />
                </SelectTrigger>
                <SelectContent>
                  {COMMODITY_OPTIONS.map((option) => (
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

          <div className="grid grid-cols-1 h-full min-h-[10rem] max-h-[32rem] sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map Section - key insight */}
            <div className="lg:col-span-2 flex flex-col h-max gap-6">
              <MapSection />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyInsight} title="Key Insight" description="Wawasan penting dari data pertanian" />
            </div>
          </div>

          <div className="grid grid-cols-1 h-[32rem] sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProductivityChartSection productivityData={productivityData} />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyStrategy} title="Key Strategy" description="Strategi penting untuk pertanian" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomoditasListPage;
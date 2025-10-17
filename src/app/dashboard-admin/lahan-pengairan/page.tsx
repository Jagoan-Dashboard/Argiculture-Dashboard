"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Home } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import CardStats from '../components/CardStats';
import { StatsType } from '../types/stats';
import { MapSection } from './components/MapSection';
import { KeyComponent } from '../komoditas/components/KeyComponents';
import { Key } from '../komoditas/types/key';
import { DistribusiLahanData } from './types/distribusi-lahan';
import { DistribusiLahanSection } from './components/DistribusiLahanSection';
import { useLandIrrigation } from './hooks/useLandIrrigation';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { format } from 'date-fns';

const LahanPengairanPage = () => {
  
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2024, 0, 1), 
    to: new Date(2025, 11, 31), 
  });

  
  const formattedParams = useMemo(() => ({
    start_date: format(dateRange.from, 'yyyy-MM-dd'),
    end_date: format(dateRange.to, 'yyyy-MM-dd'),
  }), [dateRange]);

  
  const { data, loading, error, refetch } = useLandIrrigation(formattedParams);

  
  const statsData: StatsType[] = useMemo(() => {
    if (!data) return [];
    
    return [
      {
        id: 1,
        title: "Total Luas Lahan",
        value: data.total_land_area.area.toFixed(2),
        unit: "Hektar (Ha)",
        change: `${data.total_land_area.growth_percent >= 0 ? '+' : ''}${data.total_land_area.growth_percent.toFixed(1)}%`,
        isPositive: data.total_land_area.growth_percent >= 0,
        icon: "lets-icons:road-fill",
        color: "text-green-600"
      },
      {
        id: 2,
        title: "Luas Lahan Sawah",
        value: data.irrigated_land_area.area.toFixed(2),
        unit: "Hektar (Ha)",
        change: `${data.irrigated_land_area.growth_percent >= 0 ? '+' : ''}${data.irrigated_land_area.growth_percent.toFixed(1)}%`,
        isPositive: data.irrigated_land_area.growth_percent >= 0,
        icon: "icon-park-outline:water",
        color: "text-green-600"
      },
      {
        id: 3,
        title: "Luas Lahan Bukan Sawah",
        value: data.non_irrigated_land_area.area.toFixed(2),
        unit: "Hektar (Ha)",
        change: `${data.non_irrigated_land_area.growth_percent >= 0 ? '+' : ''}${data.non_irrigated_land_area.growth_percent.toFixed(1)}%`,
        isPositive: data.non_irrigated_land_area.growth_percent >= 0,
        icon: "material-symbols:water-drop-outline",
        color: "text-green-600"
      }
    ];
  }, [data]);
  console.log('data', data)

  
  const distribusiData: DistribusiLahanData[] = useMemo(() => {
    if (!data?.land_distribution) return [];
    
    return data.land_distribution.map(item => ({
      kecamatan: item.district,
      sawah: item.food_crop_area,
      perkebunan: item.plantation_area,
      ladang: item.horti_area
    }));
  }, [data]);
  console.log('distribusiData', distribusiData)

  const mapData = useMemo(() => {
  if (!data?.individual_points) return [];
  
  return data.individual_points.map(item => ({
    latitude: item.latitude,
    longitude: item.longitude,
    village: item.village,
    district: item.district,
    farmer_name: item.farmer_name,
    total_land_area: item.total_land_area,
    food_land_area: item.food_land_area,
    horti_land_area: item.horti_land_area,
    plantation_land_area: item.plantation_land_area,
    water_access: item.water_access,
    has_good_water_access: item.has_good_water_access,
    primary_commodity: item.primary_commodity,
    visit_date: item.visit_date
  }));
}, [data]);

  const keyInsight: Key[] = [
    {
      id: 1,
      icon: "material-symbols:trending-up",
      title: "Luas Lahan Sawah Dominan",
      description: "Lahan sawah mendominasi distribusi lahan pertanian",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: "icon-park-outline:water",
      title: "Sistem Irigasi Berkembang",
      description: "Infrastruktur irigasi terus ditingkatkan",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: "material-symbols:agriculture",
      title: "Diversifikasi Lahan Pertanian",
      description: "Pengembangan berbagai jenis lahan pertanian",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  const keyStrategy: Key[] = [
    {
      id: 1,
      icon: "material-symbols:water-pump",
      title: "Optimalisasi Sistem Irigasi",
      description: "Peningkatan efisiensi penggunaan air",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: "material-symbols:landscape",
      title: "Konservasi Lahan Pertanian",
      description: "Menjaga keberlanjutan lahan produktif",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: "material-symbols:share",
      title: "Distribusi Air yang Merata",
      description: "Akses irigasi untuk semua wilayah",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  
  const handleDateUpdate = (values: { range: { from: Date; to: Date | undefined } }) => {
    if (values.range.to) {
      setDateRange({
        from: values.range.from,
        to: values.range.to,
      });
      
      refetch({
        start_date: format(values.range.from, 'yyyy-MM-dd'),
        end_date: format(values.range.to, 'yyyy-MM-dd'),
      });
    }
  };

  
  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Spinner variant="circle" size={48} className="mx-auto mb-4" />
              <p className="text-gray-600">Memuat data lahan dan pengairan...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
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
                onClick={() => refetch(formattedParams)}
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
                <BreadcrumbPage>Lahan Pengairan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Kabupaten Ngawi</p>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard Lahan Pengairan</h1>
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
            </div>
          </div>
          
          {/* stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardStats statsData={statsData} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-auto-flow-dense">
            {/* Map Section - key insight */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <MapSection individualPointsData={mapData} />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyInsight} title="Key Insight" description="Wawasan penting dari data pertanian" />
            </div>
            <div className="lg:col-span-2">
              <DistribusiLahanSection distribusiData={distribusiData} />
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

export default LahanPengairanPage;
"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Home } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { StatsType } from '../types/stats';
import CardStats from '../components/CardStats';
import { MapSection } from './components/MapSection';
import { KeyComponent } from '../komoditas/components/KeyComponents';
import { Key } from '../komoditas/types/key';
import { JumlahPompaSection } from './components/JumlahPompaSection';
import { JumlahPompaData } from './types/pompa';
import { useEquipmentStats } from './hooks/useEquipmentStats';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { format } from 'date-fns';
import { EQUIPMENT_EQUIPMENT } from './types/equipment_map';
import { createCommodityLabelGetter } from '@/lib/color-mapping-helper';

const AlatPertanianPage = () => {

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


  const { data, loading, error, refetch } = useEquipmentStats(formattedParams);


  const statsData: StatsType[] = useMemo(() => {
    if (!data) return [];

    return [
      {
        id: 1,
        title: "Jumlah Alat Pengolah Gabah",
        value: data.grain_processor.count.toString(),
        unit: "Unit",
        change: `${data.grain_processor.growth_percent >= 0 ? '+' : ''}${data.grain_processor.growth_percent}%`,
        isPositive: data.grain_processor.growth_percent >= 0,
        icon: "material-symbols:agriculture",
        color: "text-green-600"
      },
      {
        id: 2,
        title: "Jumlah Alat Perontok Multiguna",
        value: data.multipurpose_thresher.count.toString(),
        unit: "Unit",
        change: `${data.multipurpose_thresher.growth_percent >= 0 ? '+' : ''}${data.multipurpose_thresher.growth_percent}%`,
        isPositive: data.multipurpose_thresher.growth_percent >= 0,
        icon: "mdi:grain",
        color: "text-green-500"
      },
      {
        id: 3,
        title: "Jumlah Mesin/Peralatan Pertanian",
        value: data.farm_machinery.count.toString(),
        unit: "Unit",
        change: `${data.farm_machinery.growth_percent >= 0 ? '+' : ''}${data.farm_machinery.growth_percent}%`,
        isPositive: data.farm_machinery.growth_percent >= 0,
        icon: "mdi:tractor",
        color: "text-green-600"
      },
      {
        id: 4,
        title: "Jumlah Pompa Air",
        value: data.water_pump.count.toString(),
        unit: "Unit",
        change: `${data.water_pump.growth_percent >= 0 ? '+' : ''}${data.water_pump.growth_percent}%`,
        isPositive: data.water_pump.growth_percent >= 0,
        icon: "mdi:water-pump",
        color: "text-green-600"
      }
    ];
  }, [data]);

  const mapData = useMemo(() => {
    if (!data?.individual_distribution) return [];

    // const displayName = COMODITY_EQUIPMENT[item.commodity] || item.commodity;
    const getCommodityLabel = createCommodityLabelGetter(EQUIPMENT_EQUIPMENT);


    return data.individual_distribution.map(item => ({
      latitude: item.latitude,
      longitude: item.longitude,
      village: item.village,
      district: item.district,
      farmer_name: item.farmer_name,
      technology_type: item.technology_type,
      commodity: getCommodityLabel(item.commodity),
      visit_date: item.visit_date
    }));
  }, [data]);


  const jumlahPompaData: JumlahPompaData[] = useMemo(() => {
    if (!data?.water_pump_trend) return [];

    return data.water_pump_trend.map(item => ({
      year: item.year,
      value: item.count
    }));
  }, [data]);

  const keyInsight: Key[] = [
    {
      id: 1,
      icon: "material-symbols:trending-up",
      title: "Peningkatan Jumlah Mesin Pertanian",
      description: "Mekanisasi pertanian tersedia dengan baik",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 2,
      icon: "material-symbols:agriculture",
      title: "Jumlah Alat Pengolah Gabah Meningkat Signifikan",
      description: "Mekanisasi pengolahan padi yang semakin tinggi",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: "material-symbols:speed",
      title: "Fluktuasi Pompa Air dan Perontok Multiguna",
      description: "Beberapa jenis belum tersedia secara merata",
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
              <p className="text-gray-600">Memuat data alat pertanian...</p>
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
                <BreadcrumbPage>Alat-pertanian</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Kabupaten Ngawi</p>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard Alat Pertanian</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardStats statsData={statsData} />
          </div>

          {/* Mobile layout: Stack components in desired order */}
          <div className="space-y-6 sm:hidden">
            <div>
              <MapSection equipmentMapData={mapData} />
            </div>
            <div>
              <KeyComponent data={keyInsight} title="Key Insight" description="Wawasan penting dari data pertanian" />
            </div>
            <div>
              <KeyComponent data={keyStrategy} title="Key Strategy" description="Strategi penting untuk pertanian" />
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Map Section - key insight */}

            <div className="lg:col-span-2 flex flex-col gap-6">
              <MapSection equipmentMapData={mapData} />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyInsight} title="Key Insight" description="Wawasan penting dari data pertanian" />
            </div>
            <div className="lg:col-span-2">
              <JumlahPompaSection jumlahPompaData={jumlahPompaData} />
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

export default AlatPertanianPage;
"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { StatsType } from '../komoditas-pangan/types/stats';
import CardStats from '../komoditas-pangan/components/CardStats';
import { GrowthPhaseData } from '../komoditas-pangan/types/proparsi';
import { HamaData } from '../komoditas-pangan/types/dominasi';
import { TeknologiData } from '../komoditas-pangan/types/teknologi';
import { MapSection } from '../components/MapSection';
import { ProporsiSection } from '../komoditas-pangan/components/ProparsiSection';
import { TablePerkiraanSection } from '../komoditas-pangan/components/TablePerkiraanSection';
import { DominasiHamaSection } from '../komoditas-pangan/components/DominasiHamaSection';
import { TeknologiSection } from '../komoditas-pangan/components/TeknologiSection';
import { useHorticulture } from './hooks/useHorticulture';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { HORTICULTURE_COMMODITY_OPTIONS, HarvestScheduleData } from './types/horticulture-types';

const KomoditasHorticulturaPage = () => {
  
  const [selectedCommodity, setSelectedCommodity] = useState<string>('wortel');

  
  const apiParams = useMemo(() => ({
    commodity_name: selectedCommodity,
  }), [selectedCommodity]);

  
  const { data, loading, error, refetch } = useHorticulture(apiParams);
  console.log(data)

  
  const statsData: StatsType[] = useMemo(() => {
    if (!data) return [];
    
    return [
      {
        id: 1,
        title: "Luas Lahan",
        value: data.land_area.toLocaleString('id-ID'),
        unit: "Hektar (Ha)",
        change: "+2.1%",
        icon: "lets-icons:road-fill",
        color: "text-green-600"
      },
      {
        id: 2,
        title: "Total Estimasi Produksi",
        value: data.estimated_production.toLocaleString('id-ID'),
        unit: "Ton",
        change: "5.3%",
        icon: "fa6-solid:road-circle-xmark",
        color: "text-green-500"
      },
      {
        id: 3,
        title: "Luas Terdampak Hama/Penyakit",
        value: data.pest_affected_area.toLocaleString('id-ID'),
        unit: "Hektar (Ha)",
        change: "+5.1%",
        icon: "mdi:users",
        color: "text-green-600"
      },
      {
        id: 4,
        title: "Jumlah Laporan Hama",
        value: data.pest_report_count.toString(),
        unit: "Laporan",
        change: "+5.1%",
        icon: "mdi:users",
        color: "text-green-600"
      }
    ];
  }, [data]);

  

  // Transform data untuk map - TAMBAHKAN INI
  const mapData = useMemo(() => {
    if (!data?.distribution_map) return [];
    
    return data.distribution_map.map(item => ({
      latitude: item.latitude,
      longitude: item.longitude,
      village: item.village,
      district: item.district,
      commodity: item.commodity,
      commodity_type: item.commodity_type,
      land_area: item.land_area
    }));
  }, [data]);

  
  const proparsiData: GrowthPhaseData[] = useMemo(() => {
    if (!data?.growth_phases) return [];
    
    
    const colors = ['#EC4899', '#22C55E', '#FB923C', '#FBBF24', '#8B5CF6'];
    
    return data.growth_phases.map((phase, index) => ({
      name: phase.phase,
      value: phase.percentage,
      percentage: phase.percentage,
      color: colors[index % colors.length],
      fullName: phase.phase
    }));
  }, [data]);

  
  const hamaData: HamaData[] = useMemo(() => {
    if (!data?.pest_dominance) return [];
    
    
    const colors = ['#22C55E', '#FB923C', '#FBBF24', '#EC4899', '#8B5CF6'];
    
    
    const pestNameMap: Record<string, string> = {
      'WERENG_COKLAT': 'Wereng Coklat',
      'TIKUS': 'Tikus',
      'TIDAK_ADA': 'Tidak ada',
      'LAINNYA': 'Lainnya',
      'LAYU_FUSARIUM': 'Layu Fusarium',
      'TRIPS': 'Trips',
      'ANTRAKNOSA': 'Antraknosa',
    };
    
    return data.pest_dominance.map((pest, index) => ({
      name: pestNameMap[pest.pest_type] || pest.pest_type,
      value: pest.percentage,
      percentage: pest.percentage,
      color: colors[index % colors.length],
      fullName: pestNameMap[pest.pest_type] || pest.pest_type
    }));
  }, [data]);

  
  const teknologiData: TeknologiData[] = useMemo(() => {
    if (!data?.technology_used) return [];
    
    return data.technology_used.map(tech => ({
      name: tech.technology,
      value: tech.count,
      fullName: tech.technology
    }));
  }, [data]);

  
  const harvestScheduleData: HarvestScheduleData[] = useMemo(() => {
    if (!data?.harvest_schedule) return [];
    
    return data.harvest_schedule.map((item, index) => ({
      id: `harvest-${index}`,
      no: index + 1,
      komoditas: item.commodity_detail,
      estimasiPanen: format(new Date(item.harvest_date), 'dd MMMM yyyy', { locale: localeId }),
      petani: item.farmer_name,
      desa: item.village,
      luasLahan: item.land_area
    }));
  }, [data]);

  
  const handleCommodityChange = (value: string) => {
    setSelectedCommodity(value);
    refetch({
      ...apiParams,
      commodity_name: value,
    });
  };

  
  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl">
        <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Spinner variant="circle" size={48} className="mx-auto mb-4" />
              <p className="text-gray-600">Memuat data komoditas hortikultura...</p>
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
                <BreadcrumbPage>Komoditas Hortikultura</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Kabupaten Ngawi</p>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard Komoditas Hortikultura</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCommodity} onValueChange={handleCommodityChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Pilih Komoditas" />
                </SelectTrigger>
                <SelectContent>
                  {HORTICULTURE_COMMODITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardStats statsData={statsData} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section - PASS mapData */}
            <MapSection commodityMapData={mapData} title='Peta Persebaran Komoditas Hortikultura'/>

            {/* Proporsi Fase Pertumbuhan Section */}
            <ProporsiSection growthPhaseData={proparsiData} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Table Section */}
            <div className="lg:col-span-2">
              <TablePerkiraanSection 
                data={harvestScheduleData}
                loading={loading}
              />
            </div>
            
            {/* Dominasi Hama Section */}
            <DominasiHamaSection hamaData={hamaData} />
          </div>
          
          <div className="">
            <TeknologiSection teknologiData={teknologiData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomoditasHorticulturaPage;
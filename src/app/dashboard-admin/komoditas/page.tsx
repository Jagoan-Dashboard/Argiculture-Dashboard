"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';
import React from 'react';
import { StatsType } from '../types/stats';
import CardStats from '../components/CardStats';
import { MapSection } from '../components/MapSection';
import { KeyComponent } from './components/KeyComponents';
import { Key } from './types/key';
import { ProductivityChartSection } from './components/ProductivityChartSection';
import { ProductivityData } from './types/productivity';
const KomoditasListPage = () => {
  const statsData: StatsType[] = [
    {
      id: 1,
      title: "Total Produksi",
      value: "895.710",
      unit: "Ton",
      change: "+2.1%",
      isPositive: true,
      icon: "lets-icons:road-fill",
      color: "text-green-600"
    },
    {
      id: 2,
      title: "Total Luas Panen",
      value: "139.044",
      unit: "Hektar (Ha)",
      change: "5.3%",
      isPositive: false,
      icon: "fa6-solid:road-circle-xmark",
      color: "text-green-500"
    },
    {
      id: 3,
      title: "Produktivitas",
      value: "6,440",
      unit: "Ton/Ha",
      change: "+5.1%",
      isPositive: true,
      icon: "mdi:users",
      color: "text-green-600"
    }
  ];

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

  const productivityData: ProductivityData[] = [
    { year: 2018, value: 6.34 },
    { year: 2019, value: 6.57 },
    { year: 2020, value: 6.41 },
    { year: 2021, value: 6.45 },
    { year: 2022, value: 6.50 },
    { year: 2023, value: 6.47 },
    { year: 2024, value: 6.54 },
  ];


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
                <BreadcrumbPage>Komoditas</BreadcrumbPage>
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
                onUpdate={(values) => console.log(values)}
                initialDateFrom="2024-01-01"
                initialDateTo="2024-12-31"
                align="center"
                locale="id-ID"
                showCompare={false}
              />
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Komoditas: Padi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Padi</SelectItem>
                  <SelectItem value="dark">Jagung</SelectItem>
                  <SelectItem value="system">Kedelai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardStats statsData={statsData} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Map Section - key insight */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <MapSection />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyInsight} title="Key Insight" description="Wawasan penting dari data pertanian" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            <div className="lg:col-span-2">
              <ProductivityChartSection productivityData={productivityData} />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyInsight} title="Key Strategy" description="Strategi penting untuk pertanian" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomoditasListPage;

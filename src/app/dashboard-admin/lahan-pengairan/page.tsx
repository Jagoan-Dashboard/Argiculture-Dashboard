"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Home } from 'lucide-react';
import React from 'react';
import CardStats from '../components/CardStats';
import { StatsType } from '../types/stats';
import { MapSection } from '../components/MapSection';
import { KeyComponent } from '../komoditas/components/KeyComponents';
import { Key } from '../komoditas/types/key';
import { DistribusiLahanData } from './types/distribusi-lahan';
import { DistribusiLahanSection } from './components/DistribusiLahanSection';

const LahanPengairanPage = () => {

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


  // Data sesuai dengan desain yang diberikan
  const defaultDistribusiData: DistribusiLahanData[] = [
    { kecamatan: "Paron", sawah: 850, perkebunan: 150, ladang: 200 },
    { kecamatan: "Kedunggalar", sawah: 820, perkebunan: 180, ladang: 150 },
    { kecamatan: "Widodaren", sawah: 750, perkebunan: 250, ladang: 100 },
    { kecamatan: "Geneng", sawah: 680, perkebunan: 320, ladang: 80 },
    { kecamatan: "Ngawi", sawah: 620, perkebunan: 380, ladang: 120 },
    { kecamatan: "Padas", sawah: 580, perkebunan: 420 },
    { kecamatan: "Karangjati", sawah: 550, perkebunan: 450, ladang: 50 },
    { kecamatan: "Kendal", sawah: 520, perkebunan: 480, ladang: 40 },
    { kecamatan: "Mantingan", sawah: 480, perkebunan: 520 },
    { kecamatan: "Ngrambe", sawah: 450, perkebunan: 550, ladang: 30 },
    { kecamatan: "Jogorogo", sawah: 420, perkebunan: 580 },
    { kecamatan: "Kwadungan", sawah: 400, perkebunan: 600, ladang: 20 },
    { kecamatan: "Sine", sawah: 380, perkebunan: 620 },
    { kecamatan: "Gerih", sawah: 350, perkebunan: 650, ladang: 25 },
    { kecamatan: "Pangkur", sawah: 320, perkebunan: 680 },
    { kecamatan: "Bringin", sawah: 300, perkebunan: 700, ladang: 15 },
    { kecamatan: "Kasreman", sawah: 280, perkebunan: 720 },
    { kecamatan: "Pitu", sawah: 250, perkebunan: 750, ladang: 10 },
    { kecamatan: "Karanganyar", sawah: 200, perkebunan: 780, ladang: 35 }
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
                onUpdate={(values) => console.log(values)}
                initialDateFrom="2024-01-01"
                initialDateTo="2024-12-31"
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
              <MapSection />
            </div>
            <div className="lg:col-span-1">
              <KeyComponent data={keyInsight} title="Key Insight" description="Wawasan penting dari data pertanian" />
            </div>
            <div className="lg:col-span-2">
              <DistribusiLahanSection distribusiData={defaultDistribusiData} />
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

export default LahanPengairanPage;

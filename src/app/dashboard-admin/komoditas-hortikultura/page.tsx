"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home } from 'lucide-react';
import { StatsType } from '../komoditas-pangan/types/stats';
import CardStats from '../komoditas-pangan/components/CardStats';
import { GrowthPhaseData } from '../komoditas-pangan/types/proparsi';
import { HamaData } from '../komoditas-pangan/types/dominasi';
import { TeknologiData } from '../komoditas-pangan/types/teknologi';
import { MapSection } from '../komoditas-pangan/components/MapSection';
import { ProporsiSection } from '../komoditas-pangan/components/ProparsiSection';
import { TablePerkiraanSection } from '../komoditas-pangan/components/TablePerkiraanSection';
import { DominasiHamaSection } from '../komoditas-pangan/components/DominasiHamaSection';
import { TeknologiSection } from '../komoditas-pangan/components/TeknologiSection';

const KomoditasHoltikulturaPage = () => {
  const statsData: StatsType[] = [
    {
      id: 1,
      title: "Total Luas Lahan",
      value: "21,9",
      unit: "Hektar (Ha)",
      change: "+2.1%",
      icon: "lets-icons:road-fill",
      color: "text-green-600"
    },
    {
      id: 2,
      title: "Total Estimasi Produksi",
      value: "109,26",
      unit: "Ton",
      change: "5.3%",
      icon: "fa6-solid:road-circle-xmark",
      color: "text-green-500"
    },
    {
      id: 3,
      title: "Luas Terdampak Hama/Penyakit",
      value: "1,48",
      unit: "Hektar (Ha)",
      change: "+5.1%",
      icon: "mdi:users",
      color: "text-green-600"
    },
    {
      id: 4,
      title: "Jumlah Laporan Hama",
      value: "21",
      unit: "Laporan",
      change: "+5.1%",
      icon: "mdi:users",
      color: "text-green-600"
    }
  ];

  const proparsiData: GrowthPhaseData[] = [
    {
      name: "Fase Persiapan & Awal Pertumbuhan",
      value: 38.5,
      percentage: 38.5,
      color: "#EC4899",
      fullName: "Fase Persiapan & Awal Pertumbuhan"
    },
    {
      name: "Fase Generatif",
      value: 38.5,
      percentage: 38.5,
      color: "#22C55E",
      fullName: "Fase Generatif"
    },
    {
      name: "Fase Vegetatif",
      value: 15.4,
      percentage: 15.4,
      color: "#FB923C",
      fullName: "Fase Vegetatif"
    },
    {
      name: "Fase Panen",
      value: 7.7,
      percentage: 7.7,
      color: "#FBBF24",
      fullName: "Fase Panen"
    }
  ];

  const hamaData: HamaData[] = [

    {
      name: "Tidak ada",
      value: 38.5,
      percentage: 38.5,
      color: "#22C55E",
      fullName: "Tidak ada"
    },
    {
      name: "lainnya",
      value: 15.4,
      percentage: 15.4,
      color: "#FB923C",
      fullName: "lainnya"
    },
    {
      name: "Tikus",
      value: 7.7,
      percentage: 7.7,
      color: "#FBBF24",
      fullName: "Tikus"
    }
  ];

  const teknologiData: TeknologiData[] = [
    { name: "Irigasi Pompa", value: 6, fullName: "Irigasi Pompa" },
    { name: "Jajar legowo", value: 11, fullName: "Jajar legowo" },
    { name: "Irigasi/tetes sprinkler", value: 7, fullName: "Irigasi/tetes sprinkler" },
    { name: "Mulsa plastik", value: 7, fullName: "Mulsa plastik" },
    { name: "Tidak ada", value: 9, fullName: "Tidak ada" },
    { name: "Greenhouse", value: 7, fullName: "Greenhouse" },
    { name: "Pupuk organik", value: 10, fullName: "Pupuk organik" },
    { name: "Sensor/IoT", value: 10, fullName: "Sensor/IoT" },
  ];

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
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Komoditas: Wortel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Wortel</SelectItem>
                  <SelectItem value="dark">Tomat</SelectItem>
                  <SelectItem value="system">Sawi</SelectItem>
                  <SelectItem value="system">Kol</SelectItem>
                  <SelectItem value="system">kentang </SelectItem>
                  <SelectItem value="system">Bawang Merah</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardStats statsData={statsData} />
          </div>

          {/*  */}
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <MapSection />

            {/* Proporsi Fase Pertumbuhan Section */}
            <ProporsiSection growthPhaseData={proparsiData} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className=" lg:col-span-2">
              <TablePerkiraanSection />
            </div>
            <DominasiHamaSection hamaData={hamaData} />

            {/* Proporsi Fase Pertumbuhan Section */}

          </div>
          <div className="">
            <TeknologiSection teknologiData={teknologiData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KomoditasHoltikulturaPage;

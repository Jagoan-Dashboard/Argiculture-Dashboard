"use client"
import React, { useState } from 'react'
import { UniversalTable } from '@/components/Table/TableComponent' // Sesuaikan path import
import { Icon } from '@iconify/react'
import { Calendar } from 'lucide-react'
import { KomoditasData, TablePerkiraanSectionProps } from '../types/table-perkiraan'

// Mock data untuk contoh
const defaultData: KomoditasData[] = [
  {
    id: '1',
    no: 1,
    komoditas: 'Padi Sawah',
    estimasiPanen: '15 Januari 2025',
  },
  {
    id: '2',
    no: 2,
    komoditas: 'Jagung',
    estimasiPanen: '20 Januari 2025',

  },
  {
    id: '3',
    no: 3,
    komoditas: 'Kedelai',
    estimasiPanen: '25 Januari 2025',
  },
  {
    id: '4',
    no: 4,
    komoditas: 'Ubi Jalar',
    estimasiPanen: '30 Januari 2025',
  },
  {
    id: '5',
    no: 5,
    komoditas: 'Kacang Tanah',
    estimasiPanen: '5 Februari 2025',
  }, {
    id: '6',
    no: 6,
    komoditas: 'Padi Sawah',
    estimasiPanen: '15 Januari 2025',
  },
  {
    id: '7',
    no: 7,
    komoditas: 'Jagung',
    estimasiPanen: '20 Januari 2025',

  },
  {
    id: '8',
    no: 8,
    komoditas: 'Kedelai',
    estimasiPanen: '25 Januari 2025',
  },
  {
    id: '9',
    no: 9,
    komoditas: 'Ubi Jalar',
    estimasiPanen: '30 Januari 2025',
  },
  {
    id: '10',
    no: 10,
    komoditas: 'Kacang Tanah',
    estimasiPanen: '5 Februari 2025',
  }, {
    id: '11',
    no: 11,
    komoditas: 'Padi Sawah',
    estimasiPanen: '15 Januari 2025',
  },
  {
    id: '12',
    no: 12,
    komoditas: 'Jagung',
    estimasiPanen: '20 Januari 2025',

  },
  {
    id: '13',
    no: 13,
    komoditas: 'Kedelai',
    estimasiPanen: '25 Januari 2025',
  },
  {
    id: '14',
    no: 14,
    komoditas: 'Ubi Jalar',
    estimasiPanen: '30 Januari 2025',
  },
  {
    id: '15',
    no: 15,
    komoditas: 'Kacang Tanah',
    estimasiPanen: '5 Februari 2025',
  }, {
    id: '16',
    no: 16,
    komoditas: 'Padi Sawah',
    estimasiPanen: '15 Januari 2025',
  },
  {
    id: '17',
    no: 17,
    komoditas: 'Jagung',
    estimasiPanen: '20 Januari 2025',

  },
  {
    id: '18',
    no: 18,
    komoditas: 'Kedelai',
    estimasiPanen: '25 Januari 2025',
  },
  {
    id: '19',
    no: 19,
    komoditas: 'Ubi Jalar',
    estimasiPanen: '30 Januari 2025',
  },
  {
    id: '20',
    no: 20,
    komoditas: 'Kacang Tanah',
    estimasiPanen: '5 Februari 2025',
  }, {
    id: '21',
    no: 21,
    komoditas: 'Padi Sawah',
    estimasiPanen: '15 Januari 2025',
  },
  {
    id: '22',
    no: 22,
    komoditas: 'Jagung',
    estimasiPanen: '20 Januari 2025',

  },
  {
    id: '23',
    no: 23,
    komoditas: 'Kedelai',
    estimasiPanen: '25 Januari 2025',
  },
  {
    id: '24',
    no: 24,
    komoditas: 'Ubi Jalar',
    estimasiPanen: '30 Januari 2025',
  },
  {
    id: '25',
    no: 25,
    komoditas: 'Kacang Tanah',
    estimasiPanen: '5 Februari 2025',
  }
];


export const TablePerkiraanSection = ({
  data = defaultData,
  loading = false,
  searchable = true,
  pagination = true
}: TablePerkiraanSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data berdasarkan search dan filter
  const filteredData = data.filter(item => {
    const matchesSearch = !searchQuery ||
      item.komoditas.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch;
  });

  // Pagination data
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination
    ? filteredData.slice(startIndex, startIndex + pageSize)
    : filteredData;

  const columns = [
    {
      key: 'no',
      label: 'No',
      className: 'w-16 text-center font-medium',
      headerClassName: 'text-center',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any) => <span className="font-medium">{value}</span>
    },
    {
      key: 'komoditas',
      label: 'Komoditas',
      sortable: true,
      className: 'font-medium',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'estimasiPanen',
      label: 'Estimasi Panen',
      sortable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-gray-700">{value}</span>
        </div>
      )
    },
  ];




  return (
    <div className="bg-white rounded-2xl  shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-xl">
            <Icon icon="material-symbols:table-chart" className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Perkiraan Jadwal Panen</h2>
            <p className="text-sm text-gray-600">Estimasi waktu panen untuk setiap komoditas</p>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-6">
        <UniversalTable
          scrollable={true}
          scrollHeight={290}  // Tinggi maksimum 500px
          data={paginatedData}
          columns={columns}
          loading={loading}
          searchable={searchable}
          searchPlaceholder="Cari komoditas atau lokasi..."
          onSearch={setSearchQuery}
          pagination={pagination ? {
            page: currentPage,
            pageSize: pageSize,
            total: totalItems,
            pageSizeOptions: [5, 10, 20, 50]
          } : undefined}
          onPaginationChange={pagination ? (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          } : undefined}
          emptyStateMessage="Tidak ada data perkiraan panen"
          emptyStateIcon={
            <Icon icon="material-symbols:agriculture-outline" className="w-12 h-12 text-gray-400" />
          }
          className="mt-0"
        />
      </div>

    </div>
  );
};

export type { KomoditasData, TablePerkiraanSectionProps };
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import { UniversalTable } from '@/components/Table/TableComponent'
import { Icon } from '@iconify/react'
import { Calendar } from 'lucide-react'
import { KomoditasData, TablePerkiraanSectionProps } from '../types/table-perkiraan'
import { createCommodityLabelGetter } from '@/lib/color-mapping-helper'
import { COMMODITY } from '@/constant/commodity'

export const TablePerkiraanSection = ({
  data,
  loading = false,
  searchable = true,
  pagination = true
}: TablePerkiraanSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');


  const filteredData = data?.filter(item => {
    const matchesSearch = !searchQuery ||
      item.komoditas.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch;
  });


  const totalItems = filteredData?.length || 0;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination
    ? filteredData?.slice(startIndex, startIndex + pageSize)
    : filteredData;

  const columns = [
    {
      key: 'no',
      label: 'No',
      className: 'w-16 text-center font-medium',
      headerClassName: 'text-center',

      render: (value: any) => <span className="font-medium">{value}</span>
    },
    {
      key: 'komoditas',
      label: 'Komoditas',
      sortable: true,
      className: 'font-medium',

      render: (value: any) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{createCommodityLabelGetter(COMMODITY)(value)}</span>
        </div>
      )
    },
    {
      key: 'estimasiPanen',
      label: 'Estimasi Panen',
      sortable: true,

      render: (value: any) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-gray-700">{value}</span>
        </div>
      )
    },
    {
      key: 'petani',
      label: 'Petani',
      sortable: true,

      render: (value: any) => (
        <span className="text-gray-700">{value || '-'}</span>
      )
    },
    {
      key: 'desa',
      label: 'Desa',
      sortable: true,

      render: (value: any) => (
        <span className="text-gray-700">{value || '-'}</span>
      )
    },
    {
      key: 'luasLahan',
      label: 'Luas Lahan (Ha)',
      sortable: true,

      render: (value: any) => (
        <span className="text-gray-700">{value || '-'}</span>
      )
    },
  ];




  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
          data={paginatedData || []}
          columns={columns}
          loading={loading}
          searchable={searchable}
          searchPlaceholder="Cari komoditas atau lokasi..."
          onSearch={setSearchQuery}
          pagination={(pagination && totalItems > pageSize) ? {
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
          className="mt-0 h-full min-h-[20rem]"
        />
      </div>

    </div>
  );
};

export type { KomoditasData, TablePerkiraanSectionProps };
import React from 'react'
import { JumlahPompaData, JumlahPompaSectionProps } from '../types/pompa';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { Icon } from '@iconify/react';
import { TooltipData } from '@/types/tooltip';
import { CostumeLabelProps } from '@/types/costume-label';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipData) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">Tahun {label}</p>
        <p className="text-green-600">
          <span className="font-semibold">{payload[0].value.toFixed(2)}</span> Ton/Ha
        </p>
      </div>
    );
  }
  return null;
};
// Custom bar colors - highlight the highest value
// Custom bar colors - highlight the highest value
const getBarColor = (value: number, maxValue: number) => {
  if (value === maxValue) {
    return '#22C55E'; // Darker green for highest value (2019)
  }
  return '#86EFAC'; // Lighter green for other values
};

// Custom label component untuk menampilkan nilai di atas bar
const CustomLabel = (props: unknown) => {
  const { x, y, width, value } = props as CostumeLabelProps 
  return (
    <text
      x={x + width / 2}
      y={y - 5}
      fill="#22C55E"
      textAnchor="middle"
      fontSize="12"
      fontWeight="500"
    >
      {value.toFixed(2)}
    </text>
  );
};

export const JumlahPompaSection = ({ jumlahPompaData = [] }: JumlahPompaSectionProps) => {
  // Handle empty or undefined data
  if (!jumlahPompaData || jumlahPompaData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 text-center">Tidak ada data pompa air tersedia</p>
        </div>
      </div>
    );
  }

  // Filter data untuk hanya menampilkan yang memiliki nilai
  const filteredData = jumlahPompaData.filter(item => item.value > 0);
  
  // Jika setelah filter tidak ada data
  if (filteredData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500 text-center">Tidak ada data pompa air untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  // Calculate max value untuk coloring
  const values = filteredData.map((item: JumlahPompaData) => item.value);
  const maxValue = Math.max(...values);

  // Dynamic Y-axis domain based on actual data
  const minValue = Math.min(...values);
  const yAxisDomain = [
    Math.floor(minValue * 0.9), // 10% below minimum
    Math.ceil(maxValue * 1.1)   // 10% above maximum
  ];

  return (
    <div className="bg-white rounded-2xl min-h-[10rem] max-h-[32rem] h-full shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl">
            <Icon icon="material-symbols:trending-up" className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Jumlah Pompa Air tiap Tahun</h2>
            <p className="text-sm text-gray-600">Tren jumlah pompa air per tahun</p>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <div className="h-96 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
              barCategoryGap="25%"
            >
              <CartesianGrid
                strokeDasharray="2 2"
                stroke="#E5E7EB"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="year"
                tick={{
                  fontSize: 12,
                  fill: '#6B7280',
                  fontWeight: '500'
                }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                interval={0}
              />
              <YAxis
                domain={yAxisDomain}
                tick={{
                  fontSize: 11,
                  fill: '#6B7280',
                  fontWeight: '400'
                }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickCount={6}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                maxBarSize={80}
                label={<CustomLabel />}
              >
                {filteredData?.map((entry: JumlahPompaData, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.value, maxValue)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

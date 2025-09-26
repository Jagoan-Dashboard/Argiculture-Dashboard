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
        <p className="text-gray-500 text-center">No productivity data available</p>
      </div>
    );
  }

  // Safely calculate max, min, and average values
  const values = jumlahPompaData.map((item: JumlahPompaData) => item.value);
  const maxValue = Math.max(...values);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
              data={jumlahPompaData}
              margin={{
                top: 0,
                right: 0,
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
                domain={[6.2, 6.7]}
                tick={{
                  fontSize: 11,
                  fill: '#6B7280',
                  fontWeight: '400'
                }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickCount={6}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                maxBarSize={80}
                label={<CustomLabel />}
              >
                {jumlahPompaData?.map((entry: JumlahPompaData, index: number) => (
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

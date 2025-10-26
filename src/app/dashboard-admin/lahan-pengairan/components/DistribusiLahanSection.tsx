import { Icon } from '@iconify/react'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { DistribusiLahanSectionProps } from '../types/distribusi-lahan'

// Data sesuai dengan desain yang diberikan


// Custom tooltip

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; color: string; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    const totalLahan = payload.reduce((sum: number, entry: { value: number; color: string; dataKey: string }) => sum + entry.value, 0);

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">Kecamatan {label}</p>
        {payload.map((entry: { value: number; color: string; dataKey: string }, index: number) => (
          <p key={index} className="text-sm">
            <span className="inline-block w-3 h-3 rounded mr-2" style={{ backgroundColor: entry.color }} />
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.dataKey === 'sawah' ? 'Lahan Sawah' :
                entry.dataKey === 'perkebunan' ? 'Perkebunan/Tegal' : 'Ladang/Hutan'}: {entry.value.toFixed(2)} Ha
            </span>
          </p>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <p className="text-sm font-medium">Total: {totalLahan.toFixed(2)} Ha</p>
        </div>
      </div>
    );
  }
  return null;
};

export const DistribusiLahanSection = ({ distribusiData }: DistribusiLahanSectionProps) => {
  // console.log('distribusiData', distribusiData)

  return (
    <div className="bg-white rounded-2xl min-h-[10rem] max-h-[32rem] h-full shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl">
            <Icon icon="material-symbols:landscape" className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Distribusi Lahan per Kecamatan
            </h2>
          </div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">
        <div className="h-96 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={distribusiData}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="10%"
            >
              <CartesianGrid
                strokeDasharray="2 2"
                stroke="#E5E7EB"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="kecamatan"
                tick={{
                  fontSize: 10,
                  fill: '#6B7280',
                  textAnchor: 'end'
                }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Bar untuk lahan sawah (hijau) */}
              <Bar
                dataKey="sawah"
                stackId="lahan"
                fill="#22C55E"
                radius={[0, 0, 0, 0]}
                name="Lahan Sawah"
              />

              {/* Bar untuk lahan perkebunan/tegal (orange) */}
              <Bar
                dataKey="perkebunan"
                stackId="lahan"
                fill="#F0417E"
                radius={[0, 0, 0, 0]}
                name="Perkebunan/Tegal"
              />

              {/* Bar untuk lahan ladang/hutan (kuning) - opsional */}
              <Bar
                dataKey="ladang"
                stackId="lahan"
                fill="#F59E0B"
                radius={[2, 2, 0, 0]}
                name="Ladang/Hutan"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
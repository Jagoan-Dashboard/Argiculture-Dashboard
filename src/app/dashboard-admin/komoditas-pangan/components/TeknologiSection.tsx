import { Icon } from '@iconify/react'
import React from 'react'
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts'
import { TeknologiSectionProps } from '../types/teknologi';
import { createCommodityLabelGetter } from '@/lib/color-mapping-helper';
import { TECHNOLOGY_MAP } from '@/constant/technology';


const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{createCommodityLabelGetter(TECHNOLOGY_MAP)(label ?? '')}</p>
        <p className="text-green-600">
          <span className="font-semibold">{payload[0].value}</span> komoditas
        </p>
      </div>
    );
  }
  return null;
};


const getBarColor = (value: number, maxValue: number) => {
  if (value === maxValue) {
    return '#33AD5C'; 
  }
  return '#99D6AD'; 
};

export const TeknologiSection = ({ teknologiData }: TeknologiSectionProps) => {
  const maxValue = Math.max(...teknologiData?.map(item => item.value) || []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className=" p-6 ">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl">
            <Icon icon="material-symbols:bar-chart" className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Teknologi/Metode yang Digunakan</h2>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <div className="h-80 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={teknologiData}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 40,
              }}
              barCategoryGap="20%"
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#E5E7EB" 
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ 
                  fontSize: 11, 
                  fill: '#6B7280',
                  textAnchor: 'end'
                }}
                tickLine={{ stroke: '#E5E7EB' }}
                axisLine={{ stroke: '#E5E7EB' }}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis
                domain={[0, 12]}
                tick={{ fontSize: 11, fill: '#6B7280', textAnchor: 'end' }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickCount={7}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              >
                {teknologiData?.map((entry, index) => (
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

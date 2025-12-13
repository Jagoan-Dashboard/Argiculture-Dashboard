/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@iconify/react'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, PieLabelRenderProps } from 'recharts'
import { GrowthPhaseData, ProporsiSectionProps } from '../types/proparsi'



const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: GrowthPhaseData }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-1">{data.fullName}</p>
        <p className="text-sm">
          <span className="font-semibold" style={{ color: data.color }}>
            {data.percentage}%
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const formatTitle = (text: string): string => {
  return text
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};



export const ProporsiSection = ({ growthPhaseData }: ProporsiSectionProps) => {


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl">
            <Icon icon="material-symbols:pie-chart" className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Proporsi Fase Pertumbuhan
            </h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid gap-8 items-center">
          {/* Pie Chart */}
          <div className="h-[20rem] flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={growthPhaseData as any}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: PieLabelRenderProps) => {
                    const percent = typeof props.percent === 'number' ? props.percent : 0;
                    return `${(percent * 100).toFixed(1)}%`;
                  }}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {growthPhaseData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  formatter={(value, entry) => (
                    <span className="text-sm text-gray-700 leading-relaxed" style={{ color: entry.color }}>{formatTitle(value)}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  )
}

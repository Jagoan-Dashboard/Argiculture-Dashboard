import { Icon } from '@iconify/react'
import React from 'react'
import { AspirationItem, AspirationsData } from '../types/aspiration';



const ProgressBar = ({ percentage, color }: { percentage: number; color: 'green' | 'pink' }) => {
  const colorClasses = {
    green: 'bg-green-500',
    pink: 'bg-pink-500'
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-300 ${colorClasses[color]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const AspirationCard = ({ item }: { item: AspirationItem }) => {
  const valueColorClasses = {
    green: 'text-green-500',
    pink: 'text-pink-500'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`text-2xl font-bold ${valueColorClasses[item.color]}`}>
            {item.value}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.percentage}% laporan</p>
          </div>
        </div>
      </div>
      <ProgressBar percentage={item.percentage} color={item.color} />
    </div>
  );
};

export const AspirationsSection = ({ data }: { data: AspirationsData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 ">
        <div className="flex items-center gap-3">
          <div className="bg-green-50 p-2 rounded-xl">
            <Icon icon="material-symbols:data-alert-rounded" className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Aspirasi & Kebutuhan Petani</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {data.categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            {/* Category Title */}
            <div className="flex items-center gap-2">
              <div className={`w-1 h-6 rounded-full ${
                category.color === 'green' ? 'bg-green-500' : 'bg-pink-500'
              }`} />
              <h3 className={`font-semibold text-lg ${
                category.color === 'green' ? 'text-green-600' : 'text-pink-600'
              }`}>
                {category.title}
              </h3>
            </div>

            {/* Category Items */}
            <div className="grid gap-4 sm:grid-cols-1 ">
              {category.items.map((item) => (
                <AspirationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

// Export dengan interface untuk penggunaan
export type { AspirationItem, AspirationsData };
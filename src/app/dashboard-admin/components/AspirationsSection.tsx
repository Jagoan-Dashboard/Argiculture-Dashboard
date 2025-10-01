import { Icon } from '@iconify/react';
import { AspirationCard } from './AspirationCard';
import { AspirationsData } from '../types/aspiration';

export const AspirationsSection = ({ data }: { data: AspirationsData }) => {
  // Handle empty data
  if (!data.categories || data.categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl min-h-[32rem] max-h-full h-full shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-50 p-2 rounded-xl">
              <Icon icon="material-symbols:data-alert-rounded" className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Aspirasi & Kebutuhan Petani</h2>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-center">Tidak ada data aspirasi tersedia</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl min-h-[32rem] h-full max-h-full shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6">
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
            <div className="grid gap-4 sm:grid-cols-1">
              {category.items.map((item) => (
                <AspirationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
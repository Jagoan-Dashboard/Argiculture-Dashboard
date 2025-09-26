import { Icon } from '@iconify/react'
import React from 'react'
import { Key } from '../types/key';




const InsightCard = ({ insight }: { insight: Key }) => {
  return (
    <div className={`${insight.bgColor || 'bg-green-50'} rounded-2xl p-5 hover:shadow-md transition-all duration-200 border border-green-100`}>
      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div className="bg-green-600 rounded-full p-3 flex-shrink-0">
          <Icon
            icon="material-symbols:attach-money"
            className="w-6 h-6 text-white"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 leading-tight">
            {insight.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {insight.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const KeyComponent = ({ data, title, description }: { data: Key[], title: string, description: string }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full min-h-[10rem] max-h-[32rem] border border-gray-100 flex flex-col">
      {/* Header */}
      <div className=" p-6 border-b ">
        <div className="flex items-center gap-3">
          <Icon icon="material-symbols:bolt" className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {title}
            </h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto flex-1">
        <div className="space-y-4">
          {data?.map((insight: Key) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

    </div>
  )
}
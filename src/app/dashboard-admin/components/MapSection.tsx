'use client';
import { Icon } from '@iconify/react';
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load map components with loading state
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Memuat peta...</p>
        </div>
      </div>
    )
  }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const CircleMarker = dynamic(
  () => import('react-leaflet').then((mod) => mod.CircleMarker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface CommodityMapData {
  latitude: number;
  longitude: number;
  village: string;
  district: string;
  commodity: string;
  commodity_type: string;
  land_area: number;
}

interface MapSectionProps {
  commodityMapData?: CommodityMapData[];
}

export const MapSection: React.FC<MapSectionProps> = ({ commodityMapData = [] }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Calculate center, group coordinates, and get commodity summary
  const { mapCenter, groupedData, commoditySummary } = useMemo(() => {
    if (commodityMapData.length === 0) {
      return { 
        mapCenter: [-7.4098, 111.4461] as [number, number],
        groupedData: [],
        commoditySummary: []
      };
    }
    
    // Group by lat/lng to combine duplicate locations
    const grouped = commodityMapData.reduce((acc, item) => {
      const key = `${item.latitude},${item.longitude}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 1,
          totalArea: item.land_area
        };
      } else {
        acc[key].count += 1;
        acc[key].totalArea += item.land_area;
      }
      return acc;
    }, {} as Record<string, CommodityMapData & { count: number; totalArea: number }>);

    // Count by commodity type
    const summary = commodityMapData.reduce((acc, item) => {
      const type = item.commodity_type;
      if (!acc[type]) {
        acc[type] = { type, count: 0, totalArea: 0 };
      }
      acc[type].count += 1;
      acc[type].totalArea += item.land_area;
      return acc;
    }, {} as Record<string, { type: string; count: number; totalArea: number }>);

    const avgLat = commodityMapData.reduce((sum, item) => sum + item.latitude, 0) / commodityMapData.length;
    const avgLng = commodityMapData.reduce((sum, item) => sum + item.longitude, 0) / commodityMapData.length;
    
    return {
      mapCenter: [avgLat, avgLng] as [number, number],
      groupedData: Object.values(grouped),
      commoditySummary: Object.values(summary)
    };
  }, [commodityMapData]);

  const getMarkerColor = (commodityType: string) => {
    // Normalize to uppercase for consistency
    const type = commodityType?.toUpperCase();
    
    switch (type) {
      case 'PLANTATION':
        return '#22c55e'; // green-500
      case 'FOOD':
      case 'FOOD_CROPS':
      case 'FOOD CROPS':
      case 'PANGAN':
        return '#eab308'; // yellow-500
      case 'HORTICULTURE':
      case 'HORTIKULTURA':
        return '#f97316'; // orange-500
      default:
        console.log('⚠️ Unknown commodity type:', commodityType); // Debug
        return '#6b7280'; // gray-500
    }
  };

  const getCommodityTypeLabel = (type: string) => {
    const normalized = type?.toUpperCase();
    
    switch (normalized) {
      case 'PLANTATION':
        return 'Perkebunan';
      case 'FOOD':
      case 'FOOD_CROPS':
      case 'FOOD CROPS':
      case 'PANGAN':
        return 'Tanaman Pangan';
      case 'HORTICULTURE':
      case 'HORTIKULTURA':
        return 'Hortikultura';
      default:
        return type;
    }
  };

  const getCommodityTypeColor = (type: string) => {
    const normalized = type?.toUpperCase();
    
    switch (normalized) {
      case 'PLANTATION':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'FOOD':
      case 'FOOD_CROPS':
      case 'FOOD CROPS':
      case 'PANGAN':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'HORTICULTURE':
      case 'HORTIKULTURA':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  // Show loading if no data yet
  if (commodityMapData.length === 0) {
    return (
      <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Peta Persebaran Komoditas Pertanian
          </h2>
        </div>
        
        <div className="h-64 lg:h-80 rounded-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data komoditas untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Peta Persebaran Komoditas Pertanian
        </h2>
      </div>

      {/* Real Map */}
      <div className="relative mb-4 h-64 lg:h-80 rounded-lg overflow-hidden border border-gray-200">
        {typeof window !== 'undefined' && (
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            whenReady={() => setMapLoaded(true)}
            scrollWheelZoom={false}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={19}
            />
            
            {mapLoaded && groupedData.map((item, index) => (
              <CircleMarker
                key={index}
                center={[item.latitude, item.longitude]}
                radius={item.count > 1 ? 12 : 8}
                fillColor={getMarkerColor(item.commodity_type)}
                color="#fff"
                weight={item.count > 1 ? 3 : 2}
                opacity={1}
                fillOpacity={0.8}
              >
                <Popup maxWidth={250}>
                  <div className="text-sm p-1">
                    <p className="font-semibold text-base mb-2 text-green-700">{item.commodity}</p>
                    <div className="space-y-1 text-gray-700">
                      <p>📍 <span className="font-medium">Desa:</span> {item.village}</p>
                      <p>🏘️ <span className="font-medium">Kecamatan:</span> {item.district}</p>
                      <p>🌾 <span className="font-medium">Total Luas:</span> {item.totalArea.toLocaleString('id-ID')} Ha</p>
                      {item.count > 1 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-green-600 font-semibold text-base">
                            📊 {item.count} lokasi lahan di titik ini
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Rata-rata: {(item.totalArea / item.count).toLocaleString('id-ID', {maximumFractionDigits: 1})} Ha per lokasi
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
                {/* Badge untuk multiple locations */}
                {item.count > 1 && typeof window !== 'undefined' && (
                  <Popup>
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                      {item.count}
                    </div>
                  </Popup>
                )}
              </CircleMarker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Legend & Info */}
      <div className="space-y-4">
        {/* Commodity Type Summary */}
        {commoditySummary.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Ringkasan Komoditas</h3>
            <div className="flex flex-wrap gap-2">
              {commoditySummary.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCommodityTypeColor(item.type)}`}
                >
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: getMarkerColor(item.type) }}
                  ></div>
                  <div className="text-sm">
                    <span className="font-semibold">{getCommodityTypeLabel(item.type)}</span>
                    <span className="mx-1.5">•</span>
                    <span className="font-medium">{item.count}</span>
                    <span className="text-xs ml-1">
                      ({item.totalArea.toLocaleString('id-ID')} Ha)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traditional Legend */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Keterangan Warna</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600">Perkebunan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600">Tanaman Pangan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm"></div>
                <span className="text-sm text-gray-600">Hortikultura</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
            <span className="font-medium text-gray-900">{groupedData.length}</span> titik lokasi
          </div>
        </div>
      </div>
    </div>
  );
};
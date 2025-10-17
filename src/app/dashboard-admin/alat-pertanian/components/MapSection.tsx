'use client';
import { Icon } from '@iconify/react';
import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

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

interface EquipmentMapData {
  latitude: number;
  longitude: number;
  village: string;
  district: string;
  farmer_name: string;
  technology_type: string;
  commodity: string;
  visit_date: string;
}

interface CommodityMapData {
  latitude: number;
  longitude: number;
  village: string;
  district: string;
  commodity: string;
  commodity_type: string;
  land_area: number;
  estimated_production?: number;
  farmer_name?: string;
}

interface MapSectionProps {
  equipmentMapData?: EquipmentMapData[];
}

export const MapSection: React.FC<MapSectionProps> = ({ equipmentMapData = [] }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Calculate center, group coordinates by commodity, and get commodity summary
  const { mapCenter, groupedData, commoditySummary, minArea, maxArea } = useMemo(() => {
    if (equipmentMapData.length === 0) {
      return {
        mapCenter: [-7.4098, 111.4461] as [number, number],
        groupedData: [],
        commoditySummary: [],
        minArea: 0,
        maxArea: 1
      };
    }

    // Group by lat/lng to combine duplicate locations and by commodity
    const grouped = equipmentMapData.reduce((acc, item) => {
      // Create a unique key using lat, lng, and commodity
      const key = `${item.latitude.toFixed(5)},${item.longitude.toFixed(5)},${item.commodity}`;
      
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 1,
          land_area: 1 // Represent each equipment as 1 ha for visualization
        };
      } else {
        acc[key].count += 1;
        acc[key].land_area += 1; // Increment land area
      }
      return acc;
    }, {} as Record<string, EquipmentMapData & { count: number; land_area: number }>);

    // Count by commodity type
    const summary = equipmentMapData.reduce((acc, item) => {
      const commodity = item.commodity;
      if (!acc[commodity]) {
        acc[commodity] = { commodity, count: 0, totalArea: 0 };
      }
      acc[commodity].count += 1;
      acc[commodity].totalArea += 1; // Each equipment represents 1 unit
      return acc;
    }, {} as Record<string, { commodity: string; count: number; totalArea: number }>);

    const avgLat = equipmentMapData.reduce((sum, item) => sum + item.latitude, 0) / equipmentMapData.length;
    const avgLng = equipmentMapData.reduce((sum, item) => sum + item.longitude, 0) / equipmentMapData.length;

    const allAreas = Object.values(grouped).map(item => item.land_area);
    const minArea = Math.min(...allAreas);
    const maxArea = Math.max(...allAreas);

    return {
      mapCenter: [avgLat, avgLng] as [number, number],
      groupedData: Object.values(grouped),
      commoditySummary: Object.values(summary),
      minArea,
      maxArea
    };
  }, [equipmentMapData]);

  // Function to calculate radius based on area
  const getRadius = (area: number): number => {
    if (minArea === maxArea) return 8;

    // If area = 0, still provide minimum radius
    if (area <= 0) return 6;

    const normalized = (area - minArea) / (maxArea - minArea);
    const minRadius = 6;
    const maxRadius = 20;
    return Math.max(minRadius, minRadius + normalized * (maxRadius - minRadius));
  };

  // Get marker color based on commodity
  const getMarkerColor = (commodity: string) => {
    // Normalize to uppercase for consistency
    const comp = commodity?.toUpperCase();

    switch (comp) {
      case 'PADI_SAWAH':
      case 'PADI':
        return '#eab308'; // yellow-500
      case 'JAGUNG':
        return '#f97316'; // orange-500
      case 'KEDELAI':
        return '#a3a3a3'; // gray-500
      case 'SAYURAN':
      case 'SAYUR':
        return '#22c55e'; // green-500
      case 'BUAH':
      case 'BUAH-BUAHAN':
        return '#f43f5e'; // red-500
      default:
        return '#6b7280'; // gray-500
    }
  };

  const getCommodityLabel = (commodity: string) => {
    const compMap: Record<string, string> = {
      'PADI_SAWAH': 'Padi Sawah',
      'PADI': 'Padi',
      'JAGUNG': 'Jagung',
      'KEDELAI': 'Kedelai',
      'SAYURAN': 'Sayuran',
      'SAYUR': 'Sayur',
      'BUAH': 'Buah-buahan',
      'BUAH-BUAHAN': 'Buah-buahan',
    };
    return compMap[commodity] || commodity;
  };

  const getCommodityTypeLabel = (commodity: string) => {
    const normalized = commodity?.toUpperCase();

    switch (normalized) {
      case 'PADI_SAWAH':
      case 'PADI':
      case 'JAGUNG':
      case 'KEDELAI':
        return 'Tanaman Pangan';
      case 'SAYURAN':
      case 'SAYUR':
        return 'Hortikultura';
      case 'BUAH':
      case 'BUAH-BUAHAN':
        return 'Hortikultura';
      default:
        return 'Lainnya';
    }
  };

  const getCommodityTypeColor = (commodity: string) => {
    const type = getCommodityTypeLabel(commodity);
    const normalized = type?.toUpperCase();

    switch (normalized) {
      case 'TANAMAN PANGAN':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'HORTIKULTURA':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (equipmentMapData.length === 0) {
    return (
      <div className="bg-white col-span-2 p-6 rounded-xl min-h-[32rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Peta Persebaran Alat Pertanian Tiap Kecamatan
          </h2>
        </div>

        <div className="min-h-[27rem] rounded-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500 h-full">Tidak ada data alat pertanian untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Peta Persebaran Alat Pertanian Tiap Kecamatan
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
                key={`${item.latitude.toFixed(5)}-${item.longitude.toFixed(5)}-${item.commodity}`}
                center={[item.latitude, item.longitude]}
                radius={getRadius(item.land_area)} // Use dynamic radius based on area
                fillColor={getMarkerColor(item.commodity)}
                color="#fff"
                weight={2}
                opacity={1}
                fillOpacity={0.8}
                eventHandlers={{
                  click: (e) => {
                    e.target.openPopup();
                  },
                }}
              >
                <Popup maxWidth={250}>
                  <div className="text-sm p-1">
                    <p className="font-semibold text-base mb-2 text-green-700">{getCommodityLabel(item.commodity)}</p>
                    <div className="space-y-1 text-gray-700">
                      <p>📍 <span className="font-medium">Desa:</span> {item.village}</p>
                      <p>🏘️ <span className="font-medium">Kecamatan:</span> {item.district}</p>
                      <p>👨‍🌾 <span className="font-medium">Petani:</span> {item.farmer_name}</p>
                      <p>🌾 <span className="font-medium">Jenis:</span> {getCommodityTypeLabel(item.commodity)}</p>
                      <p>🛠️ <span className="font-medium">Jumlah Alat:</span> {item.count}</p>
                      {item.count > 1 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-green-600 font-semibold text-base">
                            📊 {item.count} alat pertanian digunakan
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Legend & Info */}
      <div className="space-y-4">
        {/* Commodity Summary */}
        {commoditySummary.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Ringkasan Berdasarkan Komoditas</h3>
            <div className="flex flex-wrap gap-2">
              {commoditySummary.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getCommodityTypeColor(item.commodity)}`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getMarkerColor(item.commodity) }}
                  ></div>
                  <div className="text-sm">
                    <span className="font-semibold">{getCommodityLabel(item.commodity)}</span>
                    <span className="mx-1.5">•</span>
                    <span className="font-medium">{item.count}</span>
                    <span className="text-xs ml-1">
                      ({item.totalArea} alat)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
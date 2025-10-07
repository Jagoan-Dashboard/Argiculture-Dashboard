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

interface MapSectionProps {
  equipmentMapData?: EquipmentMapData[];
}

export const MapSection: React.FC<MapSectionProps> = ({ equipmentMapData = [] }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const { mapCenter, groupedData, technologySummary } = useMemo(() => {
    if (equipmentMapData.length === 0) {
      return { 
        mapCenter: [-7.4098, 111.4461] as [number, number],
        groupedData: [],
        technologySummary: []
      };
    }
    
    // Group by lat/lng
    const grouped = equipmentMapData.reduce((acc, item) => {
      const key = `${item.latitude},${item.longitude}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 1,
          technologies: [item.technology_type]
        };
      } else {
        acc[key].count += 1;
        if (!acc[key].technologies.includes(item.technology_type)) {
          acc[key].technologies.push(item.technology_type);
        }
      }
      return acc;
    }, {} as Record<string, EquipmentMapData & { count: number; technologies: string[] }>);

    // Count by technology type
    const summary = equipmentMapData.reduce((acc, item) => {
      const tech = item.technology_type;
      if (!acc[tech]) {
        acc[tech] = { technology: tech, count: 0 };
      }
      acc[tech].count += 1;
      return acc;
    }, {} as Record<string, { technology: string; count: number }>);

    const avgLat = equipmentMapData.reduce((sum, item) => sum + item.latitude, 0) / equipmentMapData.length;
    const avgLng = equipmentMapData.reduce((sum, item) => sum + item.longitude, 0) / equipmentMapData.length;
    
    return {
      mapCenter: [avgLat, avgLng] as [number, number],
      groupedData: Object.values(grouped),
      technologySummary: Object.values(summary)
    };
  }, [equipmentMapData]);

  const getMarkerColor = (technologyType: string) => {
    const type = technologyType?.toUpperCase();
    
    switch (type) {
      case 'JAJAR_LEGOWO':
        return '#22c55e'; // green-500
      case 'SRI':
        return '#3b82f6'; // blue-500
      case 'TANAM_BENIH_LANGSUNG':
        return '#f59e0b'; // amber-500
      case 'INTEGRATED_PEST_MANAGEMENT':
        return '#ef4444'; // red-500
      default:
        return '#8b5cf6'; // purple-500
    }
  };

  const getTechnologyLabel = (tech: string) => {
    const techMap: Record<string, string> = {
      'JAJAR_LEGOWO': 'Jajar Legowo',
      'SRI': 'SRI (System of Rice Intensification)',
      'TANAM_BENIH_LANGSUNG': 'Tanam Benih Langsung',
      'INTEGRATED_PEST_MANAGEMENT': 'Pengendalian Hama Terpadu',
    };
    return techMap[tech] || tech;
  };

  if (equipmentMapData.length === 0) {
    return (
      <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Peta Persebaran Alat Pertanian
          </h2>
        </div>
        
        <div className="h-64 lg:h-80 rounded-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data alat pertanian untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Peta Persebaran Alat Pertanian
        </h2>
      </div>

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
                fillColor={getMarkerColor(item.technology_type)}
                color="#fff"
                weight={item.count > 1 ? 3 : 2}
                opacity={1}
                fillOpacity={0.8}
              >
                <Popup maxWidth={250}>
                  <div className="text-sm p-1">
                    <p className="font-semibold text-base mb-2 text-green-700">
                      {getTechnologyLabel(item.technology_type)}
                    </p>
                    <div className="space-y-1 text-gray-700">
                      <p>📍 <span className="font-medium">Desa:</span> {item.village}</p>
                      <p>🏘️ <span className="font-medium">Kecamatan:</span> {item.district}</p>
                      <p>👨‍🌾 <span className="font-medium">Petani:</span> {item.farmer_name}</p>
                      <p>🌾 <span className="font-medium">Komoditas:</span> {item.commodity}</p>
                      {item.count > 1 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-green-600 font-semibold text-base">
                            📊 {item.count} adopsi teknologi di titik ini
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Teknologi: {item.technologies.map(t => getTechnologyLabel(t)).join(', ')}
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

      <div className="space-y-4">
        {technologySummary.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Ringkasan Teknologi</h3>
            <div className="flex flex-wrap gap-2">
              {technologySummary.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-blue-50 text-blue-700 border-blue-300"
                >
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: getMarkerColor(item.technology) }}
                  ></div>
                  <div className="text-sm">
                    <span className="font-semibold">{getTechnologyLabel(item.technology)}</span>
                    <span className="mx-1.5">•</span>
                    <span className="font-medium">{item.count}</span>
                    <span className="text-xs ml-1">lokasi</span>
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
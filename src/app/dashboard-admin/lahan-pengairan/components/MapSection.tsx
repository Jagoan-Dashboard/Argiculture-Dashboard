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

interface IndividualPointData {
  latitude: number;
  longitude: number;
  village: string;
  district: string;
  farmer_name: string;
  total_land_area: number;
  food_land_area: number;
  horti_land_area: number;
  plantation_land_area: number;
  water_access: string;
  has_good_water_access: boolean;
  primary_commodity: string;
  visit_date: string;
}

interface MapSectionProps {
  individualPointsData?: IndividualPointData[];
}

export const MapSection: React.FC<MapSectionProps> = ({ individualPointsData = [] }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const { mapCenter, groupedData, accessSummary } = useMemo(() => {
    if (individualPointsData.length === 0) {
      return { 
        mapCenter: [-7.4098, 111.4461] as [number, number],
        groupedData: [],
        accessSummary: []
      };
    }
    
    // Group by lat/lng
    const grouped = individualPointsData.reduce((acc, item) => {
      const key = `${item.latitude},${item.longitude}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 1,
          totalLandArea: item.total_land_area,
          totalFoodArea: item.food_land_area,
          totalHortiArea: item.horti_land_area,
          totalPlantationArea: item.plantation_land_area
        };
      } else {
        acc[key].count += 1;
        acc[key].totalLandArea += item.total_land_area;
        acc[key].totalFoodArea += item.food_land_area;
        acc[key].totalHortiArea += item.horti_land_area;
        acc[key].totalPlantationArea += item.plantation_land_area;
      }
      return acc;
    }, {} as Record<string, IndividualPointData & { count: number; totalLandArea: number; totalFoodArea: number; totalHortiArea: number; totalPlantationArea: number }>);

    // Count by water access type
    const summary = individualPointsData.reduce((acc, item) => {
      const access = item.water_access;
      if (!acc[access]) {
        acc[access] = { type: access, count: 0, totalArea: 0 };
      }
      acc[access].count += 1;
      acc[access].totalArea += item.total_land_area;
      return acc;
    }, {} as Record<string, { type: string; count: number; totalArea: number }>);

    const avgLat = individualPointsData.reduce((sum, item) => sum + item.latitude, 0) / individualPointsData.length;
    const avgLng = individualPointsData.reduce((sum, item) => sum + item.longitude, 0) / individualPointsData.length;
    
    return {
      mapCenter: [avgLat, avgLng] as [number, number],
      groupedData: Object.values(grouped),
      accessSummary: Object.values(summary)
    };
  }, [individualPointsData]);

  const getMarkerColor = (waterAccess: string, hasGoodAccess: boolean) => {
    if (hasGoodAccess) return '#22c55e'; // green-500 - Baik
    
    const access = waterAccess?.toUpperCase();
    switch (access) {
      case 'BAIK':
      case 'IRIGASI_TEKNIS':
        return '#22c55e'; // green-500
      case 'IRIGASI_SEMI_TEKNIS':
      case 'CUKUP':
        return '#84cc16'; // lime-500
      case 'TERBATAS_MUSIMAN':
      case 'SEDANG':
        return '#eab308'; // yellow-500
      case 'TIDAK_ADA':
      case 'KURANG':
        return '#ef4444'; // red-500
      default:
        return '#f97316'; // orange-500
    }
  };

  const getWaterAccessLabel = (access: string) => {
    const accessMap: Record<string, string> = {
      'BAIK': 'Baik',
      'IRIGASI_TEKNIS': 'Irigasi Teknis',
      'IRIGASI_SEMI_TEKNIS': 'Irigasi Semi Teknis',
      'TERBATAS_MUSIMAN': 'Terbatas Musiman',
      'TIDAK_ADA': 'Tidak Ada',
      'CUKUP': 'Cukup',
      'SEDANG': 'Sedang',
      'KURANG': 'Kurang',
    };
    return accessMap[access] || access;
  };

  const getAccessColor = (access: string) => {
    const type = access?.toUpperCase();
    
    switch (type) {
      case 'BAIK':
      case 'IRIGASI_TEKNIS':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'IRIGASI_SEMI_TEKNIS':
      case 'CUKUP':
        return 'bg-lime-100 text-lime-700 border-lime-300';
      case 'TERBATAS_MUSIMAN':
      case 'SEDANG':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'TIDAK_ADA':
      case 'KURANG':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-orange-100 text-orange-700 border-orange-300';
    }
  };

  if (individualPointsData.length === 0) {
    return (
      <div className="bg-white h-[32rem] col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Peta Distribusi Lahan dan Akses Air
          </h2>
        </div>
        
        <div className="h-64 lg:h-[26rem] rounded-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data lahan untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Peta Distribusi Lahan dan Akses Air
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
                fillColor={getMarkerColor(item.water_access, item.has_good_water_access)}
                color="#fff"
                weight={item.count > 1 ? 3 : 2}
                opacity={1}
                fillOpacity={0.8}
              >
                <Popup maxWidth={280}>
                  <div className="text-sm p-1">
                    <p className="font-semibold text-base mb-2 text-green-700">
                      {item.village}, {item.district}
                    </p>
                    <div className="space-y-1 text-gray-700">
                      <p>👨‍🌾 <span className="font-medium">Petani:</span> {item.farmer_name}</p>
                      <p>🌾 <span className="font-medium">Komoditas Utama:</span> {item.primary_commodity}</p>
                      <p>🏞️ <span className="font-medium">Total Luas:</span> {item.totalLandArea.toLocaleString('id-ID')} Ha</p>
                      
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="font-semibold text-sm mb-1">Distribusi Lahan:</p>
                        <p className="text-xs">• Tanaman Pangan: {item.totalFoodArea.toLocaleString('id-ID')} Ha</p>
                        <p className="text-xs">• Hortikultura: {item.totalHortiArea.toLocaleString('id-ID')} Ha</p>
                        <p className="text-xs">• Perkebunan: {item.totalPlantationArea.toLocaleString('id-ID')} Ha</p>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-sm">
                          <span className="font-medium">Akses Air:</span>{' '}
                          <span 
                            className="font-semibold"
                            style={{ color: getMarkerColor(item.water_access, item.has_good_water_access) }}
                          >
                            {getWaterAccessLabel(item.water_access)}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Status: {item.has_good_water_access ? '✅ Akses Baik' : '⚠️ Perlu Perhatian'}
                        </p>
                      </div>

                      {item.count > 1 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-green-600 font-semibold text-base">
                            📊 {item.count} lahan di titik ini
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Rata-rata: {(item.totalLandArea / item.count).toLocaleString('id-ID', {maximumFractionDigits: 1})} Ha per lahan
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
        {/* Access Summary */}
        {accessSummary.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Ringkasan Akses Air</h3>
            <div className="flex flex-wrap gap-2">
              {accessSummary.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getAccessColor(item.type)}`}
                >
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: getMarkerColor(item.type, false) }}
                  ></div>
                  <div className="text-sm">
                    <span className="font-semibold">{getWaterAccessLabel(item.type)}</span>
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

       
      </div>
    </div>
  );
};
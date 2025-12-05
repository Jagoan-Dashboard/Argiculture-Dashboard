// components/MapSection.tsx
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

// Interface untuk data titik sawah
interface RiceFieldIndividualPoint {
  latitude: number;
  longitude: number;
  village: string; // Diisi dengan district
  district: string;
  rainfed_rice_fields: number;
  irrigated_rice_fields: number;
  total_rice_field_area: number;
  date: string; // Sudah diganti dari visit_date
  data_source: string;
}

interface MapSectionProps {
  individualPointsData?: RiceFieldIndividualPoint[];
}

export const MapSection: React.FC<MapSectionProps> = ({ individualPointsData = [] }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const { mapCenter, groupedData, areaSummary } = useMemo(() => {
    if (individualPointsData.length === 0) {
      return {
        mapCenter: [-7.4098, 111.4461] as [number, number],
        groupedData: [],
        areaSummary: []
      };
    }

    // Kelompokkan data berdasarkan lokasi (latitude, longitude)
    const grouped = individualPointsData.reduce((acc, item) => {
      const key = `${item.latitude},${item.longitude}`;
      if (!acc[key]) {
        acc[key] = {
          ...item,
          count: 1,
          totalRainfed: item.rainfed_rice_fields,
          totalIrrigated: item.irrigated_rice_fields,
          totalRiceFieldArea: item.total_rice_field_area,
        };
      } else {
        acc[key].count += 1;
        acc[key].totalRainfed += item.rainfed_rice_fields;
        acc[key].totalIrrigated += item.irrigated_rice_fields;
        acc[key].totalRiceFieldArea += item.total_rice_field_area;
      }
      return acc;
    }, {} as Record<string, RiceFieldIndividualPoint & { count: number; totalRainfed: number; totalIrrigated: number; totalRiceFieldArea: number }>);

    // Ringkasan berdasarkan tipe lahan (irigasi vs tadah hujan)
    const summary = individualPointsData.reduce((acc, item) => {
      // Jika keduanya nol, abaikan atau masukkan ke kategori default
      if (item.irrigated_rice_fields === 0 && item.rainfed_rice_fields === 0) {
          return acc; // Lewati item dengan luas 0
      }

      if (item.irrigated_rice_fields > 0) {
        if (!acc['irrigated']) {
          acc['irrigated'] = { type: 'Sawah Irigasi', count: 0, totalArea: 0 };
        }
        acc['irrigated'].count += 1;
        acc['irrigated'].totalArea += item.irrigated_rice_fields;
      }
      if (item.rainfed_rice_fields > 0) {
        if (!acc['rainfed']) {
          acc['rainfed'] = { type: 'Sawah Tadah Hujan', count: 0, totalArea: 0 };
        }
        acc['rainfed'].count += 1;
        acc['rainfed'].totalArea += item.rainfed_rice_fields;
      }
      return acc;
    }, {} as Record<string, { type: string; count: number; totalArea: number }>);

    // Hitung pusat peta
    const avgLat = individualPointsData.reduce((sum, item) => sum + item.latitude, 0) / individualPointsData.length;
    const avgLng = individualPointsData.reduce((sum, item) => sum + item.longitude, 0) / individualPointsData.length;

    return {
      mapCenter: [avgLat, avgLng] as [number, number],
      groupedData: Object.values(grouped),
      areaSummary: Object.values(summary)
    };
  }, [individualPointsData]);

  // Fungsi untuk menentukan warna marker berdasarkan dominasi lahan
  const getMarkerColor = (rainfed: number, irrigated: number) => {
    if (irrigated > 0 && rainfed === 0) return '#22c55e'; // Hanya irigasi
    if (rainfed > 0 && irrigated === 0) return '#84cc16'; // Hanya tadah hujan
    if (irrigated > 0 && rainfed > 0) return '#eab308'; // Keduanya ada
    return '#f97316'; // Tidak ada lahan (seharusnya tidak terjadi karena filter di repo)
  };

  // Fungsi untuk menentukan warna badge ringkasan
  const getAreaTypeColor = (type: string) => {
    if (type.includes('Irigasi')) return 'bg-green-100 text-green-700 border-green-300';
    if (type.includes('Tadah Hujan')) return 'bg-lime-100 text-lime-700 border-lime-300';
    return 'bg-yellow-100 text-yellow-700 border-yellow-300';
  };

  if (individualPointsData.length === 0) {
    return (
      <div className="bg-white h-[32rem] col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Peta Persebaran Lahan Sawah Tiap Kecamatan
          </h2>
        </div>

        <div className="mb-4 h-[17rem] rounded-lg bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Tidak ada data lahan sawah untuk ditampilkan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-[32rem] col-span-2 p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon icon="bxs:map" className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Peta Persebaran Lahan Sawah Tiap Kecamatan
        </h2>
      </div>

      <div className="relative mb-4 h-[72%] rounded-lg overflow-hidden border border-gray-200">
        {typeof window !== 'undefined' && (
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            whenReady={() => setMapLoaded(true)}
            scrollWheelZoom={true}
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
                fillColor={getMarkerColor(item.rainfed_rice_fields, item.irrigated_rice_fields)}
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
                      <p>🌾 <span className="font-medium">Tanggal:</span> {item.date}</p>
                      <p>🏞️ <span className="font-medium">Total Luas:</span> {item.totalRiceFieldArea.toLocaleString('id-ID')} Ha</p>

                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="font-semibold text-sm mb-1">Distribusi Lahan Sawah:</p>
                        <p className="text-xs">• Irigasi: {item.totalIrrigated.toLocaleString('id-ID')} Ha</p>
                        <p className="text-xs">• Tadah Hujan: {item.totalRainfed.toLocaleString('id-ID')} Ha</p>
                      </div>

                      {item.count > 1 && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-green-600 font-semibold text-base">
                            📊 {item.count} titik lahan di koordinat ini
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Rata-rata: {(item.totalRiceFieldArea / item.count).toLocaleString('id-ID', { maximumFractionDigits: 1 })} Ha per titik
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
        {/* Area Type Summary */}
        {areaSummary.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Ringkasan Persebaran Sawah</h3>
            <div className="max-h-24 overflow-y-auto pr-2">
              <div className="flex flex-wrap gap-2">
                {areaSummary.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getAreaTypeColor(item.type)}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getMarkerColor(item.type.includes('Tadah') ? item.totalArea : 0, item.type.includes('Irigasi') ? item.totalArea : 0) }}
                    ></div>
                    <div className="text-sm">
                      <span className="font-semibold">{item.type}</span>
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
          </div>
        )}
      </div>
    </div>
  );
};
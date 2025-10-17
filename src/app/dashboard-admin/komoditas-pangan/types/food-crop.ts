
export interface HarvestScheduleData {
  id: string;
  no: number;
  komoditas: string;
  estimasiPanen: string;
  petani?: string;
  desa?: string;
  luasLahan?: number;
}


export const FOOD_CROP_COMMODITY_OPTIONS = [
  { value: 'padi sawah', label: 'Padi Sawah' },
  { value: 'padi ladang', label: 'Padi Ladang' },
  { value: 'ubi kayu', label: 'Ubi Kayu' },
  { value: 'ubi jalar', label: 'Ubi Jalar' },
  { value: 'kedelai', label: 'Kedelai' },
  { value: 'kacang tanah', label: 'Kacang Tanah' },
  { value: 'jagung', label: 'Jagung' },
] as const;

export type FoodCropCommodityType = typeof FOOD_CROP_COMMODITY_OPTIONS[number]['value'];


export const GROWTH_PHASE_MAP: Record<string, string> = {
  'PERSIAPAN_LAHAN': 'Persiapan Lahan',
  'PENANAMAN': 'Penanaman',
  'VEGETATIF_AWAL': 'Vegetatif Awal',
  'VEGETATIF_AKHIR': 'Vegetatif Akhir',
  'GENERATIF': 'Generatif',
  'PEMATANGAN': 'Pematangan',
  'PANEN': 'Panen',
  "BERA":"Bera",
  "GENERATIF_1":"Generatif 1",
  "GENERATIF_2":"Generatif 2",
  "GENERATIF_3":"Generatif 3",
  "PANEN_PENUH":"Panen Penuh",
  "BELUM_TANAM":"Belum Tanam",
};


export const TECHNOLOGY_MAP: Record<string, string> = {
  'JAJAR_LEGOWO': 'Jajar Legowo',
  'IRIGASI_POMPA': 'Irigasi Pompa',
  'IRIGASI_TETES': 'Irigasi Tetes/Sprinkler',
  'MULSA_PLASTIK': 'Mulsa Plastik',
  'GREENHOUSE': 'Greenhouse',
  'PUPUK_ORGANIK': 'Pupuk Organik',
  'SENSOR_IOT': 'Sensor/IoT',
  'TIDAK_ADA': 'Tidak Ada',
};


export const PEST_MAP: Record<string, string> = {
  'WERENG_COKLAT': 'Wereng Coklat',
  'TIKUS': 'Tikus',
  'TIDAK_ADA': 'Tidak Ada',
  'LAINNYA': 'Lainnya',
  'PENGGEREK_BATANG': 'Penggerek Batang',
  'WALANG_SANGIT': 'Walang Sangit',
  'HAWAR_DAUN': 'Hawar Daun Bakteri',
  'BLAST': 'Blast/Bercak Daun',
};
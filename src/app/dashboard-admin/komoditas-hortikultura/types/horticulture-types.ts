
export interface HarvestScheduleData {
  id: string;
  no: number;
  komoditas: string;
  estimasiPanen: string;
  petani: string;
  desa: string;
  luasLahan: number;
}

// Commodity options untuk hortikultura
export const HORTICULTURE_COMMODITY_OPTIONS = [
  { value: 'wortel', label: 'Wortel' },
  { value: 'tomat', label: 'Tomat' },
  { value: 'sawi', label: 'Sawi' },
  { value: 'kol', label: 'Kol' },
  { value: 'kentang', label: 'Kentang' },
  { value: 'bawang merah', label: 'Bawang Merah' },
  { value: 'pisang', label: 'Pisang' },
  { value: 'mangga', label: 'Mangga' },
  { value: 'jeruk', label: 'Jeruk' },
  { value: 'semangka', label: 'Semangka' },
  { value: 'melon', label: 'Melon' },
  { value: 'pepaya', label: 'Pepaya' },
  { value: 'nanas', label: 'Nanas' },
  { value: 'durian', label: 'Durian' },
  { value: 'anggrek', label: 'Anggrek' },
  { value: 'krisan', label: 'Krisan' },
  { value: 'mawar', label: 'Mawar' },
] as const;

export type HorticultureCommodityType = typeof HORTICULTURE_COMMODITY_OPTIONS[number]['value'];

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
] as const;

export type HorticultureCommodityType = typeof HORTICULTURE_COMMODITY_OPTIONS[number]['value'];
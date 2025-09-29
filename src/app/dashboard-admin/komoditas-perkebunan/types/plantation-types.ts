// Types untuk Harvest Schedule Table
export interface HarvestScheduleData {
  id: string;
  no: number;
  komoditas: string;
  estimasiPanen: string;
  petani: string;
  desa: string;
  luasLahan: number;
}

// Commodity options
export const COMMODITY_OPTIONS = [
  { value: 'tembakau', label: 'Tembakau' },
  { value: 'tebu', label: 'Tebu' },
  { value: 'kopi', label: 'Kopi' },
  { value: 'karet', label: 'Karet' },
  { value: 'cengkeh', label: 'Cengkeh' },
] as const;

export type CommodityType = typeof COMMODITY_OPTIONS[number]['value'];
export interface HarvestScheduleData {
  id: string;
  no: number;
  komoditas: string;
  estimasiPanen: string;
  petani: string;
  desa: string;
  luasLahan: number;
}

// Jenis komoditi hortikultura
export const HORTICULTURE_TYPE_OPTIONS = [
  { value: "sayuran", label: "Sayuran" },
  { value: "buah", label: "Buah" },
  { value: "florikultura", label: "Florikultura" },
] as const;

export type HorticultureType =
  (typeof HORTICULTURE_TYPE_OPTIONS)[number]["value"];

// Mapping komoditas berdasarkan jenisnya
export const COMMODITY_BY_TYPE: Record<
  HorticultureType,
  { value: string; label: string }[]
> = {
  sayuran: [
    { value: "bawang merah", label: "Bawang Merah" },
    { value: "bawang putih", label: "Bawang Putih" },
    { value: "tomat", label: "Tomat" },
    { value: "kol", label: "Kol" },
    { value: "kentang", label: "Kentang" },
    { value: "wortel", label: "Wortel" },
    { value: "sawi", label: "Sawi" },
    { value: "Lainnya", label: "Lainnya" },
  ],
  buah: [
    { value: "pisang", label: "Pisang" },
    { value: "mangga", label: "Mangga" },
    { value: "jeruk", label: "Jeruk" },
    { value: "semangka", label: "Semangka" },
    { value: "melon", label: "Melon" },
    { value: "pepaya", label: "Pepaya" },
    { value: "nanas", label: "Nanas" },
    { value: "durian", label: "Durian" },
  ],
  florikultura: [
    { value: "anggrek", label: "Anggrek" },
    { value: "krisan", label: "Krisan" },
    { value: "mawar", label: "Mawar" },
  ],
};

// Commodity options untuk hortikultura (legacy support or flat list)
export const HORTICULTURE_COMMODITY_OPTIONS = [
  ...COMMODITY_BY_TYPE.sayuran,
  ...COMMODITY_BY_TYPE.buah,
  ...COMMODITY_BY_TYPE.florikultura,
] as const;

export type HorticultureCommodityType = string;

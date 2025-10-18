
export const SECTOR_OPTIONS = [
  { value: 'pangan', label: 'Sektor Pangan' },
  { value: 'hortikultura', label: 'Sektor Hortikultura' },
  { value: 'perkebunan', label: 'Sektor Perkebunan' },
] as const;

export type SectorType = typeof SECTOR_OPTIONS[number]['value'];


export const COMMODITY_NAME_MAP: Record<string, string> = {
  'PADI_SAWAH': 'Padi Sawah',
  'PADI_LADANG': 'Padi Ladang',
  'JAGUNG': 'Jagung',
  'KEDELAI': 'Kedelai',
  'UBI_KAYU': 'Ubi Kayu',
  'UBI_JALAR': 'Ubi Jalar',
  'KACANG_TANAH': 'Kacang Tanah',
  'Sayuran': 'Sayuran',
  'Buah-buahan': 'Buah-buahan',
  'Kopi': 'Kopi',
  'Teh': 'Teh',
  'Karet': 'Karet',
  'Kelapa Sawit': 'Kelapa Sawit',
};


export const LAND_STATUS_MAP: Record<string, string> = {
  'MILIK_SENDIRI': 'Milik Sendiri',
  'Milik sendiri': 'Milik Sendiri',
  'SEWA': 'Sewa',
  'Sewa': 'Sewa',
  'PINJAM_BEBAS_SEWA': 'Pinjam/Bebas Sewa',
  'Pinjam/Bebas Sewa': 'Pinjam/Bebas Sewa',
  "PINJAMBEBAS_SEWA": 'Pinjam/Bebas Sewa',
};


export const CONSTRAINT_MAP: Record<string, string> = {
  'IRIGASI_SULIT': 'Irigasi Sulit',
  'AKSES_PASAR': 'Akses Pasar',
  'HAMA_PENYAKIT': 'Hama & Penyakit',
  'MODAL_TERBATAS': 'Modal Terbatas',
  'TENAGA_KERJA': 'Tenaga Kerja',
  'HARGA_RENDAH': 'Harga Rendah',
  "IKLIM": "Iklim",
  "HAMA": "Hama",
  "PUPUK": "Pupuk",

};


export const HOPE_MAP: Record<string, string> = {
  'BANTUAN_ALSINTAN': 'Bantuan Alsintan',
  'COLD_STORAGE': 'Cold Storage',
  'PELATIHAN': 'Pelatihan',
  'BANTUAN_MODAL': 'Bantuan Modal',
  'IRIGASI_LEBIH_BAIK': 'Irigasi Lebih Baik',
  'HARGA_STABIL': 'Harga Stabil',
  "BIBITPUPUK": "Bibit Pupuk",
};

export interface AspirationItem {
  id: number;
  title: string;
  value: number;
  percentage: number;
  color: 'green' | 'pink';
}

export interface AspirationCategory {
  title: string;
  color: 'green' | 'pink';
  items: AspirationItem[];
}

export interface AspirationsData {
  categories: AspirationCategory[];
}

export const SECTOR_OPTIONS = [
  { value: 'pangan', label: 'Sektor Pangan' },
  { value: 'hortikultura', label: 'Sektor Hortikultura' },
  { value: 'perkebunan', label: 'Sektor Perkebunan' },
] as const;

export type SectorType = typeof SECTOR_OPTIONS[number]['value'];


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
export interface KomoditasData {
  id: string;
  no: number;
  komoditas: string;
  estimasiPanen: string;
}

export interface TablePerkiraanSectionProps {
  data?: KomoditasData[];
  loading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
}

export const COMMODITY_OPTIONS = [
  { value: 'Padi', label: 'Padi Sawah' },
  { value: 'Jagung', label: 'Jagung' },
  { value: 'Kedelai', label: 'Kedelai' },
] as const;

export type CommodityType = typeof COMMODITY_OPTIONS[number]['value'];
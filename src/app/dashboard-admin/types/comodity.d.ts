
export interface CommodityData {
  name: string;
  value: number;
  fullName?: string;
}

export interface CommodityChartSectionProps {
  commodityData?: CommodityData[];
}
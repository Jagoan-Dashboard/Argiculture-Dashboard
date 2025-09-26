export interface ProductivityData {
  year: number;
  value: number;
  label?: string;
}

export interface ProductivityChartSectionProps {
  productivityData?: ProductivityData[];
}
export interface HamaData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  fullName: string;
}

export interface DominasiHamaSectionProps {
  hamaData?: HamaData[];
}

export interface GrowthPhaseData {
  name: string;
  value: number;
  percentage: number;
  color: string;
  fullName: string;
}

export interface ProporsiSectionProps {
  growthPhaseData?: GrowthPhaseData[];
}

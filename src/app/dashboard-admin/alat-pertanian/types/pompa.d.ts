export interface JumlahPompaData {
  year: number;
  value: number;
  label?: string;
}

export interface JumlahPompaSectionProps {
  jumlahPompaData?: JumlahPompaData[];
}
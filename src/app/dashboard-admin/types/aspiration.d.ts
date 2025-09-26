
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
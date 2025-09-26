export interface Key {
  id: number;
  icon: string;
  title: string;
  description: string;
  bgColor?: string;
  iconColor?: string;
}

export interface KeysProps {
  data?: KeyInsight[];
}
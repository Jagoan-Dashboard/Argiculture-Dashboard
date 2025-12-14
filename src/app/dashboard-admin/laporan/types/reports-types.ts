export interface Report {
  id: string;
  extension_officer: string; // Penyuluh
  visit_date: string;
  farmer_name: string;
  farmer_group: string;
  farmer_group_type: string;
  village: string;
  district: string;
  latitude: number;
  longitude: number;
  photos: string[];

  // Food Commodity
  food_commodity?: string;
  food_land_status?: string;
  food_land_area?: number;
  food_growth_phase?: string;
  food_plant_age?: number;
  food_planting_date?: string;
  food_harvest_date?: string;
  food_delay_reason?: string;
  food_technology?: string;

  // Horti Commodity
  horti_commodity?: string;
  horti_sub_commodity?: string;
  horti_land_status?: string;
  horti_land_area?: number;
  horti_growth_phase?: string;
  horti_plant_age?: number;
  horti_planting_date?: string;
  horti_harvest_date?: string;
  horti_delay_reason?: string;
  horti_technology?: string;
  post_harvest_problems?: string;

  // Plantation Commodity
  plantation_commodity?: string;
  plantation_land_status?: string;
  plantation_land_area?: number;
  plantation_growth_phase?: string;
  plantation_plant_age?: number;
  plantation_planting_date?: string;
  plantation_harvest_date?: string;
  plantation_delay_reason?: string;
  plantation_technology?: string;
  production_problems?: string;

  // Issues & Needs
  has_pest_disease: boolean;
  pest_disease_type?: string;
  pest_disease_commodity?: string;
  affected_area?: string;
  control_action?: string;
  weather_condition?: string;
  weather_impact?: string;
  main_constraint?: string;
  farmer_hope?: string;
  training_needed?: string;
  urgent_needs?: string;
  water_access?: string;
  suggestions: string;

  created_at: string;
  updated_at: string;
}

export interface ReportsResponse {
  success: boolean;
  message: string;
  data: {
    reports: Report[];
  };
}

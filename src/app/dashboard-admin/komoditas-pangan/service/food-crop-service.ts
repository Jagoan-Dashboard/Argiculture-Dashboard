import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-endpoints';

export interface FoodCropStatsResponse {
  success: boolean;
  message: string;
  data: {
    land_area: number;
    estimated_production: number;
    pest_affected_area: number;
    pest_report_count: number;
    distribution_map: Array<{
      latitude: number;
      longitude: number;
      village: string;
      district: string;
      commodity: string;
      commodity_type: string;
      land_area: number;
    }> | null;
    growth_phases: Array<{
      phase: string;
      count: number;
      percentage: number;
    }>;
    technology_used: Array<{
      technology: string;
      count: number;
      percentage: number;
    }>;
    pest_dominance: Array<{
      pest_type: string;
      count: number;
      percentage: number;
    }>;
    harvest_schedule: Array<{
      commodity_detail: string;
      harvest_date: string;
      farmer_name: string;
      village: string;
      land_area: number;
    }> | null;
  };
}

export interface FoodCropStatsParams {
  start_date?: string;
  end_date?: string;
  commodity_name?: string;
}

export const foodCropService = {
  getStats: async (params?: FoodCropStatsParams): Promise<FoodCropStatsResponse> => {
    const response = await apiClient.get<FoodCropStatsResponse>(
      ENDPOINTS.FOOD_CROP_STATS,
      { params }
    );
    return response.data;
  },
};
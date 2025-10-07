import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-endpoints';

export interface LandIrrigationStatsResponse {
  success: boolean;
  message: string;
  data: {
    total_land_area: {
      area: number;
      growth_percent: number;
    };
    irrigated_land_area: {
      area: number;
      growth_percent: number;
    };
    non_irrigated_land_area: {
      area: number;
      growth_percent: number;
    };
    irrigated_by_district: Array<{
      district: string;
      irrigated_area: number;
      non_irrigated_area: number;
    }> | null;
    land_distribution: Array<{
      district: string;
      sawah: number;
      perkebunan: number;
      ladang?: number;
    }> | null;
    // TAMBAHKAN FIELD INI ⬇️
    individual_points: Array<{
      latitude: number;
      longitude: number;
      village: string;
      district: string;
      farmer_name: string;
      total_land_area: number;
      food_land_area: number;
      horti_land_area: number;
      plantation_land_area: number;
      water_access: string;
      has_good_water_access: boolean;
      primary_commodity: string;
      visit_date: string;
    }>;
  };
}

export interface LandIrrigationStatsParams {
  start_date?: string;
  end_date?: string;
}

export const landIrrigationService = {
  getStats: async (params?: LandIrrigationStatsParams): Promise<LandIrrigationStatsResponse> => {
    const response = await apiClient.get<LandIrrigationStatsResponse>(
      ENDPOINTS.LAND_IRRIGATION_STATS,
      { params }
    );
    return response.data;
  },
};
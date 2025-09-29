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
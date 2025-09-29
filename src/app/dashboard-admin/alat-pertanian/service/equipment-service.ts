import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-endpoints';

export interface EquipmentStatsResponse {
  success: boolean;
  message: string;
  data: {
    grain_processor: {
      count: number;
      growth_percent: number;
    };
    multipurpose_thresher: {
      count: number;
      growth_percent: number;
    };
    farm_machinery: {
      count: number;
      growth_percent: number;
    };
    water_pump: {
      count: number;
      growth_percent: number;
    };
    distribution_by_district: Array<{
      district: string;
      grain_processor: number;
      thresher: number;
      farm_machinery: number;
      water_pump: number;
    }>;
    water_pump_trend: Array<{
      year: number;
      count: number;
    }>;
  };
}

export interface EquipmentStatsParams {
  start_date?: string;
  end_date?: string;
}

export const equipmentService = {
  getStats: async (params?: EquipmentStatsParams): Promise<EquipmentStatsResponse> => {
    const response = await apiClient.get<EquipmentStatsResponse>(
      ENDPOINTS.EQUIPMENT_STATS,
      { params }
    );
    return response.data;
  },
};
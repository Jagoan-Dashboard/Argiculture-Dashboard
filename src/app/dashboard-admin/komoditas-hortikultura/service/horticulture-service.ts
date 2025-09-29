import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-endpoints';

export interface HorticultureStatsResponse {
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
    }>;
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
    }>;
  };
}

export interface HorticultureStatsParams {
  start_date?: string;
  end_date?: string;
  commodity_name?: string;
}

export const horticultureService = {
  getStats: async (params?: HorticultureStatsParams): Promise<HorticultureStatsResponse> => {
    const response = await apiClient.get<HorticultureStatsResponse>(
      ENDPOINTS.HORTICULTURE_STATS,
      { params }
    );
    return response.data;
  },
};
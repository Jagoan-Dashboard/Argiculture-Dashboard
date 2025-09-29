import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-endpoints';

export interface CommodityAnalysisResponse {
  success: boolean;
  message: string;
  data: {
    total_production: number;
    production_growth: number;
    total_harvested_area: number;
    harvested_area_growth: number;
    productivity: number;
    productivity_growth: number;
    production_by_district: Array<{
      district: string;
      production: number;
      area: number;
      productivity: number;
    }> | null;
    productivity_trend: Array<{
      year: number;
      productivity: number;
      production: number;
      area: number;
    }>;
  };
}

export interface CommodityAnalysisParams {
  commodity_name?: string;
  start_date?: string;
  end_date?: string;
}

export const commodityService = {
  getAnalysis: async (params?: CommodityAnalysisParams): Promise<CommodityAnalysisResponse> => {
    const response = await apiClient.get<CommodityAnalysisResponse>(
      ENDPOINTS.COMMODITY_ANALYSIS,
      { params }
    );
    return response.data;
  },
};
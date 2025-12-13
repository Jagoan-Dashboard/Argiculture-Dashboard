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
    production_distribution: Array<{
      latitude: number;
      longitude: number;
      village: string;
      district: string;
      commodity: string;
      land_area: number;
      estimated_production: number;
      farmer_name: string;
    }>;
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

export interface CommodityImportResponse {
  success: boolean;
  message: string;
  data: {
    total_rows: number;
    success_count: number;
    failed_count: number;
    skipped_count: number;
  };
}

export const commodityService = {
  getAnalysis: async (params?: CommodityAnalysisParams): Promise<CommodityAnalysisResponse> => {
    const response = await apiClient.get<CommodityAnalysisResponse>(
      ENDPOINTS.COMMODITY_ANALYSIS,
      { params }
    );
    return response.data;
  },
  importData: async (file: File): Promise<CommodityImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<CommodityImportResponse>(
      ENDPOINTS.IMPORT_KOMODITAS,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};
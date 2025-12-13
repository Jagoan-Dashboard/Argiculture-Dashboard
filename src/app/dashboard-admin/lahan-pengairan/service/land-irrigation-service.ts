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
      food_crop_area: number;
      plantation_area: number;
      horti_area?: number;
    }> | null;
    // TAMBAHKAN FIELD INI ⬇️
    individual_points: Array<{
      /**

       */
      latitude: number;
      longitude: number;
      village: string;
      district: string;
      rainfed_rice_fields: number;
      irrigated_rice_fields: number;
      total_rice_field_area: number;
      date: string;
      data_source: string;
    }>;
  };
}

export interface LandIrrigationStatsParams {
  start_date?: string;
  end_date?: string;
}

export interface LandIrrigationImportResponse {
  success: boolean;
  message: string;
  data: {
    total_rows: number;
    success_count: number;
    failed_count: number;
    skipped_count: number;
  };
}

export const landIrrigationService = {
  getStats: async (params?: LandIrrigationStatsParams): Promise<LandIrrigationStatsResponse> => {
    const response = await apiClient.get<LandIrrigationStatsResponse>(
      ENDPOINTS.LAND_IRRIGATION_STATS,
      { params }
    );
    return response.data;
  },
  importData: async (file: File): Promise<LandIrrigationImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<LandIrrigationImportResponse>(
      ENDPOINTS.IMPORT_LAHAN_PENGAIRAN,
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
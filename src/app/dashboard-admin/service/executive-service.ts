import apiClient from '@/lib/api-client';
import { ENDPOINTS } from '@/lib/api-endpoints';

export interface ExecutiveDashboardResponse {
  success: boolean;
  message: string;
  data: {
    total_land_area: number;
    pest_disease_reports: number;
    total_extension_reports: number;
    commodity_map: Array<{
      latitude: number;
      longitude: number;
      village: string;
      district: string;
      commodity: string;
      commodity_type: string;
      land_area: number;
    }>;
    commodity_by_sector: {
      food_crops: Array<{
        name: string;
        count: number;
      }>;
      horticulture: Array<{
        name: string;
        count: number;
      }>;
      plantation: Array<{
        name: string;
        count: number;
      }>;
    };
    land_status_distribution: Array<{
      status: string;
      count: number;
      percentage: number;
    }>;
    main_constraints: Array<{
      constraint: string;
      count: number;
      percentage: number;
    }>;
    farmer_hopes_needs: {
      hopes: Array<{
        hope: string;
        count: number;
        percentage: number;
      }> | null;
      needs: Array<{
        need: string;
        count: number;
        percentage: number;
      }> | null;
    };
  };
}

export interface ExecutiveDashboardParams {
  commodity_type?: string;
}

export const executiveService = {
  getDashboard: async (params?: ExecutiveDashboardParams): Promise<ExecutiveDashboardResponse> => {
    const response = await apiClient.get<ExecutiveDashboardResponse>(
      ENDPOINTS.EXECUTIVE_DASHBOARD,
      { params }
    );
    return response.data;
  },
};
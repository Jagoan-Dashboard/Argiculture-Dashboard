import apiClient from "@/lib/api-client";
import { ReportsResponse } from "../types/reports-types";

export const ReportsService = {
  async getAll(): Promise<ReportsResponse> {
    const response = await apiClient.get<ReportsResponse>(
      "/api/v1/agriculture?limit=100"
    );
    return response.data;
  },
};

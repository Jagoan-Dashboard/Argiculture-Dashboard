import { useState, useEffect, useCallback } from "react";
import {
  commodityService,
  CommodityAnalysisResponse,
  CommodityAnalysisParams,
} from "../service/commodity-service";
import { toast } from "sonner";

export const useCommodityAnalysis = (
  initialParams?: CommodityAnalysisParams
) => {
  const [data, setData] = useState<CommodityAnalysisResponse["data"] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(
    async (params?: CommodityAnalysisParams) => {
      try {
        setLoading(true);
        setError(null);
        const response = await commodityService.getAnalysis(params);

        if (response.success) {
          setData(response.data);
        } else {
          throw new Error(
            response.message || "Failed to fetch commodity analysis"
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        toast.error("Error", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchAnalysis(initialParams);
  }, [fetchAnalysis, initialParams]);

  const refetch = useCallback(
    (params?: CommodityAnalysisParams) => {
      return fetchAnalysis(params);
    },
    [fetchAnalysis]
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
};

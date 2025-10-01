import { useState, useEffect, useCallback } from 'react';
import { foodCropService, FoodCropStatsResponse, FoodCropStatsParams } from '../service/food-crop-service';
import { toast } from 'sonner';

export const useFoodCrop = (initialParams?: FoodCropStatsParams) => {
  const [data, setData] = useState<FoodCropStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (params?: FoodCropStatsParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await foodCropService.getStats(params);
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch food crop stats');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Error', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(initialParams);
  }, [fetchStats, initialParams]);

  const refetch = useCallback((params?: FoodCropStatsParams) => {
    return fetchStats(params);
  }, [fetchStats]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
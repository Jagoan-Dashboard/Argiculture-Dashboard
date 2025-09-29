import { useState, useEffect, useCallback } from 'react';
import { plantationService, PlantationStatsResponse, PlantationStatsParams } from '../service/plantation-service';
import { toast } from 'sonner';

export const usePlantation = (initialParams?: PlantationStatsParams) => {
  const [data, setData] = useState<PlantationStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (params?: PlantationStatsParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await plantationService.getStats(params);
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch plantation stats');
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

  const refetch = useCallback((params?: PlantationStatsParams) => {
    return fetchStats(params);
  }, [fetchStats]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
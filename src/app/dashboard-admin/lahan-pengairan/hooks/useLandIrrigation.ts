import { useState, useEffect, useCallback } from 'react';
import { landIrrigationService, LandIrrigationStatsResponse, LandIrrigationStatsParams } from '../service/land-irrigation-service';
import { toast } from 'sonner';

export const useLandIrrigation = (initialParams?: LandIrrigationStatsParams) => {
  const [data, setData] = useState<LandIrrigationStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (params?: LandIrrigationStatsParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await landIrrigationService.getStats(params);
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch land irrigation stats');
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

  const refetch = useCallback((params?: LandIrrigationStatsParams) => {
    return fetchStats(params);
  }, [fetchStats]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
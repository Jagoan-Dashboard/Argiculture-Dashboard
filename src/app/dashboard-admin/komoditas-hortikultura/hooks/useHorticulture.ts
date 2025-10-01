import { useState, useEffect, useCallback } from 'react';
import { horticultureService, HorticultureStatsResponse, HorticultureStatsParams } from '../service/horticulture-service';
import { toast } from 'sonner';

export const useHorticulture = (initialParams?: HorticultureStatsParams) => {
  const [data, setData] = useState<HorticultureStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (params?: HorticultureStatsParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await horticultureService.getStats(params);
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch horticulture stats');
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

  const refetch = useCallback((params?: HorticultureStatsParams) => {
    return fetchStats(params);
  }, [fetchStats]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
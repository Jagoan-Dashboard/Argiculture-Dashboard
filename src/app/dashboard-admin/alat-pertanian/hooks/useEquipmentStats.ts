import { useState, useEffect, useCallback } from 'react';
import { equipmentService, EquipmentStatsResponse, EquipmentStatsParams } from '../service/equipment-service';
import { toast } from 'sonner';

export const useEquipmentStats = (initialParams?: EquipmentStatsParams) => {
  const [data, setData] = useState<EquipmentStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (params?: EquipmentStatsParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await equipmentService.getStats(params);
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch equipment stats');
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

  const refetch = useCallback((params?: EquipmentStatsParams) => {
    return fetchStats(params);
  }, [fetchStats]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
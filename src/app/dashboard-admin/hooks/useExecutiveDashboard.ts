import { useState, useEffect, useCallback, useRef } from 'react';
import { executiveService, ExecutiveDashboardResponse, ExecutiveDashboardParams } from '../service/executive-service';
import { toast } from 'sonner';

export const useExecutiveDashboard = (initialParams?: ExecutiveDashboardParams) => {
  const [data, setData] = useState<ExecutiveDashboardResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Gunakan ref untuk track apakah sudah fetch pertama kali
  const hasFetched = useRef(false);

  const fetchDashboard = useCallback(async (params?: ExecutiveDashboardParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await executiveService.getDashboard(params);
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch executive dashboard');
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
  }, []); // Kosongkan dependency array

  useEffect(() => {
    // Hanya fetch sekali saat mount
    if (!hasFetched.current) {
      fetchDashboard(initialParams);
      hasFetched.current = true;
    }
  }, [fetchDashboard, initialParams]); // Dependency array kosong - hanya run sekali saat mount

  const refetch = useCallback((params?: ExecutiveDashboardParams) => {
    return fetchDashboard(params);
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};
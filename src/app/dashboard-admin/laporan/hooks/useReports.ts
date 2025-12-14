import { useState, useEffect, useCallback } from "react";
import { Report } from "../types/reports-types";
import { ReportsService } from "../service/reports-service";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ReportsService.getAll();
      if (response.success) {
        setReports(response.data.reports);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to fetch reports");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, refetch: fetchReports };
}

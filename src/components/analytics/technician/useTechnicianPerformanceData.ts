
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAnalyticsFilters } from "../AnalyticsFilterContext";
import { BarChartDataItem } from "@/components/charts/BarChart";

interface TechnicianStats extends BarChartDataItem {
  name: string;
  completed: number;
  pending: number;
  issues: number;
  total: number;
}

export function useTechnicianPerformanceData() {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<TechnicianStats[]>([]);
  const isMobile = useIsMobile();

  // Fetch technicians for names
  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*');
      
      if (error) {
        console.error('Error fetching technicians:', error);
        throw error;
      }
      return data || [];
    },
  });

  // Fetch maintenance checks
  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['maintenance_checks_by_technician', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('hvac_maintenance_checks')
        .select('*');
      
      if (dateRange.from) {
        query = query.gte('check_date', dateRange.from.toISOString());
      }
      
      if (dateRange.to) {
        query = query.lte('check_date', dateRange.to.toISOString());
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching maintenance checks:', error);
        throw error;
      }
      return data || [];
    },
  });

  useEffect(() => {
    if (maintenanceData && technicians) {
      // Create a lookup map for technician names
      const technicianMap = new Map();
      technicians.forEach(tech => {
        technicianMap.set(tech.id, `${tech.firstName} ${tech.lastName}`);
      });
      
      // Group maintenance checks by technician
      const techPerformance: Record<string, { completed: number; pending: number; issues: number }> = {};
      
      maintenanceData.forEach(check => {
        if (!check.technician_id) return;
        
        const techId = check.technician_id;
        if (!techPerformance[techId]) {
          techPerformance[techId] = { completed: 0, pending: 0, issues: 0 };
        }
        
        if (check.status === 'completed') {
          techPerformance[techId].completed += 1;
        } else if (check.status === 'pending') {
          techPerformance[techId].pending += 1;
        } else if (check.status === 'issue_found') {
          techPerformance[techId].issues += 1;
        }
      });
      
      // Format for chart - convert to array, add names, and sort by completed checks
      const formattedData = Object.entries(techPerformance)
        .map(([techId, stats]) => ({
          name: technicianMap.get(techId) || 'Unknown Technician',
          ...stats,
          total: stats.completed + stats.pending + stats.issues
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, isMobile ? 5 : 7); // Show more technicians
      
      // If no data, add sample data for preview
      if (formattedData.length === 0) {
        setChartData(getSampleData(isMobile));
      } else {
        setChartData(formattedData);
      }
    } else {
      // Add sample data for preview when no data is available
      setChartData(getSampleData(isMobile));
    }
  }, [maintenanceData, technicians, isMobile]);

  return { chartData, isLoading };
}

// Helper function to get sample data
function getSampleData(isMobile: boolean): Array<TechnicianStats> {
  const sampleData = [
    { name: "Filip Carter", completed: 28, pending: 5, issues: 2, total: 35 },
    { name: "Emma Johnson", completed: 22, pending: 3, issues: 1, total: 26 },
    { name: "David Smith", completed: 18, pending: 7, issues: 3, total: 28 },
    { name: "Sarah Brown", completed: 15, pending: 2, issues: 0, total: 17 },
    { name: "Michael Davis", completed: 12, pending: 4, issues: 1, total: 17 }
  ];
  
  if (!isMobile) {
    sampleData.push(
      { name: "Carlos Rodriguez", completed: 10, pending: 3, issues: 2, total: 15 },
      { name: "Lisa Wilson", completed: 8, pending: 2, issues: 0, total: 10 }
    );
  }
  
  return sampleData.slice(0, isMobile ? 5 : 7);
}

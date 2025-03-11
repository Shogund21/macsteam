
import { useQuery } from "@tanstack/react-query";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";

const TechnicianPerformance = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);

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
      return data;
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
      return data;
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
        .slice(0, 5); // Show top 5 technicians by volume
      
      setChartData(formattedData);
    }
  }, [maintenanceData, technicians]);

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center">No technician performance data available</div>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 100,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" name="Completed" fill="#00C49F" />
          <Bar dataKey="pending" name="Pending" fill="#FFBB28" />
          <Bar dataKey="issues" name="Issues Found" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TechnicianPerformance;

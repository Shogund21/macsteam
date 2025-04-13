
import { useQuery } from "@tanstack/react-query";
import PieChart from "@/components/charts/PieChart";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";

// Colors for the pie chart segments
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const MaintenanceCompletionRate = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);

  const { data: maintenanceData, isLoading } = useQuery({
    queryKey: ['maintenance_checks', dateRange],
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
    if (maintenanceData && maintenanceData.length > 0) {
      // Group maintenance checks by status
      const statusCounts: Record<string, number> = {
        'completed': 0,
        'pending': 0,
        'issue_found': 0
      };
      
      maintenanceData.forEach(check => {
        const status = check.status || 'pending';
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
      
      // Format for chart
      const data = [
        { name: 'Completed', value: statusCounts.completed },
        { name: 'Pending', value: statusCounts.pending },
        { name: 'Issues Found', value: statusCounts.issue_found }
      ].filter(item => item.value > 0);
      
      setChartData(data);
    } else {
      // Sample data for preview when no data is available
      const sampleData = [
        { name: 'Completed', value: 80 },
        { name: 'Pending', value: 15 },
        { name: 'Issues Found', value: 5 }
      ];
      setChartData(sampleData);
    }
  }, [maintenanceData]);

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[300px]">Loading chart data...</div>;
  }

  // Calculate total for percentages
  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className="chart-container">
      <PieChart 
        data={chartData}
        colors={COLORS}
        donut={true}
        height={450}
        tooltipFormatter={(value, name) => [
          `${value} (${((value / total) * 100).toFixed(0)}%)`, 
          name
        ]}
      />
    </div>
  );
};

export default MaintenanceCompletionRate;

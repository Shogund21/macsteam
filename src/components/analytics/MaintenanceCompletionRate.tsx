
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";

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
      return data;
    },
  });

  useEffect(() => {
    if (maintenanceData) {
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
    }
  }, [maintenanceData]);

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center">No maintenance data available</div>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={75}
            innerRadius={0}
            paddingAngle={2}
            fill="#8884d8"
            dataKey="value"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} checks`, name]}
            contentStyle={{ 
              fontSize: '14px', 
              fontWeight: 'medium', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
            }} 
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{
              fontSize: '14px',
              fontWeight: 'medium',
              paddingTop: '20px',
              paddingBottom: '10px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaintenanceCompletionRate;


import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const MaintenanceCompletionRate = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);
  const isMobile = useIsMobile();

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
    return <div className="flex items-center justify-center h-full min-h-[200px]">Loading chart data...</div>;
  }

  return (
    <div className="h-72 md:h-96 w-full chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%" 
            labelLine={true}
            outerRadius={isMobile ? 65 : 85}
            innerRadius={isMobile ? 35 : 45}
            paddingAngle={2}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fill="#333"
                  fontSize={12}
                  fontWeight="bold"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value} checks`, name]}
            contentStyle={{ 
              fontSize: isMobile ? '12px' : '14px', 
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
              fontSize: isMobile ? '11px' : '13px',
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

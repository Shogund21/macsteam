
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";
import { useCompanyFilter } from "@/hooks/useCompanyFilter";
import { useIsMobile } from "@/hooks/use-mobile";

// Updated colors for better contrast
const COLORS = ['#4299E1', '#48BB78', '#F6AD55', '#F56565', '#805AD5', '#DD6B20', '#38B2AC'];

const EquipmentStatusChart = () => {
  const { dateRange } = useAnalyticsFilters();
  const { companyId } = useCompanyFilter();
  const [chartData, setChartData] = useState<any[]>([]);
  const isMobile = useIsMobile();

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment', dateRange, companyId],
    queryFn: async () => {
      let query = supabase
        .from('equipment')
        .select('*');
      
      // Apply company filter if available
      if (companyId) {
        query = query.eq('company_id', companyId);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data || [];
    },
  });

  useEffect(() => {
    if (equipmentData && equipmentData.length > 0) {
      // Count equipment by status and ensure unique entries
      const statusMap = new Map<string, number>();
      
      equipmentData.forEach(eq => {
        const status = eq.status || 'Unknown';
        statusMap.set(status, (statusMap.get(status) || 0) + 1);
      });
      
      // Convert to chart data format
      const data = Array.from(statusMap.entries()).map(([name, value]) => ({
        name,
        value
      }));
      
      // Sort by value in descending order for better visualization
      data.sort((a, b) => b.value - a.value);
      
      // Limit to top statuses for mobile
      setChartData(isMobile ? data.slice(0, 4) : data.slice(0, 6));
    } else {
      // Sample data for preview when no data is available
      const sampleData = [
        { name: "Operational", value: 35 },
        { name: "Working", value: 25 },
        { name: "Offline", value: 15 },
        { name: "Unknown", value: 13 },
        { name: "active", value: 7 },
        { name: "Maintenance", value: 5 }
      ];
      setChartData(isMobile ? sampleData.slice(0, 4) : sampleData);
    }
  }, [equipmentData, isMobile]);

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[250px]">Loading chart data...</div>;
  }

  // Calculate total equipment count for percentage calculation
  const totalEquipment = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[300px] md:h-[350px] w-full chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="42%"
            labelLine={false}
            outerRadius={isMobile ? 70 : 85}
            innerRadius={0}
            paddingAngle={3}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => {
              // Only show label for segments that are significant enough (>5%)
              if (percent < 0.05) return null;
              return `${name}: ${(percent * 100).toFixed(0)}%`;
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [
              `${value} (${((value as number / totalEquipment) * 100).toFixed(1)}%)`, 
              name
            ]}
            contentStyle={{ 
              fontSize: isMobile ? '12px' : '14px', 
              fontWeight: 'medium', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
            }} 
          />
          <Legend 
            layout={isMobile ? "horizontal" : "vertical"}
            align={isMobile ? "center" : "right"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            iconSize={10}
            iconType="circle"
            formatter={(value) => {
              const limit = isMobile ? 8 : 14;
              return value.length > limit ? `${value.slice(0, limit)}...` : value;
            }}
            wrapperStyle={{
              fontSize: isMobile ? '10px' : '12px',
              fontWeight: 'medium',
              lineHeight: '1.2em',
              paddingLeft: isMobile ? '0' : '10px',
              paddingTop: isMobile ? '10px' : '0',
              width: '100%'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquipmentStatusChart;

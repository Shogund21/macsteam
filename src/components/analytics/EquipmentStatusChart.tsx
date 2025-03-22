
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAnalyticsFilters } from "./AnalyticsFilterContext";
import { useState, useEffect } from "react";

// Updated colors for better contrast and distinctiveness
const COLORS = ['#4299E1', '#48BB78', '#F6AD55', '#F56565', '#805AD5', '#DD6B20', '#38B2AC'];

const EquipmentStatusChart = () => {
  const { dateRange } = useAnalyticsFilters();
  const [chartData, setChartData] = useState<any[]>([]);

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment', dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  useEffect(() => {
    if (equipmentData) {
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
      
      setChartData(data);
    }
  }, [equipmentData]);

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center">No equipment status data available</div>;
  }

  // Calculate total equipment count for percentage calculation
  const totalEquipment = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-72"> {/* Increased height for better spacing */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={75}
            innerRadius={0}
            paddingAngle={3}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
              // Only show percentage for items that are significant enough (>3%)
              if (percent < 0.03) return null;
              
              const radius = outerRadius * 0.8;
              const radian = Math.PI / 180;
              const x = cx + radius * Math.cos(-midAngle * radian);
              const y = cy + radius * Math.sin(-midAngle * radian);
              
              return (
                <text 
                  x={x} 
                  y={y} 
                  fill="#333"
                  textAnchor="middle" 
                  dominantBaseline="central"
                  className="font-semibold text-xs"
                  style={{ textShadow: '0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white' }}
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
            formatter={(value, name) => [
              `${value} (${((value as number / totalEquipment) * 100).toFixed(1)}%)`, 
              name
            ]}
            contentStyle={{ 
              fontSize: '14px', 
              fontWeight: 'medium', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
            }} 
          />
          <Legend 
            layout="vertical" 
            align="right"
            verticalAlign="middle"
            iconSize={10}
            iconType="circle"
            wrapperStyle={{
              fontSize: '13px',
              fontWeight: 'medium',
              lineHeight: '1.2em',
              paddingLeft: '10px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquipmentStatusChart;

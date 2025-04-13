
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
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const LocationBreakdown = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const isMobile = useIsMobile();

  const { data: equipmentData, isLoading } = useQuery({
    queryKey: ['equipment_by_location'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data || [];
    },
  });

  useEffect(() => {
    if (equipmentData) {
      // Group equipment by location
      const locationCounts: Record<string, number> = {};
      
      equipmentData.forEach(eq => {
        const location = eq.location || 'Unknown';
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      });
      
      // Convert to chart data format and sort by count (descending)
      const data = Object.entries(locationCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, isMobile ? 4 : 6); // Show fewer locations on mobile
      
      setChartData(data);
    }
    
    // If no data or empty data, use sample data for preview
    if (!equipmentData || equipmentData.length === 0) {
      const sampleData = [
        { name: "Main Building", value: 24 },
        { name: "North Wing", value: 18 },
        { name: "South Wing", value: 15 },
        { name: "East Block", value: 12 },
        { name: isMobile ? "Others" : "West Block", value: 9 },
        { name: "Data Center", value: 6 }
      ].slice(0, isMobile ? 4 : 6);
      setChartData(sampleData);
    }
  }, [equipmentData, isMobile]);

  if (isLoading && chartData.length === 0) {
    return <div className="flex items-center justify-center h-full min-h-[250px]">Loading chart data...</div>;
  }

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 20,
            right: isMobile ? 50 : 80,
            left: isMobile ? 100 : 140,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={isMobile ? 100 : 140} 
            tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, fill: '#333' }}
            tickFormatter={(value) => {
              // Truncate long location names
              const limit = isMobile ? 10 : 16;
              return value.length > limit ? `${value.slice(0, limit)}...` : value;
            }}
          />
          <Tooltip 
            formatter={(value) => [`${value} equipment`, 'Count']}
            contentStyle={{ 
              fontSize: isMobile ? '12px' : '14px', 
              fontWeight: 'medium', 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '11px' : '13px', 
              fontWeight: 'medium',
              paddingTop: '15px'
            }}
            verticalAlign="bottom"
            align="center"
          />
          <Bar 
            dataKey="value" 
            name="Equipment Count" 
            fill="#8884d8" 
            label={{ 
              position: 'right', 
              fontSize: isMobile ? 11 : 12,
              fontWeight: 'bold',
              fill: '#333',
              offset: 5,
              formatter: (value) => value.toString()
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationBreakdown;

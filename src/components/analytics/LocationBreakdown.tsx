
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

const LocationBreakdown = () => {
  const [chartData, setChartData] = useState<any[]>([]);

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
        .slice(0, 6); // Show top 6 locations
      
      setChartData(data);
    }
    
    // If no data or empty data, use sample data for preview
    if (!equipmentData || equipmentData.length === 0) {
      const sampleData = [
        { name: "Main Building", value: 24 },
        { name: "North Wing", value: 18 },
        { name: "South Wing", value: 15 },
        { name: "East Block", value: 12 },
        { name: "West Block", value: 9 },
        { name: "Data Center", value: 6 }
      ];
      setChartData(sampleData);
    }
  }, [equipmentData]);

  if (isLoading && chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center">Loading chart data...</div>;
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
            left: 120, // Increased for better visibility
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tick={{ fontSize: 12, fontWeight: 600 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={120} 
            tick={{ fontSize: 13, fontWeight: 600, fill: '#333' }}
          />
          <Tooltip 
            formatter={(value) => [`${value} equipment`, 'Count']}
            contentStyle={{ 
              fontSize: '14px', 
              fontWeight: 'medium', 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: '14px', 
              fontWeight: 'medium',
              paddingTop: '10px'
            }}
          />
          <Bar 
            dataKey="value" 
            name="Equipment Count" 
            fill="#8884d8" 
            label={{ 
              position: 'right', 
              fontSize: 13,
              fontWeight: 'bold',
              fill: '#333'
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationBreakdown;

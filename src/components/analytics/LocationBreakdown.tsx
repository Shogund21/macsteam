
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
      return data;
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
  }, [equipmentData]);

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center">Loading chart data...</div>;
  }

  if (chartData.length === 0) {
    return <div className="h-64 flex items-center justify-center">No location data available</div>;
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
            left: 80,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip formatter={(value) => [`${value} equipment`, 'Count']} />
          <Legend />
          <Bar dataKey="value" name="Equipment Count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LocationBreakdown;

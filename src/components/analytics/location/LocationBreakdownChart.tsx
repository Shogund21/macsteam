
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LabelList
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { LocationBreakdownData } from "./useLocationBreakdownData";

interface LocationBreakdownChartProps {
  data: LocationBreakdownData[];
}

const LocationBreakdownChart: React.FC<LocationBreakdownChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: isMobile ? 40 : 90,
          left: isMobile ? 120 : 150,
          bottom: isMobile ? 50 : 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600 }}
          domain={[0, 'dataMax + 5']} // Add some extra space on the right
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, fill: '#333' }} 
          width={isMobile ? 120 : 150}
          tickFormatter={(value) => {
            // Increase character limit to show more location information
            const limit = isMobile ? 15 : 20;
            return value.length > limit ? `${value.slice(0, limit)}...` : value;
          }}
        />
        <Tooltip 
          contentStyle={{ 
            fontSize: isMobile ? '12px' : '14px', 
            fontWeight: 'medium', 
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }} 
          formatter={(value) => [`${value} equipment`, 'Count']}
        />
        <Bar 
          dataKey="value" 
          name="Equipment Count" 
          fill="#7E69AB" 
          radius={[3, 3, 0, 0]}
        >
          <LabelList 
            dataKey="value" 
            position="right" 
            style={{ 
              fontSize: 11,
              fontWeight: 'bold',
              fill: '#333'
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LocationBreakdownChart;

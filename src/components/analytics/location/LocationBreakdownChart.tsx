
import React from "react";
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
          right: isMobile ? 70 : 120,
          left: isMobile ? 120 : 150,
          bottom: isMobile ? 80 : 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600 }}
          domain={[0, 'dataMax + 5']} 
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          width={isMobile ? 120 : 150} 
          tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, fill: '#333' }}
          tickFormatter={(value) => {
            const limit = isMobile ? 12 : 18;
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
            paddingTop: '25px',
            width: '100%',
            paddingBottom: isMobile ? '15px' : '5px'
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
            offset: isMobile ? 10 : 15,
            formatter: (value) => value.toString()
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LocationBreakdownChart;

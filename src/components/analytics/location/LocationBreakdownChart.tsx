
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: isMobile ? 50 : 100,
          left: isMobile ? 120 : 150,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 500 }}
          domain={[0, 'dataMax + 5']} 
          padding={{ left: 0, right: 10 }}
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 500, fill: '#333' }} 
          width={isMobile ? 120 : 150}
          tickFormatter={(value) => {
            const limit = isMobile ? 16 : 20;
            return value.length > limit ? `${value.slice(0, limit)}...` : value;
          }}
          scale="band"
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
          wrapperStyle={{ zIndex: 1000 }}
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
            offset={8}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LocationBreakdownChart;


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

interface TechnicianStatsData {
  name: string;
  completed: number;
  pending: number;
  issues: number;
  total: number;
}

interface TechnicianPerformanceChartProps {
  data: TechnicianStatsData[];
}

const TechnicianPerformanceChart: React.FC<TechnicianPerformanceChartProps> = ({ data }) => {
  const isMobile = useIsMobile();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20,
          right: isMobile ? 20 : 70,
          left: isMobile ? 100 : 130,
          bottom: isMobile ? 70 : 40,
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
          width={isMobile ? 100 : 130}
          tickFormatter={(value) => {
            // Truncate long names
            const limit = isMobile ? 12 : 18;
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
        />
        <Legend 
          wrapperStyle={{ 
            fontSize: isMobile ? '11px' : '13px', 
            fontWeight: 'medium',
            paddingTop: '25px'
          }}
          verticalAlign="bottom"
          align="center"
          layout="horizontal"
        />
        <Bar dataKey="completed" name="Completed" fill="#00C49F" />
        <Bar dataKey="pending" name="Pending" fill="#FFBB28" />
        <Bar dataKey="issues" name="Issues Found" fill="#FF8042" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TechnicianPerformanceChart;

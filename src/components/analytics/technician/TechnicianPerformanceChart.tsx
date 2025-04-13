
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
    <div className="w-full h-full overflow-visible">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: isMobile ? 70 : 120,
            left: isMobile ? 130 : 160,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600 }}
            domain={[0, 'dataMax + 12']} 
            padding={{ left: 0, right: 10 }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            tick={{ fontSize: isMobile ? 11 : 12, fontWeight: 600, fill: '#333' }} 
            width={isMobile ? 130 : 160}
            tickFormatter={(value) => {
              const limit = isMobile ? 18 : 22;
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
            wrapperStyle={{ zIndex: 1000 }}
          />
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '11px' : '13px', 
              fontWeight: 'medium',
              paddingTop: '20px'
            }}
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            margin={{ top: 10 }}
          />
          <Bar 
            dataKey="completed" 
            name="Completed" 
            fill="#4CAF50" 
            radius={[3, 3, 0, 0]}
          >
            <LabelList 
              dataKey="completed" 
              position="right" 
              style={{ fontSize: 10, fontWeight: 'bold', fill: '#333' }}
              offset={5}
            />
          </Bar>
          <Bar 
            dataKey="pending" 
            name="Pending" 
            fill="#FFC107" 
            radius={[3, 3, 0, 0]}
          >
            <LabelList 
              dataKey="pending" 
              position="right" 
              style={{ fontSize: 10, fontWeight: 'bold', fill: '#333' }}
              offset={5}
            />
          </Bar>
          <Bar 
            dataKey="issues" 
            name="Issues Found" 
            fill="#FF7043" 
            radius={[3, 3, 0, 0]}
          >
            <LabelList 
              dataKey="issues" 
              position="right" 
              style={{ fontSize: 10, fontWeight: 'bold', fill: '#333' }}
              offset={5}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TechnicianPerformanceChart;

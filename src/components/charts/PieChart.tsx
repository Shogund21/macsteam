
import React from "react";
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ChartTooltip from "./ChartTooltip";

export interface PieChartDataItem {
  name: string;
  value: number;
  [key: string]: string | number; // Add index signature
}

interface PieChartProps {
  data: PieChartDataItem[];
  colors: string[];
  height?: number;
  className?: string;
  donut?: boolean;
  tooltipFormatter?: (value: number, name: string) => [string, string]; // Fixed signature
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  colors,
  height = 400,
  className = "",
  donut = false,
  tooltipFormatter
}) => {
  const isMobile = useIsMobile();
  
  // Calculate total for percentages
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  // Default formatter shows percentage
  const defaultFormatter = (value: number, name: string): [string, string] => {
    return [`${value} (${((value / total) * 100).toFixed(0)}%)`, name];
  };
  
  const margins = {
    top: 20,
    right: 20,
    left: 20,
    bottom: isMobile ? 60 : 50,
  };

  return (
    <div className={`w-full h-[${height}px] overflow-visible ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={margins}>
          <Pie
            data={data}
            cx="50%"
            cy="45%" 
            labelLine={true}
            outerRadius={isMobile ? 110 : 140}
            innerRadius={donut ? (isMobile ? 60 : 80) : 0}
            paddingAngle={donut ? 4 : 3}
            dataKey="value"
            label={({ name, percent }) => {
              // Only show label if segment is large enough
              if (percent < 0.08 && isMobile) return null;
              return `${name}: ${(percent * 100).toFixed(0)}%`;
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          
          <Tooltip 
            content={
              <ChartTooltip formatter={tooltipFormatter || defaultFormatter} />
            }
          />
          
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            formatter={(value) => {
              const limit = isMobile ? 12 : 16;
              return value.length > limit ? `${value.slice(0, limit)}...` : value;
            }}
            wrapperStyle={{
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: 'medium',
              paddingTop: '20px',
              width: '100%',
              marginBottom: isMobile ? '15px' : '0'
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;

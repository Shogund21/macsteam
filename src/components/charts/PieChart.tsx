
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
  [key: string]: string | number;
}

interface PieChartProps {
  data: PieChartDataItem[];
  colors: string[];
  height?: number;
  className?: string;
  donut?: boolean;
  tooltipFormatter?: (value: any, name: string) => [string, string];
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
  
  // Truncate long names for better readability
  const truncateName = (value: string): string => {
    if (!value || typeof value !== 'string') return '';
    const limit = isMobile ? 10 : 16;
    return value.length > limit ? `${value.slice(0, limit)}...` : value;
  };
  
  // Improved margins for better visibility
  const margins = {
    top: 20,
    right: 20,
    left: 20,
    bottom: isMobile ? 50 : 20,
  };

  // Ensure we have data to display
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50 rounded-md border border-gray-100">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`} style={{ height: height || 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart margin={margins}>
          <Pie
            data={data}
            cx="50%"
            cy="45%" 
            labelLine={donut}
            outerRadius={isMobile ? 80 : 100}
            innerRadius={donut ? (isMobile ? 50 : 65) : 0}
            paddingAngle={donut ? 3 : 2}
            dataKey="value"
            label={({ name, percent }) => {
              // Only show label if segment is large enough
              if (percent < 0.08) return null;
              return `${(percent * 100).toFixed(0)}%`;
            }}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                stroke="#fff"
                strokeWidth={1.5}
              />
            ))}
          </Pie>
          
          <Tooltip 
            content={
              <ChartTooltip formatter={tooltipFormatter || defaultFormatter} />
            }
            wrapperStyle={{ zIndex: 10 }}
          />
          
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            iconSize={10}
            formatter={(value) => truncateName(value as string)}
            wrapperStyle={{
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 'medium',
              paddingTop: '10px',
              width: '100%'
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;

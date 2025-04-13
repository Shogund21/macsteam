
import React from "react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Label
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ChartTooltip from "./ChartTooltip";

export interface BarChartDataItem {
  name: string;
  [key: string]: string | number;
}

export interface BarSeriesConfig {
  dataKey: string;
  name: string;
  fill: string;
  showLabel?: boolean;
}

interface BarChartProps {
  data: BarChartDataItem[];
  series: BarSeriesConfig[];
  layout?: "vertical" | "horizontal";
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
  tooltipFormatter?: (value: any, name: string) => [string, string];
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  series, 
  layout = "horizontal",
  xAxisLabel,
  yAxisLabel,
  height,
  className = "",
  tooltipFormatter
}) => {
  const isMobile = useIsMobile();
  
  const isVertical = layout === "vertical";

  // Truncate long names for better readability
  const truncateName = (name: string): string => {
    if (!name || typeof name !== 'string') return '';
    const limit = isMobile ? 10 : 15;
    return name.length > limit ? `${name.slice(0, limit)}...` : name;
  };
  
  // Improved margins for better visibility
  const margins = {
    top: 10,
    right: isVertical ? (isMobile ? 30 : 40) : 10,
    left: isVertical ? (isMobile ? 80 : 100) : 10,
    bottom: isMobile ? 50 : 25,
  };
  
  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={margins}
          barSize={isVertical ? (isMobile ? 10 : 15) : undefined}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          
          {/* Configure X axis based on layout */}
          <XAxis 
            type={isVertical ? "number" : "category"} 
            dataKey={isVertical ? undefined : "name"}
            tick={{ 
              fontSize: isMobile ? 9 : 11, 
              fontWeight: 500,
              fill: '#333333'
            }}
            height={isMobile ? 50 : 30}
            domain={isVertical ? [0, 'dataMax + 5'] : undefined}
            angle={isMobile && !isVertical ? -45 : 0}
            textAnchor={isMobile && !isVertical ? "end" : "middle"}
            interval={isVertical ? undefined : 0}
            tickFormatter={
              isVertical ? undefined : truncateName
            }
          />
          
          {/* Configure Y axis based on layout */}
          <YAxis 
            type={isVertical ? "category" : "number"}
            dataKey={isVertical ? "name" : undefined} 
            width={isVertical ? (isMobile ? 80 : 100) : 30}
            tick={{ 
              fontSize: isMobile ? 9 : 11,
              fontWeight: 500,
              fill: '#333333'
            }}
            tickFormatter={
              isVertical ? truncateName : undefined
            }
            tickCount={7}
          />
          
          <Tooltip 
            content={<ChartTooltip formatter={tooltipFormatter} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 'medium',
              paddingTop: '10px'
            }}
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            iconSize={8}
          />
          
          {/* Render bars for each series with better styling */}
          {series.map((s) => (
            <Bar 
              key={s.dataKey} 
              dataKey={s.dataKey} 
              name={s.name} 
              fill={s.fill}
              radius={[2, 2, 0, 0]}
              label={s.showLabel ? {
                position: isVertical ? 'right' : 'top',
                fontSize: isMobile ? 9 : 10,
                fontWeight: 'bold',
                fill: '#333333',
                offset: 5,
                formatter: (value) => value || ''
              } : false}
              stroke="#ffffff"
              strokeWidth={1}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;

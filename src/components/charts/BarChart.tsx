
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
  [key: string]: string | number; // Index signature for string keys
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
  height = 280,
  className = "",
  tooltipFormatter
}) => {
  const isMobile = useIsMobile();
  
  const isVertical = layout === "vertical";
  
  // Improved margins for better visibility
  const margins = {
    top: 5,
    right: isVertical ? (isMobile ? 30 : 50) : 10,
    left: isVertical ? (isMobile ? 100 : 120) : (isMobile ? 10 : 30),
    bottom: isMobile ? 50 : 30,
  };
  
  // Truncate long names for better readability
  const truncateName = (name: string): string => {
    if (!name || typeof name !== 'string') return '';
    const limit = isMobile ? 8 : 12;
    return name.length > limit ? `${name.slice(0, limit)}...` : name;
  };
  
  return (
    <div className={`w-full h-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={margins}
          barGap={isMobile ? 2 : 4}
          barCategoryGap={isMobile ? 4 : 8}
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
            axisLine={{ stroke: '#cccccc', strokeWidth: 1 }}
            tickLine={{ stroke: '#cccccc' }}
          >
            {xAxisLabel && !isMobile && (
              <Label 
                value={xAxisLabel} 
                position="insideBottom" 
                offset={-10}
                style={{ textAnchor: 'middle', fontSize: 11, fill: '#555555', fontWeight: 600 }}
              />
            )}
          </XAxis>
          
          {/* Configure Y axis based on layout */}
          <YAxis 
            type={isVertical ? "category" : "number"}
            dataKey={isVertical ? "name" : undefined} 
            width={isVertical ? (isMobile ? 90 : 110) : (isMobile ? 30 : 40)}
            tick={{ 
              fontSize: isMobile ? 9 : 11,
              fontWeight: 500,
              fill: '#333333'
            }}
            tickFormatter={
              isVertical ? truncateName : undefined
            }
            axisLine={{ stroke: '#cccccc', strokeWidth: 1 }}
            tickLine={{ stroke: '#cccccc' }}
            tickCount={7}
          >
            {yAxisLabel && !isMobile && (
              <Label 
                value={yAxisLabel} 
                angle={-90} 
                position="insideLeft" 
                offset={-5}
                style={{ textAnchor: 'middle', fontSize: 11, fill: '#555555', fontWeight: 600 }}
              />
            )}
          </YAxis>
          
          <Tooltip 
            content={<ChartTooltip formatter={tooltipFormatter} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '10px' : '11px',
              fontWeight: 'medium',
              paddingTop: '10px',
              width: '100%'
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

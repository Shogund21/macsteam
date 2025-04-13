
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
  height = 400,
  className = "",
  tooltipFormatter
}) => {
  const isMobile = useIsMobile();
  
  const isVertical = layout === "vertical";
  
  // Improved margins for better visibility
  const margins = {
    top: 20,
    right: isVertical ? (isMobile ? 60 : 100) : 30,
    left: isVertical ? (isMobile ? 120 : 160) : (isMobile ? 20 : 50),
    bottom: isMobile ? 80 : 60,
  };
  
  // Truncate long names for better readability
  const truncateName = (name: string): string => {
    if (!name || typeof name !== 'string') return '';
    const limit = isMobile ? 10 : 15;
    return name.length > limit ? `${name.slice(0, limit)}...` : name;
  };
  
  return (
    <div className={`w-full h-[${height}px] overflow-visible ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={margins}
          barGap={isMobile ? 2 : 6}
          barCategoryGap={isMobile ? 5 : 10}
          barSize={isVertical ? (isMobile ? 12 : 18) : undefined}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          
          {/* Configure X axis based on layout */}
          <XAxis 
            type={isVertical ? "number" : "category"} 
            dataKey={isVertical ? undefined : "name"}
            tick={{ 
              fontSize: isMobile ? 10 : 12, 
              fontWeight: 500,
              fill: '#333333'
            }}
            height={isMobile ? 70 : 50}
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
                offset={-15}
                style={{ textAnchor: 'middle', fontSize: 12, fill: '#555555', fontWeight: 600 }}
              />
            )}
          </XAxis>
          
          {/* Configure Y axis based on layout */}
          <YAxis 
            type={isVertical ? "category" : "number"}
            dataKey={isVertical ? "name" : undefined} 
            width={isVertical ? (isMobile ? 110 : 150) : (isMobile ? 40 : 50)}
            tick={{ 
              fontSize: isMobile ? 10 : 12,
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
                offset={-10}
                style={{ textAnchor: 'middle', fontSize: 12, fill: '#555555', fontWeight: 600 }}
              />
            )}
          </YAxis>
          
          <Tooltip 
            content={<ChartTooltip formatter={tooltipFormatter} />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          />
          
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '11px' : '12px',
              fontWeight: 'medium',
              paddingTop: '15px',
              paddingBottom: isMobile ? '20px' : '10px'
            }}
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            iconSize={10}
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
                fontSize: isMobile ? 10 : 11,
                fontWeight: 'bold',
                fill: '#333333',
                offset: 10,
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

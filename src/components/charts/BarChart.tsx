
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
  
  // Adjusted margins based on layout
  const margins = {
    top: 20,
    right: isVertical ? (isMobile ? 45 : 80) : 20,
    left: isVertical ? (isMobile ? 150 : 180) : (isMobile ? 10 : 40),
    bottom: isMobile ? 60 : 50,
  };
  
  // Truncate long names for better readability
  const truncateName = (name: string): string => {
    if (!name || typeof name !== 'string') return '';
    const limit = isMobile ? 12 : 18;
    return name.length > limit ? `${name.slice(0, limit)}...` : name;
  };
  
  return (
    <div className={`w-full h-[${height}px] overflow-visible ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={margins}
          barGap={isMobile ? 2 : 4}
          barSize={isVertical ? (isMobile ? 12 : 20) : undefined}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          
          {/* Configure X axis based on layout */}
          <XAxis 
            type={isVertical ? "number" : "category"} 
            dataKey={isVertical ? undefined : "name"}
            tick={{ 
              fontSize: isMobile ? 10 : 12, 
              fontWeight: 500,
              fill: '#333'
            }}
            height={isMobile ? 60 : 30}
            domain={isVertical ? [0, 'dataMax + 5'] : undefined}
            angle={isMobile && !isVertical ? -45 : 0}
            textAnchor={isMobile && !isVertical ? "end" : "middle"}
            interval={isVertical ? undefined : 0}
            tickFormatter={
              isVertical ? undefined : truncateName
            }
            axisLine={{ stroke: '#E0E0E0' }}
          >
            {xAxisLabel && !isMobile && (
              <Label 
                value={xAxisLabel} 
                position="insideBottom" 
                offset={-10}
                style={{ textAnchor: 'middle', fontSize: 12 }}
              />
            )}
          </XAxis>
          
          {/* Configure Y axis based on layout */}
          <YAxis 
            type={isVertical ? "category" : "number"}
            dataKey={isVertical ? "name" : undefined} 
            width={isVertical ? (isMobile ? 140 : 170) : 50}
            tick={{ 
              fontSize: isMobile ? 10 : 12,
              fontWeight: 500,
              fill: '#333'
            }}
            tickFormatter={
              isVertical ? truncateName : undefined
            }
            axisLine={{ stroke: '#E0E0E0' }}
          >
            {yAxisLabel && !isMobile && (
              <Label 
                value={yAxisLabel} 
                angle={-90} 
                position="insideLeft" 
                style={{ textAnchor: 'middle', fontSize: 12 }}
              />
            )}
          </YAxis>
          
          <Tooltip 
            content={<ChartTooltip formatter={tooltipFormatter} />}
          />
          
          <Legend 
            wrapperStyle={{ 
              fontSize: isMobile ? '11px' : '12px',
              fontWeight: 'medium',
              paddingTop: '15px',
              width: '100%',
              paddingBottom: isMobile ? '10px' : '5px'
            }}
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            iconSize={8}
          />
          
          {/* Render bars for each series */}
          {series.map((s) => (
            <Bar 
              key={s.dataKey} 
              dataKey={s.dataKey} 
              name={s.name} 
              fill={s.fill}
              radius={[2, 2, 0, 0]}
              label={s.showLabel ? {
                position: isVertical ? 'right' : 'top',
                fontSize: isMobile ? 9 : 11,
                fontWeight: 'bold',
                fill: '#333',
                offset: isMobile ? 5 : 10,
                formatter: (value) => value || ''
              } : false}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;

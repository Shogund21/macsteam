
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
  tooltipFormatter?: (value: number, name: string) => [string, string];
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
  
  // Default margins based on layout and mobile state
  const margins = {
    top: 20,
    right: isMobile ? (isVertical ? 80 : 20) : (isVertical ? 120 : 40),
    left: isMobile ? (isVertical ? 120 : 20) : (isVertical ? 150 : 40),
    bottom: isMobile ? 80 : 60,
  };
  
  return (
    <div className={`w-full h-[${height}px] overflow-visible ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={margins}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* Configure X axis based on layout */}
          <XAxis 
            type={isVertical ? "number" : "category"} 
            dataKey={isVertical ? undefined : "name"}
            tick={{ 
              fontSize: isMobile ? 11 : 12, 
              fontWeight: 600,
              fill: '#333'
            }}
            height={isMobile ? 60 : 30}
            domain={isVertical ? [0, 'dataMax + 5'] : undefined}
            angle={isMobile && !isVertical ? -45 : 0}
            textAnchor={isMobile && !isVertical ? "end" : "middle"}
            interval={isVertical ? undefined : 0}
            tickFormatter={
              isVertical ? undefined :
              (value) => {
                const limit = isMobile ? 12 : 18;
                return value && typeof value === 'string' && value.length > limit ? 
                  `${value.slice(0, limit)}...` : value;
              }
            }
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
            width={isVertical ? (isMobile ? 120 : 150) : 50}
            tick={{ 
              fontSize: isMobile ? 11 : 12,
              fontWeight: 600,
              fill: '#333'
            }}
            tickFormatter={
              isVertical ? 
              (value) => {
                const limit = isMobile ? 12 : 18;
                return value && typeof value === 'string' && value.length > limit ? 
                  `${value.slice(0, limit)}...` : value;
              } : 
              undefined
            }
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
              fontSize: isMobile ? '11px' : '13px',
              fontWeight: 'medium',
              paddingTop: '25px',
              width: '100%',
              paddingBottom: isMobile ? '15px' : '5px'
            }}
            verticalAlign="bottom"
            align="center"
          />
          
          {/* Render bars for each series */}
          {series.map((s) => (
            <Bar 
              key={s.dataKey} 
              dataKey={s.dataKey} 
              name={s.name} 
              fill={s.fill}
              label={s.showLabel ? {
                position: isVertical ? 'right' : 'top',
                fontSize: isMobile ? 10 : 12,
                fontWeight: 'bold',
                fill: '#333',
                offset: isMobile ? 5 : 10,
              } : false}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;

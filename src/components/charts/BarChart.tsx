
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
  LabelList
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
    left: isVertical ? (isMobile ? 80 : 120) : 10,
    bottom: isMobile ? 60 : 30,
  };
  
  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={margins}
          barSize={isVertical ? (isMobile ? 12 : 18) : undefined}
          barGap={5}
          className="fill-current"
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
            height={isMobile ? 60 : 30}
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
            width={isVertical ? (isMobile ? 80 : 120) : 40}
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
            wrapperStyle={{ zIndex: 1000 }}
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
            iconSize={isMobile ? 6 : 8}
          />
          
          {/* Render bars for each series with better styling */}
          {series.map((s, index) => (
            <Bar 
              key={s.dataKey} 
              dataKey={s.dataKey} 
              name={s.name} 
              fill={s.fill}
              radius={[3, 3, 0, 0]}
              animationDuration={1000 + (index * 200)}
              animationBegin={300 + (index * 150)}
              stroke={s.fill}
              strokeWidth={0.5}
            >
              {s.showLabel && (
                <LabelList 
                  dataKey={s.dataKey} 
                  position={isVertical ? 'right' : 'top'} 
                  style={{ 
                    fontSize: isMobile ? 9 : 10,
                    fontWeight: 'bold',
                    fill: '#333333'
                  }}
                  formatter={(value) => value || ''}
                  offset={5}
                />
              )}
            </Bar>
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;

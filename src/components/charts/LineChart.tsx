
import React from "react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
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

export interface LineChartDataItem {
  name: string;
  [key: string]: string | number;
}

export interface LineSeriesConfig {
  dataKey: string;
  name: string;
  stroke: string;
  strokeWidth?: number;
  type?: "monotone" | "linear" | "step" | "stepBefore" | "stepAfter" | "basis" | "basisOpen" | "basisClosed" | "natural";
  dot?: boolean | object;
  activeDot?: boolean | object;
  hiddenOnMobile?: boolean;
}

interface LineChartProps {
  data: LineChartDataItem[];
  series: LineSeriesConfig[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
  tooltipFormatter?: (value: number, name: string) => [string, string];
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  xAxisLabel,
  yAxisLabel,
  height,
  className = "",
  tooltipFormatter
}) => {
  const isMobile = useIsMobile();
  
  const margins = {
    top: 20,
    right: isMobile ? 10 : 30,
    left: isMobile ? 0 : 20,
    bottom: isMobile ? 90 : 30,
  };

  // Ensure we have data to display
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px] w-full bg-gray-50 rounded-md border border-gray-100">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height={height || 350}>
        <RechartsLineChart
          data={data}
          margin={margins}
        >
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis 
            dataKey="name"
            height={isMobile ? 60 : 30}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            interval={0}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            padding={{ left: 10, right: 10 }}
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
          
          <YAxis 
            width={30}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            padding={{ top: 10, bottom: 10 }}
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
            wrapperStyle={{ zIndex: 10 }}
          />
          
          <Legend 
            wrapperStyle={{ 
              paddingTop: 20,
              fontSize: isMobile ? 10 : 12,
              marginBottom: isMobile ? 30 : 10
            }}
            iconSize={isMobile ? 8 : 10}
            verticalAlign="bottom"
          />
          
          {/* Render lines for each series */}
          {series.map((s) => {
            // Skip rendering this line on mobile if specified
            if (isMobile && s.hiddenOnMobile) {
              return null;
            }
            
            return (
              <Line 
                key={s.dataKey}
                type={s.type || "monotone"} 
                dataKey={s.dataKey} 
                name={s.name} 
                stroke={s.stroke} 
                strokeWidth={s.strokeWidth || 2}
                dot={s.dot === undefined ? { r: 3 } : s.dot}
                activeDot={s.activeDot || { r: 6 }}
                isAnimationActive={true}
              />
            );
          })}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;


import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface MaintenanceChartProps {
  chartData: any[];
}

const MaintenanceChart = ({ chartData }: MaintenanceChartProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-96 md:h-[450px] chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: isMobile ? 20 : 50,
            left: isMobile ? 10 : 30,
            bottom: isMobile ? 70 : 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={isMobile ? "monthShort" : "month"} 
            height={60}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            interval={0}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis 
            width={isMobile ? 35 : 50}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            padding={{ top: 10, bottom: 10 }}
            label={!isMobile ? { 
              value: "Checks", 
              angle: -90, 
              position: "insideLeft",
              style: { textAnchor: "middle", fontSize: 12 }
            } : undefined} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ 
              paddingTop: 15,
              fontSize: isMobile ? 10 : 12
            }}
            iconSize={isMobile ? 8 : 10}
            verticalAlign="bottom"
            align="center"
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            name="Total Checks" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
            dot={!isMobile}
          />
          <Line 
            type="monotone" 
            dataKey="completed" 
            name="Completed" 
            stroke="#00C49F" 
            strokeWidth={2}
            dot={!isMobile}
          />
          {!isMobile && (
            <>
              <Line 
                type="monotone" 
                dataKey="pending" 
                name="Pending" 
                stroke="#FFBB28" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="issues" 
                name="Issues Found" 
                stroke="#FF8042" 
                strokeWidth={2}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaintenanceChart;


import React from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => [string, string];
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, formatter }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-2 border border-gray-200 rounded-md shadow-lg z-50 max-w-[200px]">
      {label && <p className="font-semibold text-gray-800 text-xs mb-1">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, index) => {
          const [value, name] = formatter 
            ? formatter(entry.value, entry.name)
            : [entry.value, entry.name];
            
          return (
            <div 
              key={index} 
              className="flex items-center justify-between gap-1 text-xs"
            >
              <span className="flex items-center gap-1">
                <span 
                  className="w-2 h-2 rounded-sm inline-block" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium text-gray-700 truncate max-w-[100px]">
                  {name}:
                </span>
              </span>
              <span className="font-bold whitespace-nowrap text-right">
                {value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;

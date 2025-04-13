
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
    <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md max-w-[250px] z-[1000]">
      {label && <p className="font-semibold text-gray-800 text-sm mb-1">{label}</p>}
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const [value, name] = formatter 
            ? formatter(entry.value, entry.name)
            : [entry.value, entry.name];
            
          return (
            <p 
              key={index} 
              style={{ color: entry.color }} 
              className="text-xs flex items-center justify-between gap-2"
            >
              <span className="truncate max-w-[150px]">{name}:</span> 
              <span className="font-semibold whitespace-nowrap">{value}</span>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTooltip;

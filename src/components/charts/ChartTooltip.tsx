
import React from "react";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => [string, string]; // Consistent formatter signature
}

const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label, formatter }) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-md shadow-lg max-w-[250px] z-[1000]">
      {label && <p className="font-semibold text-gray-800 text-sm mb-2 border-b pb-1">{label}</p>}
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const [value, name] = formatter 
            ? formatter(entry.value, entry.name)
            : [entry.value, entry.name];
            
          return (
            <div 
              key={index} 
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-1.5">
                <span 
                  className="w-3 h-3 rounded-sm inline-block" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">
                  {name}:
                </span>
              </span>
              <span className="text-xs font-bold whitespace-nowrap">
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

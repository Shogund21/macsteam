
import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-md shadow-md max-w-[220px] z-50">
        <p className="font-semibold text-gray-800 text-sm mb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs flex items-center justify-between">
              <span>{entry.name}:</span> 
              <span className="font-semibold ml-2">{entry.value} checks</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;


import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/analytics/DateRangePicker";
import { RefreshCw, Download } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AnalyticsControlsProps {
  defaultDateRange: DateRange;
  isRefreshing: boolean;
  onRefresh: () => void;
  onExport: () => void;
}

const AnalyticsControls = ({ 
  defaultDateRange, 
  isRefreshing, 
  onRefresh, 
  onExport 
}: AnalyticsControlsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between bg-white/50 p-3 rounded-lg border border-gray-100">
      <DatePickerWithRange defaultDateRange={defaultDateRange} />
      <div className="flex gap-2 w-full sm:w-auto">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 sm:flex-none"
          onClick={onRefresh} 
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 sm:flex-none"
          onClick={onExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsControls;

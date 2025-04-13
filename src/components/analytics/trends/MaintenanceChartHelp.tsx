
import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MaintenanceChartHelp = () => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-md">
            <p>
              This graph displays the monthly trends of maintenance checks. It shows:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><span className="font-semibold text-[#8884d8]">Total Checks</span>: All maintenance activities performed each month</li>
              <li><span className="font-semibold text-[#4CAF50]">Completed</span>: Successfully completed maintenance checks</li>
              <li><span className="font-semibold text-[#FFC107]">Pending</span>: Scheduled but not yet completed checks</li>
              <li><span className="font-semibold text-[#FF7043]">Issues Found</span>: Checks that identified problems requiring attention</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-sm text-muted-foreground hidden md:inline-block">Hover for explanation</span>
    </div>
  );
};

export default MaintenanceChartHelp;

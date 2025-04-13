
import { Button } from "@/components/ui/button";
import { BarChart4, ListFilter } from "lucide-react";
import { useState } from "react";

interface AnalyticsHeaderProps {
  activeView: "charts" | "tables";
  setActiveView: (view: "charts" | "tables") => void;
}

const AnalyticsHeader = ({ activeView, setActiveView }: AnalyticsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-800 to-blue-700 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track performance metrics and gain insights from your maintenance data
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Button 
            variant={activeView === "charts" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveView("charts")}
            className="w-full sm:w-auto"
          >
            <BarChart4 className="mr-2 h-4 w-4" />
            Charts
          </Button>
          <Button 
            variant={activeView === "tables" ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveView("tables")}
            className="w-full sm:w-auto"
          >
            <ListFilter className="mr-2 h-4 w-4" />
            Tables
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;

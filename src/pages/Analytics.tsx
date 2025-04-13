
import Layout from "@/components/Layout";
import MaintenanceTrends from "@/components/analytics/MaintenanceTrends";
import EquipmentStatusChart from "@/components/analytics/EquipmentStatusChart";
import MaintenanceCompletionRate from "@/components/analytics/MaintenanceCompletionRate";
import TechnicianPerformance from "@/components/analytics/technician/TechnicianPerformance";
import LocationBreakdown from "@/components/analytics/location/LocationBreakdown";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Filter, ArrowUpDown, HelpCircle, BarChart4Icon, ListFilterIcon } from "lucide-react";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";
import { sub } from "date-fns";
import { AnalyticsFilterProvider } from "@/components/analytics/AnalyticsFilterContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Analytics = () => {
  // Default date range is last 30 days
  const defaultDateRange: DateRange = {
    from: sub(new Date(), { days: 30 }),
    to: new Date(),
  };
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeView, setActiveView] = useState<"charts" | "tables">("charts");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Analytics refreshed",
        description: "Chart data has been updated with the latest information."
      });
    }, 1000);
  };

  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Analytics data export feature will be implemented in a future update."
    });
  };

  return (
    <Layout>
      <AnalyticsFilterProvider>
        <div className="w-full max-w-full space-y-6 pb-20">
          {/* Header Section with modern styling */}
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
                  <BarChart4Icon className="mr-2 h-4 w-4" />
                  Charts
                </Button>
                <Button 
                  variant={activeView === "tables" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setActiveView("tables")}
                  className="w-full sm:w-auto"
                >
                  <ListFilterIcon className="mr-2 h-4 w-4" />
                  Tables
                </Button>
              </div>
            </div>
            
            {/* Controls Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between bg-white/50 p-3 rounded-lg border border-gray-100">
              <DatePickerWithRange defaultDateRange={defaultDateRange} />
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {activeView === "charts" ? (
            <>
              {/* Card-based layout for all charts */}
              <div className="grid grid-cols-1 gap-6">
                {/* Main Trends Chart - Full width */}
                <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-2">
                    <div className="flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-lg font-semibold">Maintenance Trends</CardTitle>
                        <CardDescription>Historical maintenance activity over time</CardDescription>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <HelpCircle className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>This chart shows maintenance activities over time, including completed, pending, and issues found.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-[400px] w-full">
                      <MaintenanceTrends />
                    </div>
                  </CardContent>
                </Card>

                {/* Two-column grid for secondary charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Equipment Status */}
                  <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">Equipment Status</CardTitle>
                          <CardDescription>Current status breakdown</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Distribution of equipment by current operational status</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[300px] w-full">
                        <EquipmentStatusChart />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Maintenance Completion Rate */}
                  <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">Completion Rate</CardTitle>
                          <CardDescription>Maintenance status overview</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Breakdown of maintenance tasks by completion status</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[300px] w-full">
                        <MaintenanceCompletionRate />
                      </div>
                    </CardContent>
                  </Card>
                
                  {/* Technician Performance */}
                  <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">Technician Performance</CardTitle>
                          <CardDescription>Maintenance by technician</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Comparison of completed, pending, and issues found by technician</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[300px] w-full">
                        <TechnicianPerformance />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Equipment by Location */}
                  <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg font-semibold">Equipment by Location</CardTitle>
                          <CardDescription>Distribution across sites</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Count of equipment items by location</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="h-[300px] w-full">
                        <LocationBreakdown />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center p-12 bg-white rounded-lg border shadow-sm">
              <div className="text-center">
                <p className="text-muted-foreground">Table view will be implemented in a future update.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveView("charts")} 
                  className="mt-4"
                >
                  Return to Charts
                </Button>
              </div>
            </div>
          )}
        </div>
      </AnalyticsFilterProvider>
    </Layout>
  );
};

export default Analytics;

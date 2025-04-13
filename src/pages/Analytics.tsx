
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import MaintenanceTrends from "@/components/analytics/MaintenanceTrends";
import EquipmentStatusChart from "@/components/analytics/EquipmentStatusChart";
import MaintenanceCompletionRate from "@/components/analytics/MaintenanceCompletionRate";
import TechnicianPerformance from "@/components/analytics/TechnicianPerformance";
import LocationBreakdown from "@/components/analytics/LocationBreakdown";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/analytics/DateRangePicker";
import { DateRange } from "react-day-picker";
import { sub } from "date-fns";
import { AnalyticsFilterProvider } from "@/components/analytics/AnalyticsFilterContext";
import { useToast } from "@/components/ui/use-toast";

const Analytics = () => {
  // Default date range is last 30 days
  const defaultDateRange: DateRange = {
    from: sub(new Date(), { days: 30 }),
    to: new Date(),
  };
  
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

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
        <div className="space-y-6 max-w-full px-2 pb-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Analytics & Reporting</h1>
              <p className="text-muted-foreground mt-1">
                View insights and track maintenance performance metrics
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full justify-between">
              <DatePickerWithRange defaultDateRange={defaultDateRange} />
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none"
                  onClick={handleRefresh} 
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none"
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Main Trends Chart - Full width */}
          <Card className="overflow-visible">
            <CardHeader className="pb-0">
              <CardTitle>Maintenance Trends over Time</CardTitle>
              <CardDescription>
                Track historical maintenance activities and identify patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible pt-2">
              <MaintenanceTrends />
            </CardContent>
          </Card>

          {/* First Row of Charts - Equipment Status and Maintenance Completion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="h-full overflow-visible">
              <CardHeader className="pb-0">
                <CardTitle>Equipment Status</CardTitle>
                <CardDescription>Current status of all equipment</CardDescription>
              </CardHeader>
              <CardContent className="overflow-visible pt-2">
                <EquipmentStatusChart />
              </CardContent>
            </Card>
            <Card className="h-full overflow-visible">
              <CardHeader className="pb-0">
                <CardTitle>Maintenance Completion Rate</CardTitle>
                <CardDescription>Breakdown of maintenance check statuses</CardDescription>
              </CardHeader>
              <CardContent className="overflow-visible pt-2">
                <MaintenanceCompletionRate />
              </CardContent>
            </Card>
          </div>

          {/* Second Row of Charts - Technician Performance and Location Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Card className="h-full overflow-visible">
              <CardHeader className="pb-0">
                <CardTitle>Technician Performance</CardTitle>
                <CardDescription>Maintenance checks by technician</CardDescription>
              </CardHeader>
              <CardContent className="overflow-visible pt-2">
                <TechnicianPerformance />
              </CardContent>
            </Card>
            <Card className="h-full overflow-visible">
              <CardHeader className="pb-0">
                <CardTitle>Equipment by Location</CardTitle>
                <CardDescription>Distribution of equipment across locations</CardDescription>
              </CardHeader>
              <CardContent className="overflow-visible pt-2">
                <LocationBreakdown />
              </CardContent>
            </Card>
          </div>
        </div>
      </AnalyticsFilterProvider>
    </Layout>
  );
};

export default Analytics;

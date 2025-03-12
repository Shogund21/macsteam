
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeatureItem from "../features/FeatureItem";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  BarChart4,
  Clipboard,
  Cog,
  FileText,
  HardDrive,
  Info,
  ListChecks,
  Map,
  Users,
  Workflow
} from "lucide-react";

export const FeaturesSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className={isMobile ? "px-3 py-4" : ""}>
          <CardTitle className="text-lg md:text-xl">Features Overview</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            A comprehensive guide to all features and capabilities of the HVAC Maintenance System
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 py-3" : ""}>
          <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="dashboard" className={isMobile ? "text-xs py-1 px-2" : ""}>Dashboard</TabsTrigger>
              <TabsTrigger value="equipment" className={isMobile ? "text-xs py-1 px-2" : ""}>Equipment</TabsTrigger>
              <TabsTrigger value="maintenance" className={isMobile ? "text-xs py-1 px-2" : ""}>Maintenance</TabsTrigger>
              <TabsTrigger value="projects" className={isMobile ? "text-xs py-1 px-2" : ""}>Projects</TabsTrigger>
              <TabsTrigger value="analytics" className={isMobile ? "text-xs py-1 px-2" : ""}>Analytics</TabsTrigger>
              <TabsTrigger value="settings" className={isMobile ? "text-xs py-1 px-2" : ""}>Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-3 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">Dashboard Features</h3>
              <div className="grid gap-2 md:gap-4 md:grid-cols-2">
                <FeatureItem 
                  icon={Info} 
                  title="System Overview" 
                  description="Quick view of key metrics including equipment status counts, recent activities, and maintenance statistics."
                />
                <FeatureItem 
                  icon={HardDrive} 
                  title="Equipment Status" 
                  description="At-a-glance view of all equipment organized by status (Operational, Needs Attention, Under Maintenance, Non-operational)."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Recent Activities" 
                  description="Timeline of recent maintenance checks, status changes, and project updates."
                />
                <FeatureItem 
                  icon={BarChart4} 
                  title="Performance Metrics" 
                  description="Key performance indicators including scheduled maintenance completion rate and equipment uptime."
                />
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-3 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">Equipment Management Features</h3>
              <div className="grid gap-2 md:gap-4 md:grid-cols-2">
                <FeatureItem 
                  icon={HardDrive} 
                  title="Equipment Registry" 
                  description="Comprehensive database of all HVAC equipment with detailed information and status tracking."
                />
                <FeatureItem 
                  icon={Map} 
                  title="Location Tracking" 
                  description="Equipment organized by location for easier management and service coordination."
                />
                <FeatureItem 
                  icon={Info} 
                  title="Status Updates" 
                  description="Real-time status management with color-coded indicators for quick visual reference."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Equipment Details" 
                  description="Comprehensive information including model numbers, installation dates, service history, and documentation."
                />
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-3 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">Maintenance Check Features</h3>
              <div className="grid gap-2 md:gap-4 md:grid-cols-2">
                <FeatureItem 
                  icon={Clipboard} 
                  title="Maintenance Forms" 
                  description="Specialized forms for different equipment types including standard HVAC and AHU-specific checks."
                />
                <FeatureItem 
                  icon={ListChecks} 
                  title="Checklist Management" 
                  description="Comprehensive maintenance checklists covering all essential inspection points."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Documentation Repository" 
                  description="Centralized storage for maintenance manuals, service guides, and equipment documentation."
                />
                <FeatureItem 
                  icon={Users} 
                  title="Technician Assignment" 
                  description="Assign maintenance checks to specific technicians and track completion status."
                />
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-3 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">Project Management Features</h3>
              <div className="grid gap-2 md:gap-4 md:grid-cols-2">
                <FeatureItem 
                  icon={Workflow} 
                  title="Project Tracking" 
                  description="Create and track maintenance projects with status, priority, and timeline information."
                />
                <FeatureItem 
                  icon={Map} 
                  title="Location Assignment" 
                  description="Organize projects by location to coordinate maintenance activities efficiently."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Project Documentation" 
                  description="Add detailed descriptions and notes to projects to document requirements and progress."
                />
                <FeatureItem 
                  icon={ListChecks} 
                  title="Status Updates" 
                  description="Track project progress with status updates (Not Started, In Progress, On Hold, Completed)."
                />
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-3 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">Analytics & Reporting Features</h3>
              <div className="grid gap-2 md:gap-4 md:grid-cols-2">
                <FeatureItem 
                  icon={BarChart4} 
                  title="Maintenance Trends" 
                  description="Visualize maintenance activity trends over time to identify patterns and plan resources."
                />
                <FeatureItem 
                  icon={HardDrive} 
                  title="Equipment Status" 
                  description="Breakdown of equipment status distribution across the organization."
                />
                <FeatureItem 
                  icon={Clipboard} 
                  title="Completion Rates" 
                  description="Track maintenance completion rates to monitor preventative maintenance effectiveness."
                />
                <FeatureItem 
                  icon={Users} 
                  title="Technician Performance" 
                  description="Compare technician workload, completion rates, and issue identification metrics."
                />
                <FeatureItem 
                  icon={Map} 
                  title="Location Analysis" 
                  description="Analyze equipment distribution and maintenance activities by location."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Data Export" 
                  description="Export analytics data for further analysis or reporting purposes."
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-3 md:space-y-4">
              <h3 className="text-sm md:text-lg font-semibold">System Settings Features</h3>
              <div className="grid gap-2 md:gap-4 md:grid-cols-2">
                <FeatureItem 
                  icon={Users} 
                  title="Technician Management" 
                  description="Add, edit, and manage technician information and availability."
                />
                <FeatureItem 
                  icon={Map} 
                  title="Location Management" 
                  description="Configure and manage locations within your organization."
                />
                <FeatureItem 
                  icon={Cog} 
                  title="System Configuration" 
                  description="Configure system-wide settings and preferences for the maintenance platform."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Documentation Access" 
                  description="Central access point for system documentation and user guides."
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

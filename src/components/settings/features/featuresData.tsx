
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
import { LucideIcon } from "lucide-react";

export interface FeatureData {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeaturesTabData {
  id: string;
  label: string;
  title: string;
  features: FeatureData[];
}

export const featuresData: FeaturesTabData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Dashboard Features",
    features: [
      {
        icon: Info,
        title: "System Overview",
        description: "Quick view of key metrics including equipment status counts, recent activities, and maintenance statistics."
      },
      {
        icon: HardDrive,
        title: "Equipment Status",
        description: "At-a-glance view of all equipment organized by status (Operational, Needs Attention, Under Maintenance, Non-operational)."
      },
      {
        icon: FileText,
        title: "Recent Activities",
        description: "Timeline of recent maintenance checks, status changes, and project updates."
      },
      {
        icon: BarChart4,
        title: "Performance Metrics",
        description: "Key performance indicators including scheduled maintenance completion rate and equipment uptime."
      }
    ]
  },
  {
    id: "equipment",
    label: "Equipment",
    title: "Equipment Management Features",
    features: [
      {
        icon: HardDrive,
        title: "Equipment Registry",
        description: "Comprehensive database of all HVAC equipment with detailed information and status tracking."
      },
      {
        icon: Map,
        title: "Location Tracking",
        description: "Equipment organized by location for easier management and service coordination."
      },
      {
        icon: Info,
        title: "Status Updates",
        description: "Real-time status management with color-coded indicators for quick visual reference."
      },
      {
        icon: FileText,
        title: "Equipment Details",
        description: "Comprehensive information including model numbers, installation dates, service history, and documentation."
      }
    ]
  },
  {
    id: "maintenance",
    label: "Maintenance",
    title: "Maintenance Check Features",
    features: [
      {
        icon: Clipboard,
        title: "Maintenance Forms",
        description: "Specialized forms for different equipment types including standard HVAC and AHU-specific checks."
      },
      {
        icon: ListChecks,
        title: "Checklist Management",
        description: "Comprehensive maintenance checklists covering all essential inspection points."
      },
      {
        icon: FileText,
        title: "Documentation Repository",
        description: "Centralized storage for maintenance manuals, service guides, and equipment documentation."
      },
      {
        icon: Users,
        title: "Technician Assignment",
        description: "Assign maintenance checks to specific technicians and track completion status."
      }
    ]
  },
  {
    id: "projects",
    label: "Projects",
    title: "Project Management Features",
    features: [
      {
        icon: Workflow,
        title: "Project Tracking",
        description: "Create and track maintenance projects with status, priority, and timeline information."
      },
      {
        icon: Map,
        title: "Location Assignment",
        description: "Organize projects by location to coordinate maintenance activities efficiently."
      },
      {
        icon: FileText,
        title: "Project Documentation",
        description: "Add detailed descriptions and notes to projects to document requirements and progress."
      },
      {
        icon: ListChecks,
        title: "Status Updates",
        description: "Track project progress with status updates (Not Started, In Progress, On Hold, Completed)."
      }
    ]
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Analytics & Reporting Features",
    features: [
      {
        icon: BarChart4,
        title: "Maintenance Trends",
        description: "Visualize maintenance activity trends over time to identify patterns and plan resources."
      },
      {
        icon: HardDrive,
        title: "Equipment Status",
        description: "Breakdown of equipment status distribution across the organization."
      },
      {
        icon: Clipboard,
        title: "Completion Rates",
        description: "Track maintenance completion rates to monitor preventative maintenance effectiveness."
      },
      {
        icon: Users,
        title: "Technician Performance",
        description: "Compare technician workload, completion rates, and issue identification metrics."
      },
      {
        icon: Map,
        title: "Location Analysis",
        description: "Analyze equipment distribution and maintenance activities by location."
      },
      {
        icon: FileText,
        title: "Data Export",
        description: "Export analytics data for further analysis or reporting purposes."
      }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    title: "System Settings Features",
    features: [
      {
        icon: Users,
        title: "Technician Management",
        description: "Add, edit, and manage technician information and availability."
      },
      {
        icon: Map,
        title: "Location Management",
        description: "Configure and manage locations within your organization."
      },
      {
        icon: Cog,
        title: "System Configuration",
        description: "Configure system-wide settings and preferences for the maintenance platform."
      },
      {
        icon: FileText,
        title: "Documentation Access",
        description: "Central access point for system documentation and user guides."
      }
    ]
  }
];

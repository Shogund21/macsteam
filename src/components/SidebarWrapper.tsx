
import React from "react";
import { 
  SidebarHeader, 
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { CompanySelector } from "@/components/company/CompanySelector";
import { 
  Home, 
  Wrench, 
  Briefcase, 
  BarChart, 
  Settings 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const SidebarWrapper = () => {
  const location = useLocation();

  const menuItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      path: "/" 
    },
    { 
      icon: Wrench, 
      label: "Equipment", 
      path: "/equipment" 
    },
    { 
      icon: Briefcase, 
      label: "Maintenance Checks", 
      path: "/maintenance-checks" 
    },
    { 
      icon: BarChart, 
      label: "Analytics", 
      path: "/analytics" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      path: "/settings" 
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <SidebarHeader className="border-b">
        <div className="p-2">
          <CompanySelector />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <Link 
                  to={item.path} 
                  className={`
                    flex items-center gap-2 
                    ${location.pathname === item.path ? 'bg-gray-100' : ''}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* Optional: Add footer content like user info or logout */}
      </SidebarFooter>
    </div>
  );
};

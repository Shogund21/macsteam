
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
  Settings,
  Building,
  LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/contexts/CompanyContext";

export const SidebarWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentCompany } = useCompany();

  const menuItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      path: "/dashboard" 
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

  const handleChangeCompany = () => {
    navigate("/");
  };

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
      <SidebarFooter className="p-4 border-t">
        <div className="space-y-2">
          {currentCompany && (
            <div className="text-sm text-muted-foreground mb-2 px-2">
              <div className="font-medium flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>{currentCompany.name}</span>
              </div>
            </div>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={handleChangeCompany}
          >
            <LogOut className="h-4 w-4" />
            <span>Change Company</span>
          </Button>
        </div>
      </SidebarFooter>
    </div>
  );
};

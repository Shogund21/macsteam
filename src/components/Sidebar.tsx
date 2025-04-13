
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Wrench, 
  Building2, 
  ClipboardList, 
  BarChart4, 
  Settings,
  LogOut,
  Mail,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const Sidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/" },
    { title: "Equipment", icon: Wrench, path: "/equipment" },
    { title: "Projects", icon: Building2, path: "/projects" },
    { title: "Maintenance", icon: ClipboardList, path: "/maintenance-checks" },
    { title: "Analytics", icon: BarChart4, path: "/analytics" },
    { title: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logout functionality",
      description: "Logout will be implemented in a future update.",
    });
  };

  const handleHelp = () => {
    toast({
      title: "Help and Support",
      description: "Documentation and support resources will be added soon.",
    });
  };

  return (
    <>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
            M
          </div>
          <div className="font-semibold text-lg">Maintenance Pro</div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  className={isActive ? "bg-blue-50 text-blue-700 font-medium" : ""}
                >
                  <Link to={item.path} className="flex items-center gap-3 py-2 px-3 rounded-md transition-colors hover:bg-gray-100">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t mt-auto">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleHelp}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & Support
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => window.open('mailto:support@example.com')}
          >
            <Mail className="h-4 w-4 mr-2" />
            Contact Us
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
};

export default Sidebar;


import React from "react";
import { 
  SidebarHeader, 
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { CompanySelector } from "@/components/company/CompanySelector";
import Sidebar from "@/components/Sidebar";

export const SidebarWrapper = () => {
  return (
    <div className="flex flex-col h-full">
      <SidebarHeader className="border-b">
        <div className="p-2">
          <CompanySelector />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Sidebar />
      </SidebarContent>
      <SidebarFooter>
        {/* Footer content */}
      </SidebarFooter>
    </div>
  );
};

export default SidebarWrapper;

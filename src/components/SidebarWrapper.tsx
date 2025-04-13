
import React from "react";
import { CompanySelector } from "@/components/company/CompanySelector";

export const SidebarWrapper = () => {
  return (
    <div className="flex flex-col h-full w-64 bg-gray-100 border-r">
      <div className="p-4 border-b">
        <CompanySelector />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Sidebar navigation items would go here */}
        <nav className="space-y-2">
          <a href="/" className="block p-2 rounded hover:bg-gray-200">Dashboard</a>
          <a href="/equipment" className="block p-2 rounded hover:bg-gray-200">Equipment</a>
          <a href="/projects" className="block p-2 rounded hover:bg-gray-200">Projects</a>
          <a href="/maintenance-checks" className="block p-2 rounded hover:bg-gray-200">Maintenance</a>
          <a href="/analytics" className="block p-2 rounded hover:bg-gray-200">Analytics</a>
          <a href="/settings" className="block p-2 rounded hover:bg-gray-200">Settings</a>
        </nav>
      </div>
    </div>
  );
};

export default SidebarWrapper;

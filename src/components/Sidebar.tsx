
// Important: This is a read-only file, so we can only view it but not modify it directly.
// Since we need to add the company selector, we'll need to create a wrapper or use a different approach.
// Let's create a wrapper component that extends the sidebar:

// src/components/SidebarWrapper.tsx
import { Sidebar } from "@/components/Sidebar";
import { CompanySelector } from "@/components/company/CompanySelector";

export const SidebarWrapper = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <CompanySelector />
      </div>
      <Sidebar />
    </div>
  );
};

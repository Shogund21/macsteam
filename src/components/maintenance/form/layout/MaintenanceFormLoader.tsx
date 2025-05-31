
import React from "react";

interface MaintenanceFormLoaderProps {
  isLoading: boolean;
  error: any;
  children: React.ReactNode;
}

const MaintenanceFormLoader = ({ isLoading, error, children }: MaintenanceFormLoaderProps) => {
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span>Loading form data...</span>
        </div>
      </div>
    );
  }

  // Show error state if data loading failed
  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error loading form data. Please try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default MaintenanceFormLoader;


import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface LayoutErrorBoundaryProps {
  layoutError: Error | null;
}

export const LayoutErrorBoundary = ({ layoutError }: LayoutErrorBoundaryProps) => {
  // Force rendering of error UI when an error is present
  useEffect(() => {
    if (layoutError) {
      console.error("Layout error detected:", layoutError);
      
      // Force visibility of error UI with delay to ensure DOM is ready
      setTimeout(() => {
        document.querySelectorAll('body, #root, #root > div').forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'block';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
          }
        });
      }, 100);
    }
  }, [layoutError]);

  if (!layoutError) return null;
  
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-white">
      <h1 className="text-xl font-bold mb-4">We encountered an issue</h1>
      <p className="mb-4 text-red-500">The application had trouble loading the layout.</p>
      <p className="mb-4 max-w-md text-center text-gray-600">{layoutError?.message || "Unknown error"}</p>
      <div className="space-x-4">
        <Button onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            // Try to force the layout to recover
            document.querySelectorAll('#root > div').forEach(el => {
              if (el instanceof HTMLElement) {
                el.style.display = 'block';
                el.style.visibility = 'visible';
              }
            });
            window.dispatchEvent(new Event('resize'));
            toast({
              title: "Recovery attempt",
              description: "Attempting to recover the layout..."
            });
          }}
        >
          Try to Recover
        </Button>
      </div>
    </div>
  );
};

export const handleLayoutError = (err: unknown) => {
  console.error("Layout render error:", err);
  const error = err instanceof Error ? err : new Error("Unknown layout error");
  
  toast({
    title: "Display Error",
    description: "There was a problem loading the page. Please try refreshing.",
    variant: "destructive"
  });
  
  return error;
};

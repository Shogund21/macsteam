
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface LayoutErrorBoundaryProps {
  layoutError: Error | null;
}

export const LayoutErrorBoundary = ({ layoutError }: LayoutErrorBoundaryProps) => {
  if (!layoutError) return null;
  
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">There was an error loading the application layout.</p>
      <Button onClick={() => window.location.reload()}>
        Refresh Page
      </Button>
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

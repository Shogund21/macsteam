
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileTabNavigationProps {
  prevTab: () => void;
  nextTab: () => void;
  handleTabChange: (value: string) => void;
}

const MobileTabNavigation = ({
  prevTab,
  nextTab,
  handleTabChange
}: MobileTabNavigationProps) => {
  return (
    <div className="flex items-center justify-between mb-4 border rounded-md p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={prevTab}
        className="text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={nextTab}
        className="text-muted-foreground"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default MobileTabNavigation;

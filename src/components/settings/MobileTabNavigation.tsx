
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileTabNavigationProps {
  prevTab: { id: string; label: string } | undefined;
  nextTab: { id: string; label: string } | undefined;
  handleTabChange: (value: string) => void;
}

const MobileTabNavigation = ({ 
  prevTab, 
  nextTab, 
  handleTabChange 
}: MobileTabNavigationProps) => {
  return (
    <div className="flex items-center justify-between mb-4 border-b pb-2">
      <h2 className="font-medium">
        {prevTab || nextTab ? (prevTab ? prevTab.label : nextTab?.label) : ""}
      </h2>
      <div className="flex space-x-2">
        {prevTab && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleTabChange(prevTab.id)}
            className="flex items-center text-xs p-1"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {prevTab.label}
          </Button>
        )}
        {nextTab && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleTabChange(nextTab.id)}
            className="flex items-center text-xs p-1"
          >
            {nextTab.label}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileTabNavigation;

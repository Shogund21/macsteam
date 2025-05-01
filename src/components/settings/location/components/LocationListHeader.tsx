
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationListHeaderProps {
  locationsCount: number;
  onAddClick: () => void;
  isAuthenticated?: boolean;
}

export const LocationListHeader = ({ 
  locationsCount, 
  onAddClick,
  isAuthenticated = true
}: LocationListHeaderProps) => {
  const { toast } = useToast();

  const handleAddClick = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to add locations."
      });
      return;
    }
    
    onAddClick();
  };
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">All Locations</h3>
        <p className="text-sm text-gray-500">
          {locationsCount} locations found
        </p>
      </div>
      
      <Button 
        onClick={handleAddClick}
        variant="default"
        className="bg-blue-600 hover:bg-blue-700 text-white"
        disabled={!isAuthenticated}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Location
      </Button>
    </div>
  );
};


import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EquipmentItem } from "@/components/equipment/EquipmentItem";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const EquipmentOverview = () => {
  const navigate = useNavigate();
  
  const { data: equipmentData, isLoading: equipmentLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('location', { ascending: true })
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  return (
    <Card className="border shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-white border-b pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-gray-800">Equipment Overview</CardTitle>
          <p className="text-sm text-gray-500 mt-1">Most recent equipment items</p>
        </div>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 gap-1 text-xs"
          onClick={() => navigate("/add-equipment")}
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {equipmentLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[160px]" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : equipmentData && equipmentData.length > 0 ? (
            <>
              {equipmentData.slice(0, 4).map((equipment) => (
                <div key={equipment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <EquipmentItem equipment={equipment} />
                </div>
              ))}
              <div className="p-3 bg-gray-50">
                <Button 
                  onClick={() => navigate("/equipment")}
                  variant="ghost" 
                  className="w-full h-10 gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                >
                  View All Equipment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">No equipment data available</p>
              <Button 
                className="mt-4"
                onClick={() => navigate("/add-equipment")}
              >
                Add Equipment
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentOverview;

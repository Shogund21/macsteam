import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";

const Equipment = () => {
  const navigate = useNavigate();

  const { data: equipment, isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching equipment:', error);
        throw error;
      }
      return data;
    },
  });

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Equipment</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all equipment
            </p>
          </div>
          <Button 
            onClick={() => navigate("/add-equipment")}
            className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Equipment
          </Button>
        </div>

        {isLoading ? (
          <p>Loading equipment...</p>
        ) : equipment && equipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <Card key={item.id} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Model:</span> {item.model}</p>
                  <p><span className="font-medium">Serial Number:</span> {item.serialNumber}</p>
                  <p><span className="font-medium">Location:</span> {item.location}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-accent">
                      {item.status}
                    </span>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p>No equipment found. Add some equipment to get started.</p>
        )}
      </div>
    </Layout>
  );
};

export default Equipment;
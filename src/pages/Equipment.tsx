import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Equipment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting equipment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment. Please try again.",
      });
    }
  };

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
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Equipment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this equipment? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="space-y-2 text-sm mt-2">
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
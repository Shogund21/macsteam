import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, UserX } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
}

interface TechnicianFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
}

const TechnicianManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<TechnicianFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialization: "",
  });

  // Fetch technicians
  const { data: technicians, isLoading } = useQuery({
    queryKey: ["technicians"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("technicians")
        .select("*")
        .order("firstName");
      if (error) throw error;
      return data;
    },
  });

  // Add technician mutation
  const addTechnicianMutation = useMutation({
    mutationFn: async (newTechnician: TechnicianFormData) => {
      const { data, error } = await supabase
        .from("technicians")
        .insert([newTechnician])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      toast({
        title: "Success",
        description: "Technician added successfully",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        specialization: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add technician: " + error.message,
        variant: "destructive",
      });
    },
  });

  // Delete technician mutation
  const deleteTechnicianMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("technicians")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      toast({
        title: "Success",
        description: "Technician removed successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to remove technician: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTechnicianMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this technician?")) {
      deleteTechnicianMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full sm:w-auto bg-blue-500 text-black hover:bg-blue-600"
        >
          <UserPlus className="mr-2" />
          Add Technician
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Technicians</h3>
        <div className="divide-y divide-gray-200">
          {technicians?.map((technician: Technician) => (
            <div
              key={technician.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="font-medium">
                  {technician.firstName} {technician.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {technician.specialization}
                </p>
                <p className="text-sm text-muted-foreground">
                  {technician.email} • {technician.phone}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(technician.id)}
              >
                <UserX className="mr-2" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianManagement;
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LocationSelect from "./LocationSelect";
import { EquipmentFormSchema, EquipmentFormValues } from "./types";

const EquipmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(EquipmentFormSchema),
    defaultValues: {
      name: "",
      model: "",
      serialNumber: "",
      location: "",
      status: "",
      lastMaintenance: null,
      nextMaintenance: null,
    },
  });

  const onSubmit = async (values: EquipmentFormValues) => {
    try {
      const { error } = await supabase.from("equipment").insert({
        name: values.name,
        model: values.model,
        serialNumber: values.serialNumber,
        location: values.location,
        status: values.status,
        lastMaintenance: values.lastMaintenance,
        nextMaintenance: values.nextMaintenance,
      });
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Equipment added successfully",
      });
      navigate("/equipment");
    } catch (error) {
      console.error("Error adding equipment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add equipment. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter equipment name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input placeholder="Enter model" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter serial number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LocationSelect form={form} />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/equipment")}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-black"
          >
            Add Equipment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EquipmentForm;
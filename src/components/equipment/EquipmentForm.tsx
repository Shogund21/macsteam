import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LocationSelect from "./LocationSelect";
import FormFields from "./FormFields";
import FormActions from "./FormActions";
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
        <FormFields form={form} />
        <LocationSelect form={form} />
        <FormActions />
      </form>
    </Form>
  );
};

export default EquipmentForm;
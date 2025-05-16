
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const EquipmentForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields form={form} />
        <LocationSelect form={form} />
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/equipment")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting} 
            className="bg-[#1EAEDB] hover:bg-[#33C3F0] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Add Equipment"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EquipmentForm;

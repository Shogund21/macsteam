
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { locationSchema, LocationFormValues, LocationData } from "./schemas/locationSchema";
import { StoreNumberField } from "./components/StoreNumberField";
import { LocationNameField } from "./components/LocationNameField";
import { ActiveStatusField } from "./components/ActiveStatusField";
import { useLocationForm } from "./hooks/useLocationForm";

interface LocationFormProps {
  onSuccess?: () => void;
  initialData?: LocationData;
}

export const LocationForm = ({ onSuccess, initialData }: LocationFormProps) => {
  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      store_number: initialData?.store_number || "",
      name: initialData?.name || "",
      is_active: initialData?.is_active !== false,
    },
  });

  const { isSubmitting, onSubmit } = useLocationForm(form, initialData, onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <StoreNumberField form={form} />
        <LocationNameField form={form} />
        <ActiveStatusField form={form} />

        <Button 
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Location" : "Add Location"}
        </Button>
      </form>
    </Form>
  );
};

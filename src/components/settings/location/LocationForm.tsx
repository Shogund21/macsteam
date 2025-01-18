import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const locationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  store_number: z.string().min(1, "Store number is required"),
});

type LocationFormValues = z.infer<typeof locationSchema>;

interface LocationFormProps {
  onSuccess?: () => void;
  initialData?: {
    id: string;
    name: string;
    store_number: string;
  };
}

export const LocationForm = ({ onSuccess, initialData }: LocationFormProps) => {
  const { toast } = useToast();

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: initialData?.name || "",
      store_number: initialData?.store_number || "",
    },
  });

  const onSubmit = async (values: LocationFormValues) => {
    try {
      if (initialData?.id) {
        const { error } = await supabase
          .from("locations")
          .update({
            name: values.name,
            store_number: values.store_number,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialData.id);

        if (error) throw error;
        toast({ title: "Success", description: "Location updated successfully" });
      } else {
        const { error } = await supabase.from("locations").insert({
          name: values.name,
          store_number: values.store_number,
        });

        if (error) throw error;
        toast({ title: "Success", description: "Location added successfully" });
      }

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving location:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save location. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter location name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="store_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter store number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {initialData ? "Update Location" : "Add Location"}
        </Button>
      </form>
    </Form>
  );
};
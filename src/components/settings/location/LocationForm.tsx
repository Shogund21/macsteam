
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const locationSchema = z.object({
  store_number: z.string().min(1, "Store number is required"),
  name: z.string().optional(),
  is_active: z.boolean().default(true),
});

type LocationFormValues = z.infer<typeof locationSchema>;

interface LocationFormProps {
  onSuccess?: () => void;
  initialData?: {
    id: string;
    store_number: string;
    name?: string;
    is_active?: boolean;
  };
}

export const LocationForm = ({ onSuccess, initialData }: LocationFormProps) => {
  const { toast } = useToast();

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      store_number: initialData?.store_number || "",
      name: initialData?.name || "",
      is_active: initialData?.is_active !== false,
    },
  });

  const onSubmit = async (values: LocationFormValues) => {
    try {
      // Use the name if provided, otherwise use store_number
      const locationName = values.name || values.store_number;
      
      if (initialData?.id) {
        const { error } = await supabase
          .from("locations")
          .update({
            store_number: values.store_number,
            name: locationName,
            is_active: values.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialData.id);

        if (error) throw error;
        toast({ title: "Success", description: "Location updated successfully" });
      } else {
        const { error } = await supabase.from("locations").insert({
          store_number: values.store_number,
          name: locationName,
          is_active: values.is_active,
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

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter location name (will use store number if empty)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Active
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Is this location currently active?
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 w-full"
        >
          {initialData ? "Update Location" : "Add Location"}
        </Button>
      </form>
    </Form>
  );
};

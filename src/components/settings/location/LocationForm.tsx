
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

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
    company_id?: string;
  };
}

export const LocationForm = ({ onSuccess, initialData }: LocationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Get current session to determine user/company
  useEffect(() => {
    const fetchCurrentSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setCurrentUser(data.session.user);
      }
    };

    fetchCurrentSession();
  }, []);

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
      setIsSubmitting(true);
      console.log("Submitting location with values:", values);
      
      // Use the store_number as the name if name is empty or just whitespace
      const locationName = values.name?.trim() || values.store_number;
      
      // Get the user's company_id or use the initialData's company_id
      // This is crucial for RLS policies
      let company_id = initialData?.company_id;

      if (!company_id) {
        // If no company_id is available, try to get one from the user session
        // In a real-world application, you might want to fetch this from a user profile or context
        const { data: { company } } = await supabase.rpc('get_user_company');
        company_id = company?.id;
      }

      if (!company_id) {
        throw new Error("Unable to determine company ID. Please ensure you're logged in correctly.");
      }

      const locationData = {
        store_number: values.store_number,
        name: locationName,
        is_active: values.is_active,
        company_id: company_id, // Add company_id to satisfy RLS policies
      };

      console.log("Prepared location data:", locationData);
      
      if (initialData?.id) {
        console.log("Updating location with ID:", initialData.id);
        const { error } = await supabase
          .from("locations")
          .update({
            ...locationData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialData.id);

        if (error) {
          console.error("Error updating location:", error);
          throw error;
        }
        
        console.log("Location updated successfully!");
        toast({ title: "Success", description: "Location updated successfully" });
      } else {
        console.log("Creating new location with data:", locationData);
        const { error } = await supabase
          .from("locations")
          .insert(locationData);

        if (error) {
          console.error("Error creating location:", error);
          throw error;
        }
        
        console.log("Location added successfully!");
        toast({ title: "Success", description: "Location added successfully" });
      }

      // Reset the form if it's a new location
      if (!initialData) {
        form.reset({
          store_number: "",
          name: "",
          is_active: true
        });
      }
      
      // Explicitly call onSuccess callback to trigger immediate data refresh
      if (onSuccess) {
        console.log("Calling onSuccess callback to refresh data");
        await onSuccess(); // Use await to ensure the refresh completes
      }
    } catch (error: any) {
      console.error("Error saving location:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save location. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Location" : "Add Location"}
        </Button>
      </form>
    </Form>
  );
};


import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LocationFormValues, LocationData } from "../schemas/locationSchema";

export const useLocationForm = (
  form: UseFormReturn<LocationFormValues>,
  initialData?: LocationData,
  onSuccess?: () => void
) => {
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
        const { data, error } = await supabase.rpc('get_user_company');
        
        if (error) {
          console.error("Error fetching user company:", error);
          throw new Error("Failed to retrieve company information. Please try again.");
        }
        
        // The function returns an array with a single object containing a company property
        // which is a JSON object with id and name
        if (data && data.length > 0 && data[0].company) {
          // Parse the JSON company object if needed (it might already be parsed)
          const companyData = typeof data[0].company === 'string' 
            ? JSON.parse(data[0].company) 
            : data[0].company;
          
          company_id = companyData.id;
          console.log("Retrieved company_id:", company_id);
        }
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

  return {
    isSubmitting,
    onSubmit
  };
};

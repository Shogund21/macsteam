
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { FilterChange } from "@/types/filterChanges";

export function useFilterChangesQuery(options?: { equipmentId?: string }) {
  const { toast } = useToast();
  const { equipmentId } = options || {};

  return useQuery({
    queryKey: ['filter-changes', equipmentId],
    queryFn: async () => {
      try {
        let query = supabase
          .from('filter_changes_view')
          .select(`
            *,
            equipment:equipment_id (
              name,
              location
            ),
            technician:technician_id (
              firstName,
              lastName
            )
          `)
          .order('due_date', { ascending: true });

        if (equipmentId) {
          query = query.eq('equipment_id', equipmentId);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        return (data || []) as FilterChange[];
      } catch (error) {
        console.error("Error fetching filter changes:", error);
        toast({
          title: "Error fetching filter changes",
          description: "Please try again later.",
          variant: "destructive",
        });
        return [];
      }
    },
  });
}

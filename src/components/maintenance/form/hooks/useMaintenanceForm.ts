
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MaintenanceCheck } from "@/types/maintenance";
import { createDefaultValues } from "./utils/defaultValuesHelper";
import { maintenanceFormSchema, MaintenanceFormValues } from "./schema/maintenanceFormSchema";

/**
 * Hook for creating and managing a maintenance form
 * @param initialData Optional initial data for editing an existing check
 * @returns React Hook Form methods and state
 */
export const useMaintenanceForm = (initialData?: MaintenanceCheck) => {
  const defaultValues = createDefaultValues(initialData);

  return useForm<MaintenanceFormValues>({
    resolver: zodResolver(maintenanceFormSchema),
    defaultValues,
    mode: "onSubmit",
  });
};

// Re-export the type for convenience
export type { MaintenanceFormValues } from "./schema/maintenanceFormSchema";

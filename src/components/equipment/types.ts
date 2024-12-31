import * as z from "zod";

export const EquipmentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  model: z.string().min(2, "Model must be at least 2 characters"),
  serialNumber: z.string().min(2, "Serial number must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  status: z.string().min(2, "Status is required"),
  lastMaintenance: z.string().nullable().optional(),
  nextMaintenance: z.string().nullable().optional(),
});

export type EquipmentFormValues = z.infer<typeof EquipmentFormSchema>;
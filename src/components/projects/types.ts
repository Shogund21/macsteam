import { z } from "zod";

export const projectFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  status: z.string().min(2, "Status is required"),
  startdate: z.string().optional(),
  enddate: z.string().optional(),
  priority: z.string().min(2, "Priority is required"),
  location: z.string().min(2, "Location is required"),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

import { z } from "zod";

export const locationSchema = z.object({
  store_number: z.string().min(1, "Store number is required"),
  name: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type LocationFormValues = z.infer<typeof locationSchema>;

export interface LocationData {
  id: string;
  store_number: string;
  name?: string;
  is_active?: boolean;
  company_id?: string;
}

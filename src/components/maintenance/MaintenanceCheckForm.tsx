import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  equipment_id: z.string().min(1, "Equipment is required"),
  technician_id: z.string().min(1, "Technician is required"),
  chiller_pressure_reading: z.string().min(1, "Pressure reading is required"),
  chiller_temperature_reading: z.string().min(1, "Temperature reading is required"),
  air_filter_status: z.string().min(1, "Air filter status is required"),
  belt_condition: z.string().min(1, "Belt condition is required"),
  refrigerant_level: z.string().min(1, "Refrigerant level is required"),
  unusual_noise: z.boolean().default(false),
  unusual_noise_description: z.string().optional(),
  vibration_observed: z.boolean().default(false),
  vibration_description: z.string().optional(),
  oil_level_status: z.string().min(1, "Oil level status is required"),
  condenser_condition: z.string().min(1, "Condenser condition is required"),
  notes: z.string().optional(),
});

interface MaintenanceCheckFormProps {
  onComplete: () => void;
}

const MaintenanceCheckForm = ({ onComplete }: MaintenanceCheckFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unusual_noise: false,
      vibration_observed: false,
    },
  });

  const { data: equipment } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*')
        .eq('isAvailable', true);
      
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from('hvac_maintenance_checks')
        .insert({
          ...values,
          chiller_pressure_reading: parseFloat(values.chiller_pressure_reading),
          chiller_temperature_reading: parseFloat(values.chiller_temperature_reading),
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Maintenance check recorded successfully",
      });
      onComplete();
    } catch (error) {
      console.error('Error submitting maintenance check:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit maintenance check. Please try again.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="equipment_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipment</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {equipment?.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name} - {item.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technician_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technician</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {technicians?.map((tech) => (
                      <SelectItem key={tech.id} value={tech.id}>
                        {tech.firstName} {tech.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chiller_pressure_reading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiller Pressure Reading (PSI)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chiller_temperature_reading"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chiller Temperature Reading (°F)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="air_filter_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Air Filter Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="needs_cleaning">Needs Cleaning</SelectItem>
                    <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="belt_condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Belt Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="needs_replacement">Needs Replacement</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="refrigerant_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refrigerant Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="optimal">Optimal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="needs_refill">Needs Refill</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="oil_level_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oil Level Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="optimal">Optimal</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="needs_refill">Needs Refill</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="condenser_condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condenser Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="clean">Clean</SelectItem>
                    <SelectItem value="needs_cleaning">Needs Cleaning</SelectItem>
                    <SelectItem value="needs_service">Needs Service</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="unusual_noise"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Unusual Noise</FormLabel>
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

          {form.watch("unusual_noise") && (
            <FormField
              control={form.control}
              name="unusual_noise_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Noise Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="vibration_observed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Vibration Observed</FormLabel>
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

          {form.watch("vibration_observed") && (
            <FormField
              control={form.control}
              name="vibration_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vibration Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onComplete}
          >
            Cancel
          </Button>
          <Button type="submit">Submit Check</Button>
        </div>
      </form>
    </Form>
  );
};

export default MaintenanceCheckForm;
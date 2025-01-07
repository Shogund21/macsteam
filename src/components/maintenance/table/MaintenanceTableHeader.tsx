import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const MaintenanceTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Equipment</TableHead>
        <TableHead>Location</TableHead>
        <TableHead>Technician</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Issues Found</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};
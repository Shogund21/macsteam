import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LocationActions } from "./LocationActions";

interface LocationTableProps {
  locations: Array<{
    id: string;
    name: string;
    store_number: string;
  }>;
  onEdit: (location: any) => void;
  onDelete: (id: string) => void;
  onSuccess: () => void;
}

export const LocationTable = ({ locations, onEdit, onDelete, onSuccess }: LocationTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Store Number</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {locations?.map((location) => (
          <TableRow key={location.id}>
            <TableCell>{location.name}</TableCell>
            <TableCell>{location.store_number}</TableCell>
            <TableCell>
              <LocationActions
                location={location}
                onEdit={onEdit}
                onDelete={onDelete}
                onSuccess={onSuccess}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
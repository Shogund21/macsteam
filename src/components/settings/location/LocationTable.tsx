
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LocationActions } from "./LocationActions";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationTableProps {
  locations: Array<{
    id: string;
    store_number: string;
    name?: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  }>;
  onEdit: (location: any) => void;
  onDelete: (id: string) => void;
  onSuccess: () => void;
}

export const LocationTable = ({ locations, onEdit, onDelete, onSuccess }: LocationTableProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Store #</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations && locations.length > 0 ? (
            locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell className="font-medium">{location.store_number}</TableCell>
                <TableCell>{location.name?.trim() || location.store_number}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    location.is_active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {location.is_active !== false ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>{location.updated_at ? new Date(location.updated_at).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <LocationActions
                    location={location}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSuccess={onSuccess}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No locations found. Add a location to get started.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

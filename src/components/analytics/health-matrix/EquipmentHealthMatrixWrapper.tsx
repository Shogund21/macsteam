
import React from "react";
import EquipmentHealthMatrix from "./EquipmentHealthMatrix";
import { Skeleton } from "@/components/ui/skeleton";

const EquipmentHealthMatrixWrapper = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <EquipmentHealthMatrix />
    </div>
  );
};

export default EquipmentHealthMatrixWrapper;

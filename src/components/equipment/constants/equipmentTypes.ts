
// Define equipment categories
export const HVAC_EQUIPMENT = [
  "Air Handling Unit (AHU)",
  "Air Handler Unit 1",
  "Air Handler Unit 2",
  "Air Handler Unit 3",
  "Air Handler Unit 4",
  "Air Handler Unit 5",
  "Air Handler Unit 6",
  "Air Handler Unit 7",
  "Air Handler Unit 8",
  "Air Handler Unit 9",
  "Air Handler Unit 10",
  "Air Handler Unit 11",
  "Air Handler Unit 12",
  "Air Handler Unit 13",
  "Air Handler Unit 14",
  "Air Handler Unit 15",
  "Air Handler Unit 16",
  "Air Handler Unit 17",
  "Air Handler Unit 18",
  "Air Handler Unit 19",
  "Chiller",
  "Cooling Tower",
  "Boiler",
  "Fan Coil Unit",
  "Heat Pump",
  "Package Unit",
  "Split System",
  "VAV Box",
  "VRF System",
] as const;

export const FACILITY_EQUIPMENT = [
  "Restroom",
  "Elevator",
] as const;

// Export a combined list for use in dropdowns and selectors
export const EQUIPMENT_TYPES = [
  ...HVAC_EQUIPMENT,
  ...FACILITY_EQUIPMENT,
] as const;

// Export equipment type for TypeScript
export type EquipmentType = typeof EQUIPMENT_TYPES[number];

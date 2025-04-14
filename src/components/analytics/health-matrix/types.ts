
export interface EquipmentHealthItem {
  location: string;
  operational: number;
  needsMaintenance: number;
  outOfService: number;
  total: number;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
}

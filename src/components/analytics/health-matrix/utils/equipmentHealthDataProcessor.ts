
import { EquipmentHealthItem } from "../types";
import { normalizeString } from "@/utils/locationMatching";

/**
 * Matches equipment locations to store numbers from the database
 */
export const matchEquipmentToStoreNumber = (
  equipment: any, 
  locationsData: any[]
): string | undefined => {
  if (!equipment.location) return undefined;
  
  const normalizedEquipLocation = normalizeString(equipment.location);
  let matchedStoreNumber: string | undefined;
  
  // Try direct match with store number first
  matchedStoreNumber = locationsData.find(loc => 
    normalizedEquipLocation === normalizeString(loc.store_number)
  )?.store_number;
  
  // If no match, try to find a location where equipment location contains the store number
  if (!matchedStoreNumber) {
    matchedStoreNumber = locationsData.find(loc => 
      loc.store_number && normalizedEquipLocation.includes(normalizeString(loc.store_number))
    )?.store_number;
  }
  
  // If still no match, try to match with location name
  if (!matchedStoreNumber) {
    matchedStoreNumber = locationsData.find(loc => 
      loc.name && normalizedEquipLocation.includes(normalizeString(loc.name))
    )?.store_number;
  }
  
  return matchedStoreNumber;
};

/**
 * Calculate risk score and level based on operational equipment percentage
 */
export const calculateRiskMetrics = (operational: number, total: number): { riskScore: number, riskLevel: EquipmentHealthItem["riskLevel"] } => {
  const riskScore = Math.round((operational / total) * 100);
  
  let riskLevel: EquipmentHealthItem["riskLevel"] = "low";
  if (riskScore < 60) {
    riskLevel = "high";
  } else if (riskScore < 80) {
    riskLevel = "medium";
  }
  
  return { riskScore, riskLevel };
};

/**
 * Process equipment data and location data into health matrix format
 */
export const processEquipmentHealthData = (
  equipmentData: any[],
  locationsData: any[]
): EquipmentHealthItem[] => {
  if (!equipmentData?.length || !locationsData?.length) {
    return [];
  }
  
  console.log('Processing equipment data:', equipmentData.length, 'items');
  console.log('Processing locations data:', locationsData.length, 'items');
  
  // Create a map of store numbers to EquipmentHealthItem
  const storeNumberMap = new Map<string, EquipmentHealthItem>();
  
  // Initialize map with store numbers from database
  locationsData.forEach(location => {
    if (!location.store_number) return;
    
    storeNumberMap.set(location.store_number, {
      location: location.store_number,
      operational: 0,
      needsMaintenance: 0,
      outOfService: 0,
      total: 0,
      riskScore: 0,
      riskLevel: "low"
    });
  });
  
  // Map equipment to store numbers and count by status
  equipmentData.forEach(equipment => {
    const matchedStoreNumber = matchEquipmentToStoreNumber(equipment, locationsData);
    
    if (!matchedStoreNumber) return;
    console.log(`Matched equipment "${equipment.name}" to store number: ${matchedStoreNumber}`);
    
    // Get or create the health data entry for this store number
    if (!storeNumberMap.has(matchedStoreNumber)) {
      storeNumberMap.set(matchedStoreNumber, {
        location: matchedStoreNumber,
        operational: 0,
        needsMaintenance: 0,
        outOfService: 0,
        total: 0,
        riskScore: 0,
        riskLevel: "low"
      });
    }
    
    const locationData = storeNumberMap.get(matchedStoreNumber)!;
    locationData.total += 1;
    
    // Count by status
    if (equipment.status === "Operational") {
      locationData.operational += 1;
    } else if (equipment.status === "Needs Maintenance") {
      locationData.needsMaintenance += 1;
    } else if (equipment.status === "Out of Service") {
      locationData.outOfService += 1;
    }
  });
  
  // Calculate risk scores and levels for each location
  storeNumberMap.forEach(location => {
    if (location.total > 0) {
      const { riskScore, riskLevel } = calculateRiskMetrics(location.operational, location.total);
      location.riskScore = riskScore;
      location.riskLevel = riskLevel;
    }
  });
  
  // Convert map to array and sort by risk score (descending)
  const processedData = Array.from(storeNumberMap.values())
    .filter(item => item.total > 0) // Only show store numbers with equipment
    .sort((a, b) => b.riskScore - a.riskScore);
  
  console.log('Processed health data:', processedData);
  return processedData;
};


import { EquipmentHealthItem } from "../types";
import { normalizeString } from "@/utils/locationMatching";

/**
 * Matches equipment locations to store numbers from the database
 */
export const matchEquipmentToStoreNumber = (
  equipment: any, 
  locationsData: any[]
): string | undefined => {
  if (!equipment.location) {
    console.log('Equipment has no location:', equipment.name);
    return undefined;
  }
  
  const normalizedEquipLocation = normalizeString(equipment.location);
  
  // Try direct match with store number first
  const directMatch = locationsData.find(loc => 
    normalizedEquipLocation === normalizeString(loc.store_number)
  );
  
  if (directMatch) {
    console.log(`Direct match found for "${equipment.name}": ${directMatch.store_number}`);
    return directMatch.store_number;
  }
  
  // Try to find a location where equipment location contains the store number
  const containsMatch = locationsData.find(loc => 
    loc.store_number && normalizedEquipLocation.includes(normalizeString(loc.store_number))
  );
  
  if (containsMatch) {
    console.log(`Contains match found for "${equipment.name}": ${containsMatch.store_number}`);
    return containsMatch.store_number;
  }
  
  // Try to match with location name
  const nameMatch = locationsData.find(loc => 
    loc.name && normalizedEquipLocation.includes(normalizeString(loc.name))
  );
  
  if (nameMatch) {
    console.log(`Name match found for "${equipment.name}": ${nameMatch.store_number}`);
    return nameMatch.store_number;
  }
  
  console.log(`No match found for location "${equipment.location}" (equipment: ${equipment.name})`);
  return undefined;
};

/**
 * Calculate risk score and level based on operational equipment percentage
 */
export const calculateRiskMetrics = (operational: number, total: number): { riskScore: number, riskLevel: EquipmentHealthItem["riskLevel"] } => {
  if (total === 0) return { riskScore: 0, riskLevel: "low" };
  
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
    console.log('Insufficient data for processing health matrix');
    return [];
  }
  
  console.log('Processing equipment health data:', {
    equipmentCount: equipmentData.length,
    locationsCount: locationsData.length
  });
  
  // Create a map of store numbers to EquipmentHealthItem
  const storeNumberMap = new Map<string, EquipmentHealthItem>();
  
  // Initialize map with store numbers from database
  locationsData.forEach(location => {
    if (!location.store_number) {
      console.log('Location missing store number:', location.name || 'unnamed location');
      return;
    }
    
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
  let matchedCount = 0;
  let unmatchedCount = 0;
  
  equipmentData.forEach(equipment => {
    const matchedStoreNumber = matchEquipmentToStoreNumber(equipment, locationsData);
    
    if (!matchedStoreNumber) {
      unmatchedCount++;
      return;
    }
    
    matchedCount++;
    
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
  
  console.log(`Equipment matching results: ${matchedCount} matched, ${unmatchedCount} unmatched`);
  
  // Calculate risk scores and levels for each location
  storeNumberMap.forEach(location => {
    if (location.total > 0) {
      const { riskScore, riskLevel } = calculateRiskMetrics(location.operational, location.total);
      location.riskScore = riskScore;
      location.riskLevel = riskLevel;
    }
  });
  
  // Convert map to array and sort by risk score (ascending) so highest risk is first
  const processedData = Array.from(storeNumberMap.values())
    .filter(item => item.total > 0) // Only show store numbers with equipment
    .sort((a, b) => a.riskScore - b.riskScore);
  
  console.log('Final processed health data:', processedData.length, 'locations with equipment');
  return processedData;
};

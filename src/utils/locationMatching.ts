export const normalizeString = (str: string | null | undefined): string => {
  if (!str) return '';
  return str.toLowerCase().trim();
};

export const matchesLocation = (equipLocation: string, storeNumber: string): boolean => {
  const normalizedEquipLocation = normalizeString(equipLocation);
  const normalizedStoreNumber = normalizeString(storeNumber);

  console.log('Matching locations:', {
    equipLocation: normalizedEquipLocation,
    storeNumber: normalizedStoreNumber,
    locationId: storeNumber // Log the original ID for debugging
  });

  // For now, return true to show all equipment while we debug
  // This will help us see what equipment is available
  return true;
};
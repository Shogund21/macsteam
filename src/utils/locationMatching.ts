export const normalizeString = (str: string | null | undefined): string => {
  if (!str) return '';
  return str.toLowerCase().trim();
};

export const matchesLocation = (equipLocation: string, storeNumber: string): boolean => {
  const normalizedEquipLocation = normalizeString(equipLocation);
  const normalizedStoreNumber = normalizeString(storeNumber);

  if (!normalizedEquipLocation || !normalizedStoreNumber) {
    return false;
  }

  const matchConditions = [
    normalizedEquipLocation === normalizedStoreNumber,
    normalizedEquipLocation.includes(normalizedStoreNumber),
    normalizedEquipLocation.includes(`store ${normalizedStoreNumber}`),
    normalizedEquipLocation.includes(`location ${normalizedStoreNumber}`)
  ];

  return matchConditions.some(condition => condition);
};
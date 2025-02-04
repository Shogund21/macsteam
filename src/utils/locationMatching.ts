export const normalizeString = (str: string | null | undefined): string => {
  if (!str) return '';
  return str.toLowerCase().trim();
};

export const matchesLocation = (equipLocation: string, storeNumber: string): boolean => {
  const normalizedEquipLocation = normalizeString(equipLocation);
  const normalizedStoreNumber = normalizeString(storeNumber);

  return normalizedEquipLocation === normalizedStoreNumber;
};
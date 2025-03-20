
/**
 * Utility functions for processing form values before submission
 */

/**
 * Process field values to handle empty strings and undefined values
 * @param value Any form field value
 * @returns null if value is empty string or undefined, otherwise returns the value
 */
export const processField = (value: any) => {
  if (value === "" || value === undefined) {
    return null;
  }
  return value;
};

/**
 * Convert string number values to actual numbers or null
 * @param value String number value or "NA"
 * @returns Number or null if value is "NA" or empty
 */
export const processNumberField = (value: string | undefined) => {
  if (value === "NA" || !value) {
    return null;
  }
  return parseFloat(value);
};

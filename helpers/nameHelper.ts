/**
 * Extracts the first name from a full name string
 * @param fullName - The full name string or any other input
 * @returns The first name in lowercase, or empty string for invalid inputs
 */
export const getFirstName = (fullName: any): string => {
  // Check if input is not a string
  if (typeof fullName !== 'string') {
    return '';
  }

  // Check if string is empty or only whitespace
  if (!fullName || fullName.trim() === '') {
    return '';
  }

  // Split by spaces and get the first part
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0];

  // Return first name in lowercase
  return firstName.toLowerCase();
};
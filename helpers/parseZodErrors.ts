type ZodFieldErrors = Record<string, string[]>;

export function parseZodFieldErrors(
  fieldErrors: ZodFieldErrors
): Record<string, string> {
  return Object.entries(fieldErrors).reduce((acc, [key, value]) => {
    if (value && value.length > 0) {
      acc[key] = value.join(", ");
    }
    return acc;
  }, {} as Record<string, string>);
}

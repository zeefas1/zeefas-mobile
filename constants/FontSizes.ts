/**
 * Font Size Constants
 *
 * This file contains all the font sizes used throughout the app.
 * Use these constants instead of hardcoded values for consistency.
 */

export const FontSizes = {
  // Extra Small - Used for error messages, captions, and fine print
  xs: 11,

  // Small - Used for secondary text, descriptions, and labels
  sm: 12,

  // Base/Medium - Default text size for most content
  base: 14,
  md: 14, // Alias for base

  // Large - Used for buttons, important text, and section headers
  lg: 16,

  // Extra Large - Used for prominent text and medium headers
  xl: 18,

  // 2X Large - Used for section titles and important headers
  "2xl": 20,

  // 3X Large - Used for page titles and main headers
  "3xl": 22,

  // 4X Large - Used for large titles and emphasis
  "4xl": 24,

  // 5X Large - Used for hero text and major headings
  "5xl": 28,

  // 6X Large - Used for display text and large numbers
  "6xl": 32,

  "7xl": 35,
} as const;

// Type for font sizes
export type FontSize = (typeof FontSizes)[keyof typeof FontSizes];

// Alternative export for easier importing
export default FontSizes;

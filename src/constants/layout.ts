/**
 * layout.ts
 * Shared layout constants for consistent spacing throughout the app.
 */

export const LAYOUT = {
  /** Navbar height: h-16 = 64px on mobile, h-18 = 72px on sm+ */
  NAVBAR_HEIGHT: 64, // base height in pixels
  NAVBAR_HEIGHT_SM: 72, // sm+ height in pixels
  
  /** Page top padding to account for fixed navbar */
  PAGE_TOP_PADDING: "pt-20", // 80px (Tailwind pt-20)
  
  /** Sticky element offset from top (should match navbar height) */
  STICKY_TOP: "top-16 sm:top-18", // matches navbar h-16 sm:h-18
} as const;

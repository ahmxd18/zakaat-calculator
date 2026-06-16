# Performance Optimization Notes

## 1. Hero Pattern Image Optimization (REQUIRED)

**Current Status:** `public/images/hero-pattern.png` is 1.9MB
**Target:** < 20KB
**Used at:** 3.5-7% opacity as subtle texture

### Action Required:
Replace the current high-resolution PNG with either:
1. An optimized SVG pattern (recommended - will scale perfectly)
2. A heavily compressed PNG under 20KB

The image is used at very low opacity purely for texture, so high resolution is not needed.

### Files Using This Asset:
- `src/pages/Home.tsx` (hero section, final CTA)
- `src/pages/About.tsx` (hero section)

### Suggested SVG Pattern Alternative:
Create a simple geometric or Islamic-inspired pattern using SVG that will be:
- < 5KB in size
- Infinitely scalable
- Crisp at any resolution
- No quality loss

---

## 2. Vite Build Configuration Review

**File:** `vite.config.ts`

### Current Status:
Uses `vite-plugin-singlefile` to bundle everything into one HTML file.

### Recommendation:
- **Keep** if single-file deployment is a hard requirement (e.g., distributing as a standalone file)
- **Remove** if deploying to a standard web server - standard Vite multi-chunk output provides better:
  - Browser caching (chunks don't re-download if unchanged)
  - Parallel loading
  - Faster updates as the app grows

### To Remove (if not needed):
1. Remove from `vite.config.ts` plugins array
2. Uninstall: `npm uninstall vite-plugin-singlefile`

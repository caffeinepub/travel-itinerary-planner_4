# Specification

## Summary
**Goal:** Improve color contrast accessibility across the app while preserving the warm, earthy visual identity.

**Planned changes:**
- Audit all background and foreground colors for WCAG AA compliance (≥ 4.5:1 for normal text, ≥ 3:1 for large text/interactive elements)
- Replace or adjust low-contrast earthy/sandy colors (overly light sand tones, washed-out terracotta) with more accessible shade variants
- Update CSS custom properties in `frontend/src/index.css` with the accessible palette
- Update Tailwind color tokens in `frontend/tailwind.config.js` to match
- Ensure changes propagate consistently to cards, headers, buttons, form inputs, footer, and all pages (Home, ItineraryForm, ItineraryDetail, Layout)

**User-visible outcome:** All text and interactive elements across the app meet WCAG AA contrast requirements, while the warm, adventurous earthy aesthetic is retained.

# Specification

## Summary
**Goal:** Fix duplicate text on start screen, slow down road scene transitions, add comprehensive audio throughout the journey, and restore road scenes after break point and halt issue overlays.

**Planned changes:**
- Remove duplicate sentences from the StartJourneyScreen component
- Change road image transition timing to 20 seconds per image in AnimatedTravelFallback
- Add audio/sound effects for all interactive elements and transitions throughout the journey
- Show road traveling scene with click-anywhere interaction after break point overlay is dismissed
- Show road traveling scene with click-anywhere interaction after halt issue overlay is resolved

**User-visible outcome:** Users will see a cleaner start screen without duplicate text, experience slower road scene transitions (20 seconds each), hear audio feedback for all interactions and transitions, and see road traveling scenes between break point and halt issue overlays before reaching the final destination.

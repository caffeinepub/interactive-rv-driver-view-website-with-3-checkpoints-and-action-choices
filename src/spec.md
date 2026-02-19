# Specification

## Summary
**Goal:** Require explicit user click/tap to trigger the Break Stop 3 halt issue overlay and the Campfire (Checkpoint 1) destination screen, instead of auto-advancing after delays.

**Planned changes:**
- Update the post-break-stop-3 delay flow so it no longer auto-transitions into the halt issue overlay; add a clear click/tap action (scene click and/or a visible button) to enter the halt issue overlay.
- Update the traveling-to-destination flow so it no longer auto-transitions into the campfire destination screen; add a clear click/tap action (scene click and/or a visible button) to enter the campfire destination screen.
- Ensure the campfire destination UI and celebration sound only trigger when the user performs the click/tap transition (not earlier).

**User-visible outcome:** After Break Stop 3 and on arrival to the destination, the app waits for the user to click/tap to continue; only then the halt issue quiz or the campfire destination screen appears (with the celebration sound playing upon entering the campfire screen).

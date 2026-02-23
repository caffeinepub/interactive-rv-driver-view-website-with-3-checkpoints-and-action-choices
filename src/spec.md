# Specification

## Summary
**Goal:** Restructure the RV journey flow to use exactly two videos with a rest point between them, followed by a night road image and campfire destination ending.

**Planned changes:**
- Modify journey flow to play first video at start, then show rest point/break point on click
- Play second video after continuing from rest point, then trigger halt issue on click
- Display night road static image after resolving the issue
- Show destination arrived screen with campfire image when clicking the night road image
- Remove any intermediate travel videos between rest point and halt issue
- Update useRVFlow hook state machine to support the new sequence: start → video 1 → rest point → video 2 → issue → night image → campfire destination → completion

**User-visible outcome:** Users experience a streamlined two-video journey with clear interaction points: clicking advances from first video to rest point, from rest point to second video, from second video to issue overlay, from resolved issue to night road, and from night road to the final campfire destination celebration.

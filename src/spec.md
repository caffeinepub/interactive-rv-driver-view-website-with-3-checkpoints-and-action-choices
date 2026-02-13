# Specification

## Summary
**Goal:** Make checkpoint arrival (and the checkpoint activity overlay) advance via a user click/tap on the traveling screen instead of an elapsed-time trigger.

**Planned changes:**
- Update traveling segments so a single click/tap anywhere on the journey/traveling screen triggers arrival at the current segment’s checkpoint and opens the CheckpointOverlay.
- Remove/neutralize TravelVideoScene’s timer-based checkpoint-arrival progression while keeping video playback health monitoring and animated fallback scenery behavior intact.
- Update RVExperience to wire the click/tap trigger to the existing startCheckpoint(segment) flow and stop using the timed travelDuration/onTravelTimeReached path for checkpoint arrival.
- Update the traveling on-screen guidance text (English) to indicate the user can click/tap to reach the next checkpoint, without referencing time.

**User-visible outcome:** While traveling, the user can click/tap anywhere on the journey screen to reach the next checkpoint and immediately see the checkpoint activity overlay; nothing auto-advances based on time, and repeated clicks during transition/overlay won’t cause duplicate actions.

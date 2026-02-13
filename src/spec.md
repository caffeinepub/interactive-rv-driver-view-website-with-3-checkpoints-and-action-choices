# Specification

## Summary
**Goal:** Ensure travel segments always show scenery, refresh checkpoint activities to be mostly water-related, and add a post-checkpoint-3 halt that resumes into a campfire destination before journey completion.

**Planned changes:**
- Fix traveling-state visuals so the RV front-view travel video renders when available, with a reliable non-empty fallback scene if the video is missing or fails to play (without impacting timed checkpoint progression).
- Update checkpoint activity options to 3–4 choices that are mostly water-related tasks (e.g., cooking, cleaning, freshen up, coffee/tea, refreshments), while preserving the existing 1–2 selection limit and keeping the internal consumption mechanic hidden from UI copy.
- After checkpoint 3 action playback, introduce a halt/issue state that blocks automatic continuation and shows an unidentified-issue message plus a button labeled exactly “Issue resolved”.
- After clicking “Issue resolved”, resume traveling and continue to a final static destination scene depicting a campfire, then show the end-of-journey completion UI with restart still supported.

**User-visible outcome:** During travel, users always see scenery (video or fallback), encounter more water-themed checkpoint actions (selecting 1–2), experience a forced stop after checkpoint 3 that only continues when “Issue resolved” is clicked, and then reach a campfire destination before the journey completion screen.

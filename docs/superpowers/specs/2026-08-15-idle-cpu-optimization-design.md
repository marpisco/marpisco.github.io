# Idle CPU Optimization Design

## Goal

Reduce continuous client-side work while preserving live Discord presence. The page must refresh Discord presence every ten seconds and retain the current visual design and accessibility behavior.

## Chosen approach

Replace the permanent Lanyard WebSocket connection with a REST request every ten seconds while the document is visible. Fetch immediately at startup and whenever a backgrounded tab becomes visible. Suspend the interval while hidden and abort an in-flight request during page teardown.

The hero subtitle will type the first message once, then remain static. Its cursor will be hidden when typing completes, removing its indefinite JavaScript timer and CSS animation.

## Runtime behavior

1. The initial page load requests the current Discord presence and displays it.
2. While the page is visible, one interval requests a new presence value every 10,000 ms.
3. When the document is hidden, the interval is stopped. When visible again, a fresh request runs immediately and polling resumes.
4. A failed request displays the existing unavailable state and the next scheduled request retries.
5. The first hero message types once and then stops. Users who request reduced motion continue to receive the full static message immediately.

## Scope and safeguards

- Preserve the displayed status and activity formatting, current theme behavior, and reveal effects.
- Remove the Lanyard socket, heartbeat, reconnect, and unload cleanup paths; they are no longer needed.
- Add tests for the polling lifecycle logic and terminal typing state.
- Build and type-check after implementation.

## Verification

- Unit tests demonstrate that a completed first message reaches an idle terminal state rather than cycling into deletion.
- Unit tests demonstrate that polling starts once, pauses while hidden, and resumes with an immediate refresh.
- The production build and TypeScript check complete without errors.

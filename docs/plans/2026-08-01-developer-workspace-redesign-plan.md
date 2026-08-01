# Developer Workspace Redesign Revision Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Bring the implemented developer-workspace design back in line with
the approved mockup by using portfolio-section files in the Explorer, adding a
cycling IDE-style subtitle, and removing the unused Portugal flag asset.

**Architecture:** Keep the existing Vite and vanilla TypeScript structure. Put
the subtitle transition logic in a small pure module so its boundary behavior
can be tested without browser timers. Keep DOM rendering and timers in
`src/main.ts`, and use CSS for the cursor and reduced-motion presentation.

**Tech Stack:** TypeScript 5.9, Vite 7, vanilla HTML/CSS, Bun test runner

## Global Constraints

- Keep all existing biography, skill, experience, education, post, and contact
  content.
- Keep the first subtitle exactly as
  `Developer and System Administrator based in Portugal.`
- Do not add dependencies or restore Discord content.
- Preserve System, Dark, and Light modes and existing writeup behavior.
- Keep the result responsive and accessible.
- Use separate commits for this specification, this plan, and implementation.

## File Structure

- Create `src/typing.ts`: pure typing-state transition logic and messages.
- Create `tests/typing.test.mjs`: Bun tests for typing, deleting, advancing, and
  wrapping through the message list.
- Modify `src/main.ts`: content Explorer links, typed subtitle markup, timer
  setup, and reduced-motion behavior.
- Modify `src/styles.css`: IDE subtitle, cursor, screen-reader helper, and
  simplified content Explorer styling.
- Delete `public/images/portugal-flag.svg`: unused asset.

### Task 1: Test the Typing State

**Files:**
- Create: `tests/typing.test.mjs`
- Create: `src/typing.ts`

**Interface:**

```ts
export type TypingDirection = 'typing' | 'deleting';

export interface TypingState {
  messageIndex: number;
  visibleCharacters: number;
  direction: TypingDirection;
}

export const HERO_MESSAGES: readonly string[];
export const INITIAL_TYPING_STATE: TypingState;

export function nextTypingState(
  state: TypingState,
  messages: readonly string[],
): TypingState;
```

- [ ] Add focused tests before creating `src/typing.ts`.
- [ ] Verify the test fails because the production module is missing.
- [ ] Implement the smallest state transition that types one character,
  switches direction at the end, deletes one character, advances to the next
  message at zero, and wraps after the final message.
- [ ] Run `bun test tests/typing.test.mjs` and confirm it passes.

### Task 2: Restore the Mockup Explorer

**File:** `src/main.ts`

- [ ] Remove the repository source URL helper and real repository tree.
- [ ] Render `MARCOPISCO.COM` with these direct section links:
  `about.ts`, `stack.json`, `experience.ts`, `education.md`, `writeups/`, and
  `contact.ts`.
- [ ] Keep the existing responsive behavior that hides the Explorer when there
  is not enough width.

### Task 3: Add the IDE Subtitle

**Files:** `src/main.ts`, `src/styles.css`

- [ ] Render a static IDE declaration around a dedicated typed-string element.
- [ ] Cycle these messages in order:
  1. `Developer and System Administrator based in Portugal.`
  2. `Building secure infrastructure and reliable platforms.`
  3. `Automating systems for dependable operations.`
  4. `Delivering practical software from code to production.`
- [ ] Type at 48 ms per character, hold for 1600 ms, delete at 28 ms per
  character, and pause 350 ms before the next message.
- [ ] Add a blinking caret through CSS.
- [ ] When `prefers-reduced-motion: reduce` is active, do not start a timer and
  show the complete first message without a blinking caret.
- [ ] Give assistive technology one static copy of the first subtitle and hide
  the animated copy from the accessibility tree.

### Task 4: Remove the Flag and Verify

**Files:**
- Modify: `src/main.ts`
- Modify: `src/styles.css`
- Delete: `public/images/portugal-flag.svg`

- [ ] Remove the flag markup and obsolete flag styles.
- [ ] Delete the unused SVG asset.
- [ ] Run `bun test`.
- [ ] Run `bun run typecheck`.
- [ ] Run `bun run build`.
- [ ] Run `git diff --check`.
- [ ] Confirm the page returns HTTP 200 and the removed flag path no longer
  returns SVG content or appears in the production bundle.
- [ ] Open the current Vite page in the in-app Browser for visual review.
- [ ] Commit the implementation and push
  `codex/developer-workspace-redesign`.

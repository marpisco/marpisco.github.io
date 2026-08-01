# Developer Workspace Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current portfolio presentation with the approved developer-workspace design, real repository Explorer, and system-aware light/dark themes while preserving all existing content and writeups behavior.

**Architecture:** Keep the existing Vite and vanilla TypeScript application. Add one small pure theme-preference module so theme transitions can be tested without a browser, render the approved semantic layout from `src/main.ts`, and define the complete responsive design through CSS variables in `src/styles.css`. Existing content arrays and writeup functions remain the source of truth.

**Tech Stack:** TypeScript 5.9, Vite 7, vanilla HTML/CSS, Bun test runner

## Global Constraints

- Keep TypeScript, Vite, and vanilla CSS.
- Do not add dependencies.
- Keep all existing biography, skill, experience, education, posts, and contact content.
- Do not restore Discord content, links, identifiers, or network connections.
- Keep `public/writeups/index.json` and `public/writeups/<slug>.md` behavior unchanged.
- Keep `.github/workflows/deploy-pages.yml` and `CNAME` unchanged.
- Support System, Dark, and Light theme modes under the `marcopisco-theme` storage key.
- Keep the page responsive and respect `prefers-reduced-motion`.
- Use real repository paths in the desktop Explorer.

---

## File Structure

- Create `src/theme.ts`: pure theme parsing, cycling, and resolution functions.
- Create `tests/theme.test.mjs`: Bun tests for the theme state transitions.
- Modify `package.json`: add the `bun test` script without adding packages.
- Modify `src/main.ts`: workspace markup, repository Explorer, theme DOM setup,
  responsive navigation structure, and existing writeup integration.
- Replace `src/styles.css`: light/dark variables and all workspace component,
  writeup, accessibility, animation, and responsive styling.

### Task 1: Tested Theme Preference Model

**Files:**
- Create: `tests/theme.test.mjs`
- Create: `src/theme.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `ThemePreference = 'system' | 'dark' | 'light'`
- Produces: `ResolvedTheme = 'dark' | 'light'`
- Produces: `THEME_STORAGE_KEY = 'marcopisco-theme'`
- Produces: `parseThemePreference(value: string | null): ThemePreference`
- Produces: `nextThemePreference(current: ThemePreference): ThemePreference`
- Produces: `resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): ResolvedTheme`

- [ ] **Step 1: Add the failing Bun tests**

Create `tests/theme.test.mjs`:

```js
import { describe, expect, test } from 'bun:test';
import {
  nextThemePreference,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
} from '../src/theme.ts';

describe('theme preference', () => {
  test('uses the expected storage key', () => {
    expect(THEME_STORAGE_KEY).toBe('marcopisco-theme');
  });

  test('accepts supported saved values and rejects invalid values', () => {
    expect(parseThemePreference('dark')).toBe('dark');
    expect(parseThemePreference('light')).toBe('light');
    expect(parseThemePreference('system')).toBe('system');
    expect(parseThemePreference('sepia')).toBe('system');
    expect(parseThemePreference(null)).toBe('system');
  });

  test('cycles system, dark, light, then system', () => {
    expect(nextThemePreference('system')).toBe('dark');
    expect(nextThemePreference('dark')).toBe('light');
    expect(nextThemePreference('light')).toBe('system');
  });

  test('resolves system preference and explicit overrides', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });
});
```

- [ ] **Step 2: Run the tests and verify the missing module failure**

Run: `bun test tests/theme.test.mjs`

Expected: FAIL because `src/theme.ts` does not exist.

- [ ] **Step 3: Implement the minimal theme model**

Create `src/theme.ts`:

```ts
export type ThemePreference = 'system' | 'dark' | 'light';
export type ResolvedTheme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'marcopisco-theme';

export function parseThemePreference(value: string | null): ThemePreference {
  if (value === 'dark' || value === 'light') {
    return value;
  }
  return 'system';
}

export function nextThemePreference(current: ThemePreference): ThemePreference {
  if (current === 'system') {
    return 'dark';
  }
  if (current === 'dark') {
    return 'light';
  }
  return 'system';
}

export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ResolvedTheme {
  if (preference === 'system') {
    return systemPrefersDark ? 'dark' : 'light';
  }
  return preference;
}
```

- [ ] **Step 4: Add the test script**

Add this entry to `package.json` scripts:

```json
"test": "bun test"
```

- [ ] **Step 5: Run the focused and project checks**

Run: `bun test tests/theme.test.mjs`

Expected: 4 tests pass.

Run: `bun run typecheck`

Expected: exit code 0.

- [ ] **Step 6: Commit the theme model**

```bash
git add package.json src/theme.ts tests/theme.test.mjs
git commit -m "feat(theme): add system-aware theme preferences"
```

### Task 2: Developer Workspace Markup and Runtime

**Files:**
- Modify: `src/main.ts:1-607`

**Interfaces:**
- Consumes: all exports from `src/theme.ts`.
- Preserves: `escapeHtml`, `markdownToHtml`, `renderWriteup`, `closeWriteup`,
  `setupScrollReveal`, and `loadWriteups` behavior.
- Produces: `setupThemeControl(): void` bound to `#theme-toggle`.
- Produces: the DOM hooks used by Task 3, including `.workspace-window`,
  `.workspace-bar`, `.hero`, `.repository-explorer`, `.code-section`,
  `.record`, `.theme-toggle`, `.writeup-viewer`, and `.contact-actions`.

- [ ] **Step 1: Import the theme model and define repository source URLs**

Add after the stylesheet import:

```ts
import {
  nextThemePreference,
  parseThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from './theme';

const repositorySourceUrl = 'https://github.com/marpisco/marpisco.github.io/blob/main';

function sourceFileUrl(path: string): string {
  return `${repositorySourceUrl}/${path}`;
}
```

- [ ] **Step 2: Replace the header and hero markup**

Render this semantic structure inside `app.innerHTML`, interpolating the
existing name, role, location, flag, and profile asset exactly as shown:

```html
<div class="page-bg"></div>
<header class="topbar">
  <nav class="container nav-wrap" aria-label="Primary navigation">
    <a class="brand" href="#home"><span>&lt;</span>marcopisco.com<span> /&gt;</span></a>
    <p class="repository-path" aria-label="Current file">portfolio / src / main.ts</p>
    <div class="nav-actions">
      <div class="nav-links">
        <a href="#about">about()</a>
        <a href="#skills">stack[]</a>
        <a href="#experience">experience[]</a>
        <a href="#education">education</a>
        <a href="#writeups">posts()</a>
        <a href="#contact">contact()</a>
      </div>
      <button id="theme-toggle" class="theme-toggle" type="button">
        <span id="theme-icon" aria-hidden="true">◐</span>
        <span id="theme-label">System</span>
      </button>
    </div>
  </nav>
</header>
<main class="container page-shell">
  <section id="home" class="workspace-window hero-window">
    <div class="workspace-bar" aria-hidden="true">
      <span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span>
      <span class="file-tab">home.ts</span>
    </div>
    <div class="hero">
      <div class="hero-copy">
        <p class="code-comment">Portfolio entry point</p>
        <h1><span>const developer =</span>Marco <strong>Pisco</strong>;</h1>
        <p class="hero-subtitle"><strong>Developer and System Administrator</strong> based in <span class="location-inline">Portugal <img class="inline-flag" src="/images/portugal-flag.svg" alt="Portugal flag" /></span>.</p>
        <div class="hero-actions"><a class="code-button primary" href="#experience">View experience →</a><a class="code-button" href="#contact">Get in touch</a></div>
      </div>
      <aside class="hero-media">
        <div class="avatar-frame"><img class="avatar" src="/images/marco-profile.png" alt="Marco Pisco" /></div>
        <pre class="profile-code" aria-label="Profile summary"><code>interface Profile {
  role: "Developer";
  focus: "Systems";
  location: "Portugal";
}</code></pre>
      </aside>
    </div>
  </section>
</main>
```

- [ ] **Step 3: Add the real repository Explorer**

Inside a second `.workspace-window.content-window`, add an
`aside.repository-explorer` with nested lists matching the spec tree. Use
`sourceFileUrl()` for `.github/workflows/deploy-pages.yml`, `src/main.ts`,
`src/styles.css`, `CNAME`, and `README.md`. Use same-origin links for
`/images/marco-profile.png`, `/images/portugal-flag.svg`, and
`/writeups/index.json`. Every file link uses `target="_blank"` and
`rel="noreferrer"`. Folder rows are `<span>` elements and do not pretend to be
interactive.

The exact visible tree is:

```text
MARCOPISCO.GITHUB.IO
.github/workflows/deploy-pages.yml
public/images/marco-profile.png
public/images/portugal-flag.svg
public/writeups/index.json
src/main.ts
src/styles.css
CNAME
README.md
```

- [ ] **Step 4: Re-render the existing sections in the workspace content pane**

Use a `.workspace-content` sibling to the Explorer. Render the section hooks and
existing data with this structure:

```ts
<div class="workspace-content">
  <article id="about" class="code-section">
    <p class="section-comment">About me</p>
    <h2><span>export</span> about</h2>
    <div class="about-copy">
      <p>I am a software developer and system administrator focused on secure infrastructure, practical product delivery, and dependable operations.</p>
      <p>I work across software engineering, systems administration, and security-focused infrastructure, with a strong focus on reliability, automation, and maintainable operations.</p>
    </div>
  </article>
  <article id="skills" class="code-section">
    <p class="section-comment">Tech stack</p>
    <h2><span>const</span> stack[]</h2>
    <div class="skills">${techStack.map((skill) => `<span class="skill">${skill}</span>`).join('')}</div>
  </article>
  <article id="experience" class="code-section">
    <p class="section-comment">Experience records</p>
    <h2><span>export</span> experience[]</h2>
    <div class="records">
      ${experience.map((item) => `
        <article class="record">
          <p class="record-date">${item.years}</p>
          <div class="record-content">
            <h3>${item.role}</h3>
            <p class="company">${item.company}</p>
            <p class="summary">${item.summary}</p>
            <div class="tags">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          </div>
        </article>
      `).join('')}
    </div>
  </article>
  <article id="education" class="code-section">
    <p class="section-comment">Education</p>
    <h2><span>read</span> education.md</h2>
    <div class="records">
      ${education.map((item) => `
        <article class="record education-record">
          <p class="record-date">${item.years}</p>
          <div class="record-content">
            <h3>${item.school}</h3>
            <p class="company">${item.program}</p>
            <p class="summary">${item.summary}</p>
            <div class="tags">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          </div>
        </article>
      `).join('')}
    </div>
  </article>
  <article id="writeups" class="code-section">
    <p class="section-comment">Posts</p>
    <h2><span>fetch</span> writeups/</h2>
    <div id="writeups-list" class="records"></div>
    <article id="writeup-viewer" class="writeup-viewer hidden"></article>
  </article>
  <article id="contact" class="code-section">
    <p class="section-comment">Contact</p>
    <h2><span>await</span> getInTouch()</h2>
    <p class="contact-copy">If you need help with platform engineering, production hardening, or full-stack delivery, I am available for collaborations.</p>
    <div class="contact-actions">
      <a class="code-button primary" href="mailto:marco@marcopisco.com">Email</a>
      <a class="code-button" href="https://www.linkedin.com/in/marco-p-440068329/" target="_blank" rel="noreferrer">LinkedIn</a>
      <a class="code-button" href="https://github.com/marpisco" target="_blank" rel="noreferrer">GitHub</a>
    </div>
  </article>
</div>
```

For every section:

- Keep the current prose and data arrays unchanged.
- Use `.section-comment` for the small file-style label and a normal `h2` for
  the visible section title.
- Render experience and education items as `.record` elements with
  `.record-date`, `.record-content`, `.company`, `.summary`, and `.tags`.
- Keep `#writeups-list` and `#writeup-viewer` IDs unchanged.
- Keep the Email, LinkedIn, and GitHub URLs unchanged.
- Keep the copyright footer text unchanged.

- [ ] **Step 5: Implement the DOM theme controller**

Add this function before `loadWriteups()`:

```ts
function setupThemeControl(): void {
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle');
  const label = document.querySelector<HTMLElement>('#theme-label');
  const icon = document.querySelector<HTMLElement>('#theme-icon');
  if (!button || !label || !icon) {
    return;
  }

  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference: ThemePreference = 'system';

  try {
    preference = parseThemePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    preference = 'system';
  }

  const applyTheme = (): void => {
    const resolved = resolveTheme(preference, systemTheme.matches);
    document.documentElement.dataset.theme = resolved;
    document.documentElement.style.colorScheme = resolved;
    label.textContent = preference[0].toUpperCase() + preference.slice(1);
    icon.textContent = preference === 'dark' ? '●' : preference === 'light' ? '○' : '◐';
    button.setAttribute('aria-label', `Theme: ${label.textContent}. Activate to change theme.`);
  };

  button.addEventListener('click', () => {
    preference = nextThemePreference(preference);
    try {
      if (preference === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, preference);
      }
    } catch {
      // Theme still works for the current page when storage is unavailable.
    }
    applyTheme();
  });

  systemTheme.addEventListener('change', () => {
    if (preference === 'system') {
      applyTheme();
    }
  });

  applyTheme();
}
```

- [ ] **Step 6: Remove obsolete hero behavior and update reveal selectors**

- Delete `setupNameGradientTrack()` and its final invocation because the new
  hero has no `.gradient-name` interaction.
- Update `setupScrollReveal()` selectors to target `.workspace-window`,
  `.hero-copy`, `.hero-media`, `.code-section`, `.record`, `.skill`,
  `.writeup-card`, and `.contact-actions`.
- Add `setupThemeControl()` before `setupScrollReveal()` in the final startup
  sequence.

- [ ] **Step 7: Run behavior checks and commit the structure**

Run: `bun test`

Expected: all theme tests pass.

Run: `bun run typecheck`

Expected: exit code 0.

Run a case-insensitive source scan for `discord`, `lanyard`, and the removed
Discord user ID, excluding `node_modules`, `dist`, and `.git`.

Expected: no matches.

```bash
git add src/main.ts
git commit -m "feat(site): add developer workspace structure"
```

### Task 3: Complete Responsive Light and Dark Styling

**Files:**
- Modify: `src/styles.css:1-661`

**Interfaces:**
- Consumes: the DOM classes produced by Task 2.
- Produces: complete styling for both `[data-theme='light']` and
  `[data-theme='dark']`, with `prefers-color-scheme` as the no-JavaScript
  fallback.

- [ ] **Step 1: Replace the root design tokens**

Define light defaults and a dark media-query fallback. Repeat the dark values
under `:root[data-theme='dark']` and the light values under
`:root[data-theme='light']` so manual overrides win:

```css
:root {
  color-scheme: light dark;
  --bg: #f4f7fa;
  --surface: rgba(255, 255, 255, 0.88);
  --surface-solid: #ffffff;
  --surface-2: #eaf0f4;
  --text: #132029;
  --muted: #657681;
  --line: #ccd8df;
  --line-strong: #9aabb5;
  --cyan: #007f9e;
  --violet: #694dd8;
  --green: #167a55;
  --pink: #bd3f77;
  --glow: rgba(0, 127, 158, 0.12);
  --shadow: 0 16px 40px rgba(25, 45, 58, 0.1);
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Space Grotesk', sans-serif;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #090d12;
    --surface: rgba(15, 22, 30, 0.9);
    --surface-solid: #0f161e;
    --surface-2: #141e28;
    --text: #e6edf3;
    --muted: #8b9ba7;
    --line: #263541;
    --line-strong: #3b5060;
    --cyan: #56d6f8;
    --violet: #aa91ff;
    --green: #62d8a6;
    --pink: #f47fb4;
    --glow: rgba(86, 214, 248, 0.1);
    --shadow: 0 18px 50px rgba(0, 0, 0, 0.28);
  }
}
```

- [ ] **Step 2: Style the workspace shell and navigation**

Implement these exact layout rules:

- `body`: `var(--bg)`, subtle 64px grid using `var(--line)`, `var(--sans)`.
- `.container`: maximum width 1180px with 18px side gutters.
- `.topbar`: sticky, blurred, 64px minimum height, one-pixel bottom border.
- `.nav-wrap`: flex row with brand, centered repository path, nav links, and
  theme button.
- `.workspace-window`: 12px radius, one-pixel strong border, translucent
  surface, clipped overflow, and `var(--shadow)`.
- `.workspace-bar`: 43px row with three colored 9px dots and a monospace file
  tab.
- All links and controls: visible `:focus-visible` outline using `var(--cyan)`.

- [ ] **Step 3: Style the hero and repository workspace**

- `.hero`: two columns, `1.3fr minmax(330px, .7fr)`, minimum height 610px.
- `.hero-copy`: centered vertically with responsive 40px to 88px padding.
- Hero name: fluid 3.2rem to 7rem type, cyan surname, violet syntax label.
- `.hero-media`: bordered secondary surface, square image no wider than 270px,
  violet offset frame, and monospace profile block.
- `.content-window`: `190px minmax(0, 1fr)` grid.
- `.repository-explorer`: secondary surface with right border and compact tree.
- Tree indentation uses `.tree-depth-1`, `.tree-depth-2`, and `.tree-depth-3`;
  file links use cyan/violet file-type accents without fake controls.

- [ ] **Step 4: Style content, records, posts, and contact**

- `.code-section`: 42px to 82px responsive padding and bottom border.
- `.section-comment`: green monospace comment treatment.
- `.skills`: wrapping row of compact bordered tags.
- `.record`: two-column `155px minmax(0, 1fr)` layout, solid theme surface,
  border, and 8px radius.
- `.education-record`: violet left border.
- `.writeup-viewer` and Markdown descendants: theme-aware heading, paragraph,
  inline-code, preformatted-code, and list colors.
- `.contact-actions`: wrapping buttons that use the same `.code-button` system.
- Hover movement never exceeds two pixels and is disabled under reduced motion.

- [ ] **Step 5: Add responsive and reduced-motion rules**

At `max-width: 900px`:

- Hide `.repository-path`, desktop `.nav-links`, and `.repository-explorer`.
- Make `.content-window` and `.hero` one column.
- Remove the hero media left border and add a top border.
- Stack `.record` and contact content.

At `max-width: 600px`:

- Use 9px page gutters.
- Reduce workspace and section padding.
- Keep the theme button visible.
- Render the primary links as a compact horizontally scrollable row below the
  main header row.
- Keep all content within the viewport.

Under `prefers-reduced-motion: reduce`, remove reveal transforms, transition
motion, and smooth scrolling while keeping content visible.

- [ ] **Step 6: Run automated validation**

Run: `bun test`

Expected: all tests pass.

Run: `bun run typecheck`

Expected: exit code 0.

Run: `bun run build`

Expected: Vite production build exits successfully.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 7: Verify the actual browser behavior**

Start the Vite development server and use the in-app Browser.

Verify at desktop width:

- Real repository paths are visible and open the intended source/assets.
- Header section links scroll to the correct content.
- System, Dark, and Light cycle in that order.
- Dark and Light remain after reload; System removes the stored override.
- Experience, Education, empty Posts, and Contact render with unchanged copy.

Verify at mobile width:

- Explorer is hidden.
- Primary navigation and theme control remain available.
- Hero, records, tags, post state, and contact links have no horizontal overflow.

For a representative post check, temporarily add one index entry and one small
Markdown fixture through `apply_patch`, open and close the post in the browser,
then restore `public/writeups/index.json` and remove the temporary Markdown file
through `apply_patch`. Confirm `git status --short` shows no public writeup
changes afterward.

- [ ] **Step 8: Commit and push the completed redesign**

```bash
git add src/styles.css
git commit -m "feat(site): style developer workspace redesign"
git push origin codex/developer-workspace-redesign
```

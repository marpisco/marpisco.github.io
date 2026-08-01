# Developer Workspace Redesign Spec

## Goal

Redesign `marcopisco.com` as a distinctive developer workspace while keeping the
website's existing content, links, writeups behavior, and static Vite deployment.

The design should feel connected to Marco's work in software development and
systems administration without becoming a novelty terminal interface. It must
be equally intentional in light and dark mode.

## Visual Direction

- Use an editor-inspired layout with a restrained technical identity.
- Replace the current orange palette with neutral surfaces and cyan, violet,
  green, and pink syntax-style accents.
- Use a readable sans-serif font for normal content and a monospace font for
  file paths, labels, metadata, tags, and small interface details.
- Use subtle grid lines, file tabs, window borders, and syntax-like labels to
  establish the developer theme.
- Keep content legible and professional. Code styling supports the hierarchy;
  it does not replace normal prose with decorative code.

## Theme Behavior

- Follow the operating system's light or dark preference by default.
- Provide a visible three-state theme control: System, Dark, and Light.
- Cycle the control in the order System, Dark, Light.
- Store an explicit Dark or Light selection under `marcopisco-theme` in local
  storage.
- Remove the stored override when System is selected.
- React to operating-system theme changes while System mode is active.
- Set `color-scheme` and accessible control labels to match the active mode.
- Define both themes through shared CSS variables so every component supports
  both modes consistently.

## Page Structure

### Header

- Keep `marcopisco.com` as the brand.
- Present the current page as a repository path such as
  `portfolio / src / main.ts`.
- Keep direct navigation to About, Skills, Experience, Education, Posts, and
  Contact.
- Place the theme control in the header.

### Hero

- Keep Marco Pisco's name, role, location, Portuguese flag, and profile image.
- Present the name and role with restrained TypeScript-inspired syntax.
- Keep clear actions for Experience and Contact.
- Do not introduce invented availability, employment, or project claims.

### Explorer

Use real paths from this repository instead of invented portfolio files. The
desktop Explorer should show a compact subset of the actual tree:

```text
MARCOPISCO.GITHUB.IO
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── public/
│   ├── images/
│   │   ├── marco-profile.png
│   │   └── portugal-flag.svg
│   └── writeups/
│       └── index.json
├── src/
│   ├── main.ts
│   └── styles.css
├── CNAME
└── README.md
```

- File and folder labels must match real repository names.
- Folder rows are static context. Source and configuration file rows open their
  matching `github.com/marpisco/marpisco.github.io/blob/main/...` page in a new
  tab. Public image and writeup rows open their matching same-origin asset in a
  new tab.
- The Explorer is secondary context, not the only site navigation.
- Hide the Explorer on smaller screens instead of introducing a complex drawer.

### Content Sections

- Keep the existing About, Tech Stack, Experience, Education, Posts, and Contact
  content.
- Use editor-window framing and light syntax-inspired section labels.
- Present experience and education as readable records, not large generic cards.
- Keep every existing skill and education tag.
- Preserve Email, LinkedIn, and GitHub contact links.
- Do not restore Discord content or connections.

### Posts

- Continue loading `public/writeups/index.json` at runtime.
- Continue loading each Markdown file from `public/writeups/<slug>.md`.
- Preserve the existing empty, missing-index, loading, and failed-file states.
- Keep post cards clickable and retain the current open/close behavior.
- Restyle generated Markdown to fit both themes.

## Responsive Behavior

- Keep the main content fully readable on desktop, tablet, and mobile.
- Collapse the two-column hero into one column on narrow screens.
- Hide the repository Explorer when space is limited.
- Keep primary navigation and the theme control accessible on mobile.
- Stack experience records and contact actions without horizontal overflow.
- Respect `prefers-reduced-motion` for any retained reveal or hover animation.

## Implementation Boundaries

- Keep TypeScript, Vite, and vanilla CSS.
- Do not add dependencies.
- Update `src/main.ts` and `src/styles.css`; reuse current assets in `public/`.
- Keep the GitHub Pages workflow, CNAME, and writeups data format unchanged.
- Avoid unrelated content edits or application refactors.

## Error Handling and Accessibility

- Preserve existing writeup fetch error states.
- Use semantic sections, headings, navigation, buttons, links, and alternative
  text.
- Ensure keyboard focus is visible in both themes.
- Maintain sufficient foreground, border, and control contrast in both themes.
- Keep the page usable when JavaScript theme storage is unavailable; system
  theme remains the CSS fallback.

## Validation

- Run `bun run typecheck`.
- Run `bun run build`.
- Verify the page in the in-app browser at desktop and mobile widths.
- Verify System, Dark, and Light theme modes.
- Verify system theme changes are followed while System mode is active.
- Verify all section navigation and contact links.
- Verify empty writeups and at least one representative Markdown post flow.
- Confirm the production code contains no Discord or Lanyard references.

## Non-Goals

- Adding new portfolio content, projects, or professional claims.
- Changing the writeups file format or deployment workflow.
- Building a full code editor, terminal emulator, or file browser.
- Adding a frontend framework, icon library, or animation dependency.

# AGENTS.MD

## Project
- Personal website for `marcopisco.com`
- Stack: TypeScript + Vite + vanilla CSS
- Entry point: `src/main.ts`
- Styles: `src/styles.css`
- Static assets: `public/`

## Local workflow
- Install: `bun install`
- Dev server: `bun run dev`
- Type check + build: `bun run build`
- Preview build: `bun run preview`

## Deployment
- GitHub Pages deploy is automated by `.github/workflows/deploy-pages.yml`
- Push to `main` triggers build and deploy
- Domain is configured by `CNAME`

## Editing guidelines
- Make focused, minimal diffs
- Keep website responsive on desktop/mobile
- Preserve existing Discord presence + writeups/posts behavior unless asked to change it
- Prefer updating source files in `src/` and `public/`, not generated output in `dist/`
- Create a git commit after completing each requested change

## Content
- Use `Marco Pisco` as the name without aliases
- Do not describe Marco as a student; the professional IT Systems course finished in July 2026
- Keep the Discord live status, but do not display a Discord username or former alias

## Posts workflow
- Posts live in `public/writeups/` and need no application code changes
- Add each post as a Markdown file named `public/writeups/<slug>.md`
- Register each post in `public/writeups/index.json` with `slug`, `title`, `date`, `summary`, and `tags`
- Keep `public/writeups/index.json` as valid JSON; use an empty array when there are no posts
- Use a unique URL-safe slug, an ISO `YYYY-MM-DD` date, and a string array for tags
- The existing Posts section fetches the index and renders the Markdown content

## Validation
- Run `bun run typecheck` for quick safety check
- If build tooling is available, run `bun run build`

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

## Validation
- Run `bun run typecheck` for quick safety check
- If build tooling is available, run `bun run build`

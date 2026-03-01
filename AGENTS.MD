# AGENTS.MD

## Project
- Personal website for `marcopisco.com`
- Stack: TypeScript + Vite + vanilla CSS
- Entry point: `src/main.ts`
- Styles: `src/styles.css`
- Static assets: `public/`

## Local workflow
- Install: `npm install`
- Dev server: `npm run dev`
- Type check + build: `npm run build`
- Preview build: `npm run preview`

## Deployment
- GitHub Pages deploy is automated by `.github/workflows/deploy-pages.yml`
- Push to `main` triggers build and deploy
- Domain is configured by `CNAME`

## Editing guidelines
- Make focused, minimal diffs
- Keep website responsive on desktop/mobile
- Preserve existing Discord presence + writeups/posts behavior unless asked to change it
- Prefer updating source files in `src/` and `public/`, not generated output in `dist/`

## Validation
- Run `npx tsc --noEmit` for quick safety check
- If build tooling is available, run `npm run build`


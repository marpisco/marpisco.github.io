# CLAUDE.MD

## Context
- This repository is a personal portfolio site.
- Main runtime code lives in `src/main.ts`.
- Main styling lives in `src/styles.css`.
- Public assets and writeups live in `public/`.

## What to optimize for
- Clean, direct implementation over overengineering
- Strong visual consistency and responsive behavior
- Fast iteration with small, reviewable commits

## Constraints
- Do not break existing sections: Home, About, Skills, Experience, Education, Posts, Contact
- Keep Discord presence integration working (Lanyard websocket flow in `src/main.ts`)
- Keep posts loading from `public/writeups/index.json`
- Avoid changing deployment workflow unless explicitly requested

## Commands
- `npm run dev`
- `npx tsc --noEmit`
- `npm run build`

## Commit style
- Use concise imperative commit messages
- Commit only files related to the requested change


# Marco Pisco Website

Personal website source for [marcopisco.com](https://marcopisco.com), built with TypeScript + Vite and deployed with GitHub Pages.

![GitHub last commit](https://img.shields.io/github/last-commit/marpisco/marpisco.github.io)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/marpisco/marpisco.github.io)
![GitHub language count](https://img.shields.io/github/languages/count/marpisco/marpisco.github.io)

## Tech Stack

- TypeScript
- Vite
- Vanilla HTML/CSS
- GitHub Actions + GitHub Pages
- Lanyard WebSocket API (Discord live presence)

## Features

- Single-page portfolio layout (hero, about, tech stack, experience, education, contact)
- Live Discord presence cards using Lanyard WebSocket
- Posts section backed by local Markdown files
- Smooth reveal and hover animations
- Responsive layout for desktop and mobile

## Local Development

```bash
npm install
npm run dev
```

Default dev URL: `http://localhost:5173`

## Build and Preview

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Posts Workflow

Posts are loaded from the `public/writeups` directory:

- `public/writeups/index.json` contains metadata for each post
- `public/writeups/<slug>.md` contains the Markdown content

Example `index.json` item:

```json
{
  "slug": "example-post",
  "title": "Example Post",
  "date": "2026-01-15",
  "summary": "Short summary.",
  "tags": ["tag1", "tag2"]
}
```

## Deployment

Deployment is fully automated by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml):

1. Trigger on push to `main`
2. Install dependencies with `npm ci`
3. Build with `npm run build`
4. Upload `dist/` artifact
5. Deploy to GitHub Pages

Custom domain is configured via `CNAME` (`marcopisco.com`).

## License

This project is licensed under the GNU General Public License v3.0. See [LICENSE](LICENSE).

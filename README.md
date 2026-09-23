# PortfoCLI

[English](README.md) · [Türkçe](README.tr.md)

A terminal-inspired portfolio for Uğur Dindar, built with Next.js App Router, React, TypeScript, and CSS Modules. Explore it through links or a command prompt; commands run only predefined portfolio actions, never shell code.

**Live site:** [ugurdindar.com](https://ugurdindar.com)

## Explore

- Browse in English, Turkish, or German. Section URLs are shareable, such as `/en?section=projects`.
- Open About, Experience, Skills, Projects, GitHub, Stats, Resume, and Contact from the navigation or command prompt. Try `/projects`, `whoami`, or `help`. A single leading `/` is optional. Use `Ctrl/⌘ K` to focus the prompt and ↑/↓ to revisit commands.
- Choose light, dark, system, aurora, ember, blueprint, or matrix in the theme studio or with `theme aurora`. Use `lang tr`, `lang en`, or `lang de` to switch languages. The theme preference persists locally.
- Inspect résumé-based experience, project examples, and linked certificates; download the original PDF résumé from the Resume section.
- See the public GitHub repository count, total stars, top three original repositories, full repository list, and contribution activity. GitHub data updates about hourly. If it cannot load, the panel offers a retry and a direct profile link instead of invented numbers.
- Discover `/melek` and `/tzesh` for optional visual scenes with locally hosted MP3s. Audio uses native playback controls and starts from a user action.

The interface supports keyboard navigation, reduced-motion preferences, and compact screens. Core section links, certificate links, and the PDF remain available without JavaScript.

## Run locally

Requires Node.js 22.18+ and npm. No GitHub token is needed.

```sh
npm ci
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). For production checks:

```sh
npm run typecheck
npm test
npm run build
```

Browser tests use the production build and start its server when needed:

```sh
npx playwright install chromium webkit
npm run test:e2e
```

## Update the portfolio

- `lib/profile.ts` holds identity and the canonical site URL; `public/resume.pdf` is the downloadable résumé.
- `lib/biography.ts`, `lib/showcase.ts`, and `lib/credentials.ts` hold résumé-based copy, examples, and certificate links. Update all three languages when facts change.
- `lib/i18n.ts` holds interface copy; `lib/commands.ts` defines allowed commands, aliases, locales, and themes.
- `components/Content.tsx` renders sections. `app/globals.css` and `components/Terminal.module.css` define themes and responsive layout.
- `components/GithubPanel.tsx`, `lib/github.ts`, and `app/api/github/route.ts` power the public GitHub view. Its fixed account is Tzesh; repository and star totals include forks, while the top-three ranking excludes them.

## Discovery and sharing

The site provides a favicon, [robots.txt](https://ugurdindar.com/robots.txt), and a Markdown [llms.txt](https://ugurdindar.com/llms.txt) that points to verified portfolio sources. The latter follows an optional discovery proposal; it does not guarantee search ranking or AI inclusion. Localized social preview cards are available at `/en/opengraph-image`, `/tr/opengraph-image`, and `/de/opengraph-image`.

## Deployment

The production target is [ugurdindar.com](https://ugurdindar.com). The deployment setup uses a standalone, multi-stage Docker image listening on `0.0.0.0:3000` inside the container. GitHub-hosted CI checks pull requests and the main branch; a self-hosted runner deploys main pushes or manual runs. The host port comes from the `PORT` secret, and deployment includes a health check and rollback on failure.

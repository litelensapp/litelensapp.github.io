# Contributing

Thanks for helping improve the Litelens landing page. This guide covers local setup, the tools this project uses, and how to submit changes.

## Prerequisites

- Node.js `26` (see `.nvmrc` / `engines.node` in `package.json`). If you use nvm: `nvm use`.
- npm (the repo commits `package-lock.json`, so use npm rather than yarn/pnpm).

## Getting started

```sh
npm ci
npm run dev
```

This starts the Vite dev server. Open the printed local URL in your browser.

## Project layout

See [CLAUDE.md](./CLAUDE.md) for an architecture overview and [DESIGN.md](./DESIGN.md) for design system conventions — read DESIGN.md before adding or changing any UI, as all components must be built on `@litelens/design-system`.

- `src/main.tsx` — entry point, mounts `src/App.tsx`.
- `src/App.tsx` — currently holds the full page.
- `src/components/` — where new UI should be broken out into as the page grows.

Components are typed arrow function expressions, not function declarations:

```tsx
const ComponentName: FC<PropsType> = (props) => { ... }
```

(Import `type { FC }` from `"react"`; omit the generic when there are no props. This applies to internal/non-exported helper components too.)

## Available scripts

| Command                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                       |
| `npm run build`        | Type-check (`tsc -b`) then build for production |
| `npm run lint`         | Run oxlint                                      |
| `npm run format`       | Format the codebase with Prettier               |
| `npm run format:check` | Check formatting without writing changes        |
| `npm run preview`      | Preview the production build locally            |

There is no test suite configured yet.

## Testing the production build

`npm run dev` runs unminified, unbundled dev builds — it won't catch bundling/asset-path issues. Before merging changes that touch build config, assets, or routing, verify the actual production output:

```sh
npm run build
npx serve dist/
```

Open the printed local URL and click through the page. (`npm run preview` also serves `dist/` via Vite's own preview server, but Vite's preview differs slightly from a plain static file server — prefer `serve dist/` when you specifically want to catch issues with how the static build will be served in production, e.g. via GitHub Pages.)

## Code style

- Linting: [oxlint](https://oxc.rs/docs/guide/usage/linter.html), configured in `.oxlintrc.json`.
- Formatting: [Prettier](https://prettier.io/) (with `prettier-plugin-tailwindcss` for class sorting), configured in `.prettierrc`.
- Husky + lint-staged run oxlint and Prettier on staged files automatically on commit (`.lintstagedrc.cjs`) — you shouldn't need to run them manually, but `npm run lint` / `npm run format` are available if you want to check ahead of time.
- Follow the existing conventions in a file you're editing (component style, import ordering, naming) rather than introducing a new pattern.

## Making changes

1. Create a branch off `master`.
2. Make your changes, following the conventions in `CLAUDE.md` and `DESIGN.md`.
3. Run `npm run build` and `npm run lint` to confirm the project type-checks and lints cleanly.
4. Commit — the pre-commit hook will lint/format staged files automatically.
5. Push your branch and open a pull request against `master`.

Merges to `master` automatically build and publish the site to GitHub Pages via the CD workflow (`.github/workflows/cd.yml`), so changes on `master` go live immediately — keep pull requests focused and verified before merging.

## Pull requests

- Keep PRs scoped to a single change; avoid bundling unrelated refactors.
- Describe what changed and why in the PR description.
- Make sure the build (`npm run build`) and lint (`npm run lint`) pass before requesting review.

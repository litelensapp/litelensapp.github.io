# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) then build for production
- `npm run lint` — run oxlint
- `npm run preview` — preview the production build locally

There is no test suite configured yet.

## Architecture

Minimal React 19 + TypeScript + Vite landing page for Litelens, styled with Tailwind CSS v4 (via `@tailwindcss/vite`, no `tailwind.config`/PostCSS setup needed).

- Entry point: `src/main.tsx` mounts `src/App.tsx` into `index.html`.
- `src/App.tsx` currently holds the entire page — the project has no routing or state management yet, so as it grows, expect new UI to be broken out into `src/components/`.
- Components are written as typed arrow function expressions, not function declarations: `const ComponentName: FC<PropsType> = (props) => { ... }` (import `type { FC }` from `"react"`; omit the generic when there are no props). Applies to every component, including internal/non-exported helper components within a file.
- All UI is built on `@litelens/design-system` — see **[DESIGN.md](./DESIGN.md)** for the required setup, import conventions, and styling rules before adding components.
- TypeScript project uses solution-style config: `tsconfig.json` references `tsconfig.app.json` (app source, `src/`) and `tsconfig.node.json` (Vite config). Target is ES2023 with strict unused-locals/params checks.
- oxlint is configured (`.oxlintrc.json`) with `react`, `typescript`, and `oxc` plugins for linting; Prettier (with `prettier-plugin-tailwindcss`) handles formatting.
- Husky + lint-staged run oxlint/Prettier on staged files pre-commit (config in `.lintstagedrc.cjs`).

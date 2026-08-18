# DESIGN.md

This file is the source of truth for design system usage in this project. It takes precedence over ad-hoc styling choices — read it before adding UI.

## Source of truth

All UI in this project is built on **`@litelens/design-system`** (currently `^1.6.3`). It is the only component library — do not add another UI kit (Radix, shadcn/ui, MUI, etc.) or hand-roll a primitive (button, dialog, dropdown, etc.) that the design system already provides. Reach for raw Tailwind utility classes only for one-off layout (flex/grid, spacing, positioning) that isn't a reusable primitive.

Repo: <https://github.com/litelensapp/litelens> (`design-system` directory).

## Setup (already wired up)

`src/styles.css` imports the design system's stylesheet once, which pulls in Tailwind's base layer, `tw-animate-css`, the shadcn theme, the Inter Variable (`--font-sans`) and Space Grotesk Variable (`--font-heading`) fonts, and all design tokens:

```css
@import "@litelens/design-system/styles.css";
```

Do not add a separate `@import "tailwindcss"` — the design system's stylesheet already includes it. Do not import the stylesheet more than once or from JS/TS.

## Import entrypoints

The package exports several subpaths — import from the most specific one that has what you need:

| Entrypoint                           | Contents                                                                                                                                                                                                                                                                                            |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@litelens/design-system`            | Everything (barrel of all entrypoints below)                                                                                                                                                                                                                                                        |
| `@litelens/design-system/atoms`      | Primitives: `Button`, `Input`, `Badge`, `Checkbox`, `Select`, `Dialog`, `Sheet`, `Drawer`, `DropdownMenu`, `ContextMenu`, `Tabs`, `Table`, `Tooltip`, `Switch`, `Slider`, `Separator`, `ScrollArea`, `Textarea`, `Toaster`, lucide-react icons                                                      |
| `@litelens/design-system/components` | Higher-level composites: `EmptyState`, `ConfirmationModal`, `FormModal`, `LoadingSpinner`, `Markdown`, `Divider`, `ButtonGroup`, `TruncatedText`, `DonutChart`, resource-oriented components (`ResourceCell`, `ResourceDetailDrawer`, etc. — app-specific, unlikely to be needed on a landing page) |
| `@litelens/design-system/hooks`      | `useCopyToClipboard`                                                                                                                                                                                                                                                                                |
| `@litelens/design-system/utils`      | `cn`, `clamp`, `formatRelativeTime`, `formatTs`                                                                                                                                                                                                                                                     |
| `@litelens/design-system/types`      | Shared TS types (`NavItem`, `NavGroup`, etc.)                                                                                                                                                                                                                                                       |
| `@litelens/design-system/libs`       | `FullTextSearchInput`, `useFullTextSearch`                                                                                                                                                                                                                                                          |

Prefer importing from `./atoms` or `./components` directly over the root barrel for clarity on where a component lives.

## Class name conventions

- Use `cn` from `@litelens/design-system/utils` (not raw template strings or `clsx` directly) whenever merging conditional or override class names — it wraps `clsx` + `tailwind-merge` so conflicting utilities resolve correctly.
- `.prettierrc.json` already runs `prettier-plugin-tailwindcss` with `tailwindFunctions: ["cn", "cva"]`, so classes passed to `cn(...)` or `cva(...)` are auto-sorted on save/commit — no manual class ordering needed.
- Component `variant`/`size` props (e.g. `Button`'s `variant="secondary" size="sm"`) should be preferred over overriding styles with extra utility classes.

## Buttons

- Always use `Button` from `@litelens/design-system/atoms` instead of a raw `<button>` — never hand-roll one, even for non-standard sizing (e.g. a compact icon-only trigger in a toolbar). `Button` renders Base UI's button directly, so passing `className` overrides works reliably with `cn`/`tailwind-merge` (e.g. `<Button variant="ghost" className="h-auto justify-start rounded-none px-3 py-3" .../>` to repurpose it as a vertical nav item).
- Known gotcha: `Button`'s `render` prop (e.g. `<Button render={<a href="..." />}>`) does not reliably merge `className` onto the rendered child in the current version (`^1.6.3`) — the link ends up unstyled. Until that's fixed upstream, style link-that-looks-like-a-button cases with a plain `<a>` and literal Tailwind utility classes copied from `buttonVariants` output, rather than `Button`/`buttonVariants`/`render`.

## Headings

- Use typography utilities instead of ad hoc `text-*`/`font-*` combinations — they preserve the semantic scale. The design system's `styles.typography.css` defines the app scale (`.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-body`, `.text-caption`, `.text-label`); this project's own `src/styles.css` extends it with a larger marketing scale for landing-page copy (`.text-hero`, `.text-lead`) — see that file's "Marketing Scale" comment before adding another one-off size.
- Match the HTML heading tag to the utility tier: page title → `<h1 className="text-hero">`, section title → `<h2 className="text-h2">`, subsection title → `<h3 className="text-h3">`, and so on. The design system currently only defines `text-h1`–`text-h3` (no `text-h4`+) — if a component needs a fourth nesting level, ask whether the content should be restructured before reaching for raw `text-sm font-semibold` as a workaround.
- Example (see `src/components/download/`): `Download`'s `<h1 className="text-hero">Installation</h1>` is the page-level title, `LinuxContent`'s `<h2 className="text-h2">Ubuntu</h2>` is a platform section, and its nested `<h3 className="text-h3">apt</h3>` / `<h3 className="text-h3">Manual</h3>` are subsections.

## Theming

- **Always use the design system's color palette for any color** — never hardcode hex/rgb values or use arbitrary Tailwind color utilities (e.g. `text-green-500`). Colors, radii, and spacing come from the design system's CSS variables (`@theme inline` tokens: `--color-*`, `--radius-*`, plus semantic tokens like `sidebar`, `chart`, `success`, `warning`, `destructive`). Use the corresponding Tailwind utilities (e.g. `bg-destructive`, `text-success`, `rounded-lg`) instead.
- Dark mode is driven by a `.dark` class on an ancestor element (`@custom-variant dark (&:is(.dark *))`); the package does not export a `ThemeProvider` — if/when dark mode is needed, toggle the class manually or bring in `next-themes` (already a transitive dependency) at the app level.

## Icons & feedback

- Icons: use the `lucide-react` icons re-exported from the atoms entrypoint (e.g. `import { RocketIcon } from "@litelens/design-system"`) rather than adding a new icon package.
- Toasts: use `toast` (from `sonner`, re-exported at the root) and render `<Toaster />` once near the app root.

## Upgrading

When a new design-system version is published (see its README's "Publishing" section — version bump → tag `design-system/vX.Y.Z` → CI builds and publishes), bump the version in this project's `package.json` and re-run `npm run build` to confirm nothing broke before committing.

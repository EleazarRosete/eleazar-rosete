# Eleazar Rosete — Portfolio

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Where to edit things

You should basically never need to touch anything under `src/components/` or
`src/sections/` for day-to-day updates. Everything you'll want to change
lives in `src/data/`:

| File | What it controls |
|---|---|
| `src/data/profile.ts` | Your name, role, tagline, stats, contact email, social links, project-type dropdown options |
| `src/data/skills.ts` | The skill highlight circles + their story slides, and certifications |
| `src/data/storyContent.ts` | Copy for the "About Me" avatar story (services, values, timing) |
| `src/data/projects.ts` | **Client Projects / Personal Projects / Products / Affiliated Projects** — this is the one you'll edit most |

### Adding a new project

Open `src/data/projects.ts`, find the array that matches the tab you want
(`CLIENT_PROJECTS`, `PERSONAL_PROJECTS`, `PRODUCT_ITEMS`, or
`AFFILIATED_ITEMS`), copy one of the existing objects, and fill in your own
`title`, `client`, `about`, `problem`, `solution`, `result`, etc. It shows up
automatically — no other file needs to change.

The `tag` field must match one of the keys in `TAG_ICON_MAP` (also in that
file) — add a new tag/icon pair there if you need a new category.

## Project structure

```
src/
  data/            ← content you edit (profile, skills, story, projects)
  theme/           ← color tokens (dark/light) + shared animation variants
  hooks/           ← reusable logic (story auto-play timer, scroll lock)
  components/      ← reusable pieces (modals, grid, story viewers)
  sections/
    HeroSection.tsx  ← composes everything above; holds shared UI state
  App.tsx          ← add future sections here, one import line each
```

## Notes

- Styling uses inline styles driven by CSS custom properties (`--bg-base`,
  `--text-primary`, etc.) defined per-theme in `src/theme/theme.ts`, rather
  than Tailwind utility classes — this matches how the original file was
  built. Tailwind is wired up and ready if you want to use it for new
  sections you add later.
- Project cover images are placeholder gradient tiles with an icon until you
  add real photos — see the `TODO` comments in `src/data/projects.ts`.

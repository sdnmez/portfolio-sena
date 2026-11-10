# Portfolio — Sena

A bilingual one-page portfolio for Sena Donmez, a software engineer and 2D/3D artist from Belgium. Built with Next.js, Tailwind CSS, Motion and React Three Fiber.

English is the default. The language switch stores the preference in a cookie and `localStorage`; the URL always stays `/`, and there is no `/nl` route.

The visual direction is an **INK** system: warm charcoal, paper and vermilion, with serif display type and hand-drawn accents.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS 4** via `@tailwindcss/turbopack`
- **Motion 14** for reveals, marquee and interactions
- **Three.js / React Three Fiber / drei** for the 3D lab
- **Lenis** for smooth scrolling
- **Lucide** for icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build
npm start          # run the production build
```

Node `>=20.9` is required; `.nvmrc` pins Node 24.

## Structure

```
app/
  (en)/                 # root layout + page at /
  globals.css           # INK tokens, grain, print/blueprint utilities
components/
  site/                 # header, hero, experience, art gallery, lab, path, about, contact, footer
  motion/               # reveals, marquee, tilt, scroll-ink titles, scroll progress
  three/                # lazy-loaded WebGL lab viewer
  ui/                   # cursor, smooth scroll, language switch, copy email
data/                   # artworks, path, model studies and site details
messages/               # typed EN/NL copy
lib/                    # i18n, metadata, fonts, helpers
types/                  # shared TypeScript types
public/art/             # artwork images and the drop-zone notes
public/portrait/        # replace sena.jpg with the About portrait
public/models/          # drop zone for exported .glb/.gltf files
```

## Design direction

The site uses a single INK direction: warm charcoal, aged paper and vermilion, with Instrument Serif display type, Alex Brush for the handwritten signature, mono labels and Caveat annotations. The 3D lab adds a paper-blueprint grid without changing the palette.

## Content

The site uses Sena's real details:

- `data/site.ts` — name, role, email, Instagram, LinkedIn, canonical URL and copyright year
- `data/path.ts` — education, the current Volvo Group role and the planned 3D chapter
- `data/artworks.ts` — the 2D gallery entries and their bilingual titles/descriptions
- `data/models.ts` — one planned 3D study for the 2027 lab
- `messages/en.ts` / `messages/nl.ts` — all interface copy

The hero uses a typographic index card. The About portrait is loaded from `public/portrait/sena.jpg`; replace that file with a 4:5 portrait (around 960 × 1200 px, JPG or WebP, under ~500 KB) and it appears automatically. The image uses a small `?v=2` cache-buster; if a replaced file still shows the old version, bump that number in `components/site/About.tsx`. See `public/portrait/README.md` for details.

The gallery is populated from `data/artworks.ts`; add new files to `public/art/` and register them there with `title`, `year`, `medium`, `category`, `description`, `image`, `width` and `height`. If the array is emptied again, the paper empty state returns automatically.

The path includes secondary school, Applied Computer Science at Hogeschool Gent (2022–2025), the current Volvo Group role (since September 2025) and the planned 3D chapter.

The 3D lab is a procedural preview, clearly labelled as such. Real models can replace it from 2027.

## Interaction and accessibility

- The gallery supports category filters, a native `<dialog>` lightbox, keyboard navigation with `←` / `→`, `Esc` to close and touch swipe navigation.
- The mobile path timeline uses accessible tabs; desktop shows both tracks.
- The mobile menu closes on Escape, traps focus, returns focus to the trigger and locks page scroll.
- Core copy is server-rendered. The language switch updates a cookie and refreshes the server content without changing the URL. The filters, lightbox, mobile menu, timeline tabs and 3D scene are progressive enhancements that need JavaScript.
- Reduced-motion users get static lab fallbacks, no smooth-scroll hijacking and no custom cursor.
- The skip link, focus-visible outlines, labelled sections and localized `<html lang>` values are in place.

## Internationalization

English is the default. There are no language-prefixed routes:

- `/` is the only page URL.
- The `EN / NL` switch writes `sena-locale` to a cookie and `localStorage`, then calls `router.refresh()`.
- The server reads the cookie and renders the matching dictionary; the URL stays `/`.
- `/nl` is not a route (404).

Copy is typed: `messages/nl.ts` must satisfy the shape of `messages/en.ts`, so a missing translation is a type error. Metadata stays English by default because the canonical URL is shared.

## 3D pipeline

The lab currently shows one procedural preview: an icosahedron wireframe. It is lazy-loaded and the viewer mounts when it scrolls into view. Mobile and reduced-motion visitors get CSS/ring fallbacks.

There is no `.glb` loader yet — the lab data maps to a procedural `shape` value. To swap in real Blender models from 2027:

1. Export as glTF 2.0 / `.glb` (+Y up, modifiers applied, animations via NLA strips).
2. Optimise it:
   ```bash
   npx @gltf-transform/cli optimize input.glb public/models/study-01.glb --compress draco
   ```
3. Add a `modelUrl` field to `data/models.ts`, then load it in `components/three/LabViewer.tsx` with `useGLTF`. Keep a fallback for the loading state and reduced motion.

Keep models small (target < 2 MB) and provide a poster/fallback.

## Deployment

The project is ready for Vercel:

1. Push this repository to GitHub.
2. Import `portfolio-sena` in Vercel (private repositories are supported on the free plan).
3. Set `NEXT_PUBLIC_SITE_URL` to the final domain (see `.env.example`).
4. Deploy. Every push to `main` triggers a production deployment.

The GitHub Actions workflow in `.github/workflows/ci.yml` runs lint, typecheck and build on every push and pull request.

## Making the repository public

The repository starts private. When you are ready:

```bash
gh repo edit portfolio-sena --visibility public --accept-visibility-change-consequences
```

Everything in the git history becomes public, so never commit secrets. `.env*` is ignored; only `.env.example` is tracked.

# Ionforge Test Labs — Burn-In & ATE Website

A full Next.js site for a semiconductor **burn-in / ATE (Automated Test Equipment) /
OSAT** business. Runs entirely on mock data out of the box — no accounts or API keys
needed to demo it locally.

## Stack

| Layer      | Choice                          |
|------------|----------------------------------|
| Framework  | Next.js 16 (App Router, React 19) |
| Styling    | Tailwind CSS v4                  |
| Charts     | Recharts                         |
| Icons      | lucide-react                     |
| Database   | Supabase (Postgres) — optional, free tier |
| Hosting    | Vercel — free Hobby tier         |

Everything below the "optional" line only matters once you want real, persisted data
instead of the built-in mock data in `src/lib/data.ts`.

## Pages

- `/` — Home: hero, chamber status, test method overview, package support preview
- `/capabilities` — Burn-in capacity & stress matrices, standards compliance
- `/sockets` — Interactive package/socket selector (BGA, QFN, LGA, Wafer-Scale CSP, SOIC, DFN)
- `/parts` — Parametric search table for parts currently under test
- `/dashboard` — Live telemetry demo (simulated temp/voltage/leakage stream + reliability bathtub curve)
- `/contact` — Quote request form

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy for free (Vercel)

1. Push this project to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to https://vercel.com → **Add New Project** → import the GitHub repo.
3. Vercel auto-detects Next.js — click **Deploy**. No configuration needed.
4. You get a free `your-project.vercel.app` URL immediately, and every future
   `git push` to `main` auto-deploys.

## Connecting real data (optional — Supabase, free tier)

The site works fully without this step. When you're ready to replace mock data:

1. Create a free project at https://supabase.com
2. In the SQL editor, create tables matching the shapes in `src/lib/data.ts`
   (`parts`, `ovens`) — the field names line up 1:1 so the swap is mechanical.
3. Copy `.env.example` to `.env.local` and fill in the two values from
   **Project Settings → API**.
4. In Vercel, add the same two env vars under **Project Settings → Environment
   Variables** so production reads from Supabase too.
5. Replace calls like `parts` (imported from `src/lib/data.ts`) with
   `await supabase.from('parts').select('*')` in the relevant page — `src/lib/supabase.ts`
   already exports a ready-to-use client that's `null`-safe if env vars are missing.

## Project structure

```
src/
  app/
    page.tsx              Home
    capabilities/page.tsx
    sockets/page.tsx
    parts/page.tsx
    dashboard/page.tsx
    contact/page.tsx
    layout.tsx             Fonts, nav, footer
    globals.css             Design tokens (colors, spacing helpers)
  components/
    nav.tsx
    footer.tsx
    ui.tsx                  SectionHead, StatCard, Badge, StatusPill
  lib/
    data.ts                 Mock parts/ovens/telemetry — swap for Supabase queries
    supabase.ts              Supabase client (null-safe without env vars)
```

## Notes

- All data (parts, ovens, telemetry, reliability curve) is generated in
  `src/lib/data.ts`. It's realistic but fabricated — replace company name,
  certifications, and contact details with your real ones before using this
  for anything but a demo.
- The dashboard's "live" telemetry updates via `setInterval` on the client —
  it's a simulation, not a real data feed. Wire it to Supabase Realtime or a
  WebSocket once you have an actual ATE data source.

# Neti-Hatthaya Handoff

This file is for another local model or developer continuing the project on a different machine.

## Repository

- GitHub: https://github.com/netihatthaya11-bit/Neti-Hatthaya.git
- Main branch: `main`
- Current project folder on this machine: `C:\Users\Pong\Documents\GitHub\neti`

## Project Summary

- App name/package: `neti`
- Framework: Next.js `16.1.6`
- React: `19.2.3`
- Router: App Router under `src/app`
- Main rendering style: client-side components with localStorage state
- Backend/API routes: none found
- Dynamic route: `src/app/lessons/[id]/page.tsx`
- Static params: `generateStaticParams()` exists for lesson pages 1-4
- Data source: mostly local files and browser `localStorage`
- Optional external service: Supabase for link settings
- Media/services: YouTube embeds and public image assets

## Important Files

- `package.json`: scripts and dependencies
- `next.config.ts`: static export config
- `firebase.json`: Firebase Hosting config
- `.firebaserc`: Firebase project alias
- `src/app/page.tsx`: home page
- `src/app/lessons/[id]/page.tsx`: lesson route
- `src/data/lessonsData.ts`: lesson content/data
- `src/contexts/AuthContext.tsx`: localStorage auth/progress state
- `src/contexts/LinkSettingsContext.tsx`: optional Supabase-backed form links
- `src/lib/supabase.ts`: optional Supabase client setup

## Setup On Another Machine

```bash
git clone https://github.com/netihatthaya11-bit/Neti-Hatthaya.git
cd Neti-Hatthaya
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Production build and static export to out/
npm run start    # Next production server, usually not needed for static hosting
npm run lint     # Run ESLint
```

## Static Export And Firebase Hosting

The project is configured for static export so it can run on Firebase Hosting without Cloud Functions.

`next.config.ts`:

```ts
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

`firebase.json` points Hosting to:

```text
out/
```

Deploy commands:

```bash
npm run build
firebase login
firebase deploy --only hosting
```

If the Firebase project id is not `neti`, update `.firebaserc` or run:

```bash
firebase use --add
```

## Environment Variables

Supabase is optional. The app falls back safely if these are missing:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

If Supabase-backed link settings are required, create `.env.local` on the local machine and set both values before running/building.

Do not commit `.env.local`; `.env*` is ignored by Git.

## Generated Files Not Committed

These are intentionally ignored and should be recreated locally:

- `node_modules/` from `npm install`
- `.next/` from Next build/dev
- `out/` from `npm run build`
- `.firebase/` from Firebase deploy/cache

## Verification Already Done

The project was built successfully after enabling static export.

Expected build result:

- `/`
- `/admin/links`
- `/login`
- `/register`
- `/profile`
- `/pretest`
- `/posttest`
- `/lessons/1`
- `/lessons/2`
- `/lessons/3`
- `/lessons/4`

## Notes For The Next Model

1. Start with `git status --short --branch`.
2. Run `npm install` if `node_modules/` is missing.
3. Use `npm run build` as the main safety check.
4. Do not commit generated folders: `node_modules`, `.next`, `out`, `.firebase`.
5. For Firebase deployment, confirm the correct Firebase project id before deploying.
6. If GitHub auth fails, check the active GitHub account and remote URL.

## Current Git Remote

```text
origin https://netihatthaya11-bit@github.com/netihatthaya11-bit/Neti-Hatthaya.git
```

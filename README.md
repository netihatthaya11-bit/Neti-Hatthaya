# Neti-Hatthaya

E-Learning web app built with Next.js 16 App Router.

This repository is ready to clone on another machine and continue development.
For the full continuation notes, see [HANDOFF.md](./HANDOFF.md).

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
```

The project is configured for static export and Firebase Hosting. Build output is generated in `out/`.

## Firebase Hosting

The app is configured for static Firebase Hosting:

- `next.config.ts` uses `output: "export"`.
- `firebase.json` serves the generated `out/` folder.
- `.firebaserc` currently points to Firebase project id `neti`.

Deploy flow:

```bash
npm run build
firebase login
firebase deploy --only hosting
```

# PULSE

PULSE is a premium prototype for a community-driven streetwear platform where creators submit concepts, the community votes, and the best work becomes future drops.

## Open The Prototype

Open `index.html` in a browser, or serve this folder with any static server.

The prototype includes:

- Cinematic home page
- Pinterest-style community grid
- Immersive design detail pages
- Creator profiles
- Submit design workflow with live preview
- Drops, shop, admin, analytics, search, filters and recommendation UI

## Production Stack Scaffold

This folder also includes a Next.js-oriented scaffold:

- `package.json` with Next.js, React, TailwindCSS, Framer Motion, Clerk, Cloudinary and Postgres dependencies
- `app/` routes and API examples
- `src/lib/db/schema.sql` PostgreSQL schema
- `.env.example` for Clerk, Cloudinary and database variables

The current machine does not expose npm in PATH, so the local preview is intentionally no-install. On a normal Node/npm setup, run:

```bash
npm install
npm run dev
```

## Clerk Auth

Create a Clerk application, copy `.env.example` to `.env.local`, and fill:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Auth routes included:

- `/sign-in`
- `/sign-up`
- `/account`
- `/profile`
- `/saved`
- `/liked`
- `/creator-dashboard`
- `/waitlist`
- `/onboarding`
- `/notifications`
- `/leaderboard`

Alpha launch systems included:

- Invite-only waitlist API at `/api/waitlist`
- PostgreSQL tables for waitlist entries, invite codes, notifications and moderation events
- Creator leaderboard, category rails, moderation queue and drop countdown surfaces

## Product Direction

PULSE is designed to feel less like a Shopify storefront and more like a luxury creative network for future streetwear: dark, editorial, fast, immersive, creator-first.

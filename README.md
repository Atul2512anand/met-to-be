# Met To Be — Website

Production marketing site for **Met To Be**, a verified, offline-first marriage-intent relationship platform.

> Too modern for matrimony. Too intentional for dating.
> **MEET. CONNECT. CHOOSE.**

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (custom warm/ivory/clay design system)
- Framer Motion (scroll-reveal animations)
- Lucide icons
- Serverless API route (`/api/waitlist`) for invite requests
- SEO: per-page metadata, Open Graph image, `sitemap.xml`, `robots.txt`, SVG favicon

## Pages

| Route         | Purpose                                          |
| ------------- | ------------------------------------------------ |
| `/`           | Hero, positioning, philosophy, journey & events preview |
| `/journey`    | Check → Connect → Choose in detail + family layer |
| `/events`     | Event formats + how an event works               |
| `/trust`      | Verification, safety tools, honest-risk note     |
| `/membership` | Pricing tiers + FAQ                              |
| `/quiz`       | 60-second meeting-style quiz → funnels to application |
| `/journal`    | Editorial essays (dynamic routes per post)       |
| `/join`       | Founding 100 application flow                    |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deploying to Vercel

1. Push this folder to a GitHub repo (the app lives in the `met-to-be/` subfolder).
2. In [Vercel](https://vercel.com/new), import the repo and set **Root Directory** to `met-to-be`.
3. Framework preset auto-detects Next.js — no env vars required.
4. After your first deploy, update `site.url` in `src/lib/site.ts` to your final domain so metadata/sitemap URLs are correct.

## Hooking up real waitlist storage

The waitlist API (`src/app/api/waitlist/route.ts`) currently validates and logs submissions. To persist them, plug one of these into the handler:

- **Resend / Mailgun** — email each signup
- **Airtable / Google Sheets API** — append rows
- **Neon / Supabase Postgres** — insert into a table

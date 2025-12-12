This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Local shortcuts and notes

Quick commands:

```bash
# install
yarn install

# dev
yarn dev

# build
yarn build

# start
yarn start

# lint
yarn lint

# typecheck
yarn typecheck
```

Recent local changes made by tooling:

- Added a global `Footer` component and wired it into `src/app/layout.tsx`.
- Exported configs in `next.config.ts` and `eslint.config.mjs` so Next and ESLint can load them.
- Added `typecheck` and improved `lint` scripts in `package.json`.

Notes: The project uses Next 16 + React 19; keep an eye on compatibility when adding plugins.

## Database: Drizzle ORM (optional)

To use Drizzle ORM with Postgres in this project:

1. Install packages:

```bash
# with yarn
yarn add pg drizzle-orm
# and types for dev + ts-node runner
yarn add -D @types/pg ts-node-esm
```

2. Add your connection string to `.env.local` (already added):

```env
DIRECT_URL="postgresql://..."
```

3. Use the included runtime helper at `src/db/drizzle-client.ts` to get a Drizzle instance in server code:

```ts
import { getDrizzle } from "@/db/drizzle-client";

export async function handler() {
  const db = await getDrizzle();
  // use db for queries
}
```

Note: I added `src/db/drizzle-client.ts` which dynamically imports `pg` and `drizzle-orm/node-postgres` at runtime to avoid build-time resolution issues in Next.

### Initialize the database

Migrations are located at `src/db/migrations/`. After installing dependencies, run:

```bash
# ensure deps
yarn install

# run migration
yarn db:init
```

The script will look for `src/db/migrations/001_init.sql` (and falls back to `migrations/001_init.sql` for backward compatibility).

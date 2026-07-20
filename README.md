# TFL Board

A React app that recreates London Underground departure boards with live data from the public TfL API.

## Stack

- TanStack Start with TanStack Router file-based routing
- React 19 and TanStack Query
- Vite 8, Tailwind CSS 4, and TypeScript
- Cloudflare Workers through the official Cloudflare Vite plugin
- Base UI and shadcn components
- pnpm

## Local setup

```sh
pnpm install
pnpm dev
```

The generated station snapshot is committed so a fresh checkout can start immediately. Refresh it when needed:

```sh
pnpm generate:tube-stations
```

This command and `pnpm build` call the public TfL API and therefore require network access. The running application also uses the public TfL API for live arrivals. No environment variables or API keys are currently required.

## Validation

```sh
pnpm typecheck
pnpm test
pnpm build
```

There are no test files yet, so the isolated Vitest config currently passes with no tests while remaining ready for future coverage.

## Cloudflare Workers

```sh
pnpm build
pnpm preview
```

The Worker is configured in `wrangler.jsonc` with the `nodejs_compat` compatibility flag and TanStack Start's server entry. No application environment variables or API keys are required.

Before the first deployment, authenticate Wrangler and confirm the active account:

```sh
pnpm exec wrangler login
pnpm exec wrangler whoami
```

Generate Cloudflare binding types after changing `wrangler.jsonc` bindings:

```sh
pnpm cf-typegen
```

Deploy with:

```sh
pnpm deploy
```

`pnpm deploy` runs the production build before publishing. If secrets or bindings are added later, configure them through Wrangler/Cloudflare and access Worker bindings per request; do not assume module-scope `process.env` is populated in Workers.

## URL state

Station, direction, line, board style, and row settings live in TanStack Router search parameters. Defaults are omitted from the URL. Existing links that encode `lines` as a comma-separated string remain supported; new navigation uses TanStack Router's JSON-first array serialization.

# TFL Board

A React app that recreates London Underground departure boards with live data from the public TfL API.

## Stack

- TanStack Start with TanStack Router file-based routing
- React 19 and TanStack Query
- Vite 8, Tailwind CSS 4, and TypeScript
- Nitro's provider-agnostic Node deployment adapter
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

## Production

```sh
pnpm build
pnpm start
```

The default TanStack CLI Nitro adapter emits a Node server at `.output/server/index.mjs`. Configure a host such as Vercel or Railway to run `pnpm build`; Nitro selects the deployment behavior for the host environment. Confirm the provider detects the Nitro output before switching production traffic from the previous Next.js deployment.

## URL state

Station, direction, line, board style, and row settings live in TanStack Router search parameters. Defaults are omitted from the URL. Existing links that encode `lines` as a comma-separated string remain supported; new navigation uses TanStack Router's JSON-first array serialization.

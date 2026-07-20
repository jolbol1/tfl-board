<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `bunx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `bunx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# TFL Board project context

## Scaffold provenance

The TanStack Start baseline was generated separately at `/private/tmp/my-tanstack-app` and merged into this repository. The exact command was:

```sh
npx @tanstack/cli@latest create my-tanstack-app --agent --package-manager pnpm --tailwind
```

Interactive selections were React, the CLI default `None` toolchain, the default Nitro (agnostic) deployment adapter, no demo/example pages (blank starter), no add-ons, and no nested Git repository. The CLI warned that `--tailwind` is deprecated because Tailwind is always included in TanStack Start scaffolds.

TanStack Intent was then installed and enumerated with the exact requested commands:

```sh
npx @tanstack/intent@latest install
npx @tanstack/intent@latest list
```

After the TanStack dependencies were present, `list` was rerun and these package-shipped skills were loaded before source migration:

```sh
pnpm dlx @tanstack/intent@latest load '@tanstack/react-start#lifecycle/migrate-from-nextjs'
pnpm dlx @tanstack/intent@latest load '@tanstack/react-start#react-start'
pnpm dlx @tanstack/intent@latest load '@tanstack/start-client-core#start-core'
pnpm dlx @tanstack/intent@latest load '@tanstack/router-core#router-core/search-params'
pnpm dlx @tanstack/intent@latest load '@tanstack/router-core#router-core/navigation'
pnpm dlx @tanstack/intent@latest load '@tanstack/start-client-core#start-core/deployment'
pnpm dlx @tanstack/intent@latest load '@tanstack/router-plugin#router-plugin'
```

## Chosen stack and integrations

- React 19 on TanStack Start with `src/routes` file routing and a generated `src/routeTree.gen.ts`.
- The CLI's default Vite toolchain (no Biome or ESLint selection), TypeScript, pnpm, and Tailwind CSS 4 via `@tailwindcss/vite`.
- The CLI's Nitro agnostic deployment adapter.
- TanStack Query is retained and integrated through `@tanstack/react-router-ssr-query` in `src/router.tsx`.
- Existing Base UI, shadcn, TfL board components, local fonts, public assets, and TfL API behavior are retained.

## Architecture decisions

- Preserve the CLI's `src/router.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/styles.css`, Vite config, Router config, and pnpm workspace layout.
- Keep established `components`, `lib`, `data`, and `assets` directories at the repository root. The `@/*` alias continues to target the root to avoid a noisy component move; `#/*` targets generated/new `src` code as scaffolded.
- Replace Next.js metadata, fonts, image, link, navigation, and `nuqs` APIs with TanStack route head metadata, CSS font faces, native semantic elements, `useNavigate`, and route `validateSearch`.
- Search validation accepts legacy comma-separated line lists while new navigations use TanStack Router's structured arrays. Default search values are stripped from URLs.
- Create one QueryClient per router instance and attach it with the router SSR Query integration.
- Render the live clock from a deterministic placeholder before its client timer starts to prevent SSR hydration mismatches.
- Commit the generated `data/tube-stations.json` snapshot so fresh checkouts can run without a setup-time fetch; `prebuild` refreshes it.
- Keep Vitest on its isolated `vitest.config.ts`; loading the full Nitro Vite config under Vitest currently fails during environment startup.

## Environment and setup

- No environment variables or secrets are required.
- `pnpm install` installs dependencies, `pnpm dev` runs Vite on port 3000, and `pnpm generate:tube-stations` refreshes station data.
- Station generation, production builds, and live arrivals require outbound access to `https://api.tfl.gov.uk`.

## Deployment

- `pnpm build` creates the Nitro server bundle; `pnpm start` runs `.output/server/index.mjs`.
- The adapter is provider-agnostic. For Vercel/Railway, use `pnpm build` and verify the host recognizes Nitro output and runtime settings before promoting the migration.
- Generated `.output` and `.nitro` directories are ignored.

## Known gotchas

- The scaffold's initial install reported an ignored `esbuild` build script under pnpm 11 because its generated `package.json#pnpm.onlyBuiltDependencies` setting is no longer read. `pnpm-workspace.yaml` now explicitly allows `esbuild` and `lightningcss`; the obsolete package field was removed.
- The CLI emitted a `nitro({ rollupConfig: ... })` option that is not accepted by the installed Nitro plugin types. The merged config uses the shipped deployment guidance's compatible `nitro()` form.
- Nitro nightly currently emits non-fatal Rolldown diagnostics during a successful build. Recheck them when upgrading Nitro/Vite.
- Vitest must not inherit the Nitro plugin until the upstream Nitro/Vite test-environment startup incompatibility is resolved.
- The app depends on live TfL availability; network failures surface through TanStack Query.

## Next steps

- Add route/component tests with the scaffolded Vitest and Testing Library dependencies.
- Verify the Nitro build on the production hosting provider and update any platform-specific settings.
- Re-run TanStack Intent `list` and load relevant skills before future TanStack architecture changes.
- Review and pin dependencies currently declared as `latest` when the migration has settled.

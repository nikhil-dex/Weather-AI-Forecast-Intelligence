# Weather AI prototype

A Next.js, TypeScript and Tailwind skeleton for an explainable weather forecasting dashboard. All displayed values are hardcoded historical / simulated demonstration data; this is not a live forecast or weather-warning system.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Routes: `/`, `/forecast`, `/evaluation`, and `/data-model`.

## Structure

- `app/`: routes, root layout, global styles
- `components/`: shared layout, dashboard visualizations, reusable UI primitives
- `data/`: mock forecast, history, evaluation, failures, and metadata
- `types/`: forecast, evaluation, and dataset contracts
- `lib/`: formatting, constants, class utilities

Charts are built with Recharts. Tailwind and shadcn/ui configuration are included; shadcn components can be added with the CLI as needed.

# Claude Code 101 — Developer Portal

A Next.js reference portal for the 60-minute session
**“Claude Code: From Natural Language to Production-Ready Software”**.

## What's inside

| Route | Content |
| --- | --- |
| `/` | Overview, 60-minute agenda timeline, module grid with progress tracking |
| `/modules/[slug]` | 10 session modules + 1 bonus: objectives, concepts, commands, copy-paste prompts, diagrams, takeaways, quiz |
| `/labs` | 7 hands-on labs on the TaskFlow practice repo (downloadable) |
| `/prompts` | 40 filterable prompts by stage of the dev loop |
| `/cheatsheet` | CLI flags, slash commands, shortcuts, MCP, config files |
| `/reference` | FAQ, glossary, official resources |

Also includes ⌘K / `/` search, a light/dark theme toggle, and per-browser progress (localStorage).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # also re-zips demo-app/ into public/downloads/
npm start
```

## Editing content

All content is data in `src/content/` and is rendered by `src/components/Blocks.tsx`:

- `modules-1.ts`, `modules-2.ts`, `modules-3.ts`: modules made of typed blocks (`p`, `code`, `prompt`, `callout`, `table`, `flow`, `compare`, `steps`, `cards`)
- `labs.ts`, `prompts.ts`, `reference.ts`: labs, prompt library, cheat sheet / glossary / FAQ

## Practice repo

`demo-app/taskflow-api` is a zero-dependency Node 20+ API with **deliberate bugs**:
2 failing tests (pagination, overdue filter) plus auth weaknesses (forgeable tokens, no expiry,
unsalted hashing, user enumeration, IDOR in `completeTask`). Don't fix it in this repo; it's the exercise.
`npm run zip-demo` packages it for download.

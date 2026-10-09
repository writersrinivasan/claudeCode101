import type { Module } from "./types";

export const modulesPart2: Module[] = [
  // ───────────────────────────────────────────── 4
  {
    slug: "claude-md",
    number: 4,
    title: "CLAUDE.md — Give Claude Code a Memory for Your Project",
    tagline: "Persistent, project-level context that turns a smart stranger into a teammate.",
    time: "30–35 min",
    minutes: 5,
    mode: "Demo",
    icon: "🧠",
    objectives: [
      "Explain what CLAUDE.md is and when it is loaded",
      "Know the memory hierarchy: enterprise, user, project, local, subdirectory",
      "Write a concise, high-signal CLAUDE.md for a real project",
      "Bootstrap one with /init and maintain it over time",
    ],
    sections: [
      {
        id: "what",
        title: "What is CLAUDE.md?",
        blocks: [
          {
            type: "p",
            text: "`CLAUDE.md` is a plain Markdown file that Claude Code **automatically loads into context at the start of every session**. It is how you tell the agent the things a new teammate would learn in their first week: how to build, how to test, what the architecture is, what the house rules are.",
          },
          {
            type: "p",
            text: "Without it, Claude rediscovers your project from scratch every session and has to guess your conventions. With it, Claude starts every session already knowing to run `pnpm test` instead of `npm test`, to put business logic in services, and never to touch `config/production.yml`.",
          },
        ],
      },
      {
        id: "hierarchy",
        title: "Where memory files live",
        blocks: [
          {
            type: "table",
            headers: ["Level", "Location", "Shared with", "Use for"],
            rows: [
              ["Enterprise policy", "OS-specific managed path (set by IT)", "Whole organisation", "Company-wide security and compliance rules"],
              ["User", "`~/.claude/CLAUDE.md`", "Just you, all projects", "Personal preferences (“I prefer early returns”, editor, tone)"],
              ["Project", "`./CLAUDE.md` or `./.claude/CLAUDE.md`", "Your team (commit it)", "Architecture, commands, conventions, rules"],
              ["Project local", "`./CLAUDE.local.md` (git-ignored)", "Just you, this project", "Your sandbox URLs, local test data, personal shortcuts"],
              ["Subdirectory", "`./packages/api/CLAUDE.md`", "Team", "Loaded when Claude works in that folder — great for monorepos"],
            ],
          },
          {
            type: "p",
            text: "Files are combined, with more specific files taking precedence. Claude Code also walks **up** from your working directory loading any CLAUDE.md it finds, so a monorepo root file plus package-level files works naturally.",
          },
          {
            type: "code",
            lang: "markdown",
            title: "Imports keep CLAUDE.md short",
            code: "# Project memory\n\nSee @README.md for an overview and @package.json for scripts.\n\n## Conventions\n- API style guide: @docs/api-conventions.md\n- Git workflow: @docs/git-workflow.md\n\n## Personal (not committed)\n- @~/.claude/my-project-notes.md",
          },
        ],
      },
      {
        id: "contents",
        title: "What should go in it?",
        blocks: [
          {
            type: "cards",
            items: [
              { icon: "🏗️", title: "Architecture", body: "Layers, key modules, data flow, where things belong." },
              { icon: "📐", title: "Coding conventions", body: "Naming, error handling, async style, import order — only the non-obvious ones." },
              { icon: "📁", title: "Project structure", body: "Short map of important directories." },
              { icon: "🧪", title: "Testing commands", body: "How to run all tests, one file, one test. Which framework." },
              { icon: "⚙️", title: "Build commands", body: "Build, lint, type-check, dev server, migrations." },
              { icon: "📏", title: "Development rules", body: "“Write a test for every bug fix.” “No new deps without asking.”" },
              { icon: "🔐", title: "Security requirements", body: "Secrets handling, auth rules, PII, input validation expectations." },
              { icon: "⛔", title: "Important constraints", body: "Files never to edit, APIs that must stay backward-compatible." },
              { icon: "📦", title: "Preferred libraries", body: "Use zod not joi; date-fns not moment; our http client wrapper." },
              { icon: "🌿", title: "Git conventions", body: "Branch naming, commit format, PR template, never push to main." },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            title: "Keep it short and specific",
            text: "CLAUDE.md is loaded into **every** session, so every line costs context and attention. Aim for tens of lines, not hundreds. Prefer “Run `npm test -- path/to/file` for a single file” over “Testing is important.” Delete anything Claude would do correctly anyway.",
          },
        ],
      },
      {
        id: "example",
        title: "Examples",
        blocks: [
          {
            type: "code",
            lang: "markdown",
            title: "The session example (Python/FastAPI)",
            code: "# Project Instructions\n\n- Use Python 3.12\n- Use FastAPI\n- Use PostgreSQL\n- Follow repository service-layer architecture\n- Write tests for new APIs\n- Never modify production configuration\n- Run pytest before completing a task",
          },
          {
            type: "code",
            lang: "markdown",
            title: "A realistic CLAUDE.md for the TaskFlow demo repo",
            code: "# TaskFlow API\n\nZero-dependency Node.js (>=20, ESM) REST API. In-memory store, no database.\n\n## Commands\n- `npm test` — run all tests (node:test). Must pass before you finish a task.\n- `node --test test/tasks.test.js` — run one file\n- `npm start` — dev server on :3001 (seed user ada@example.com / password123)\n\n## Architecture\n- `src/app.js` parses JSON, routes, maps `err.status` to HTTP responses\n- `src/routes/*` are THIN: authenticate, call a service, return `{ status, json }`\n- `src/services/*` hold all business logic; throw errors with a `.status` property\n- `src/db.js` is the only module that touches the data arrays\n\n## Rules\n- Do NOT add npm dependencies. Use Node built-ins (node:crypto, node:test).\n- Never return `passwordHash` — always pass users through `publicUser()`\n- Every new endpoint needs tests using `startTestServer()` from test-utils/server.js\n- Every bug fix starts with a failing test that reproduces it\n- Validation helpers live in `src/utils/validate.js`\n\n## Git\n- Conventional commits: feat:, fix:, test:, refactor:, docs:\n- Never commit directly to main; never force-push",
          },
        ],
      },
      {
        id: "workflow",
        title: "Creating and maintaining CLAUDE.md",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Bootstrap with /init",
                body: "Run `/init` in a new project. Claude analyses the repo and writes a starter CLAUDE.md. Treat it as a first draft.",
                code: "/init",
              },
              {
                title: "Edit ruthlessly",
                body: "Remove generic advice, add the rules that only your team knows. Use `/memory` to open the files in your editor.",
                code: "/memory",
              },
              {
                title: "Update it when Claude gets something wrong",
                body: "Whenever you correct Claude twice about the same thing, that correction belongs in CLAUDE.md. Just ask Claude to add it.",
                prompt: "Add a rule to CLAUDE.md: integration tests must use startTestServer(), never call services directly.",
              },
              {
                title: "Review it in PRs",
                body: "Commit CLAUDE.md and review changes to it like code. It is executable documentation for your team's agents.",
              },
            ],
          },
          {
            type: "callout",
            variant: "pro",
            title: "Emphasis works",
            text: "If Claude keeps ignoring a rule, make it stand out: “**IMPORTANT:** never edit files under `migrations/`.” Use it sparingly — if everything is important, nothing is.",
          },
        ],
      },
      {
        id: "demo",
        title: "Demo: see the difference",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Without a CLAUDE.md, ask: “Add a DELETE /tasks/:id endpoint.” Note what it guesses (test style? errors? dependencies?).",
              "`/clear`, then create the CLAUDE.md above (or run `/init` and edit).",
              "Ask the same thing again: “Implement this feature following the project instructions.”",
              "Compare: did it write a failing test first, keep the route thin, avoid new deps, check ownership?",
            ],
          },
          {
            type: "prompt",
            text: "Implement a DELETE /tasks/:id endpoint following the project instructions.",
          },
        ],
      },
    ],
    takeaways: [
      "CLAUDE.md is auto-loaded every session — your project's persistent memory.",
      "Hierarchy: enterprise → user → project → local → subdirectory.",
      "Put commands, architecture, rules and constraints in it; keep it short.",
      "Start with /init; update it every time you correct Claude twice.",
    ],
    quiz: [
      {
        q: "Where would you put a personal preference that should apply to all your projects?",
        options: ["./CLAUDE.md", "~/.claude/CLAUDE.md", "README.md", "package.json"],
        answer: 1,
        explain: "The user-level memory file applies across all projects and is not shared with the team.",
      },
      {
        q: "Which line is the best addition to a CLAUDE.md?",
        options: [
          "“Write clean code.”",
          "“Testing is very important.”",
          "“Run `node --test test/<file>` for a single test file; `npm test` must pass before finishing.”",
          "A 400-line copy of the entire style guide",
        ],
        answer: 2,
        explain: "Specific, actionable, project-unique information has the highest value per line.",
      },
    ],
  },

  // ───────────────────────────────────────────── 5
  {
    slug: "git-workflow",
    number: 5,
    title: "Claude Code + Git",
    tagline: "Status, diffs, commits, branches, PRs — and the review discipline that keeps you safe.",
    time: "35–40 min",
    minutes: 5,
    mode: "Demo",
    icon: "🌿",
    objectives: [
      "Use Claude Code to understand git status, diffs and history",
      "Review changes for regressions before committing",
      "Generate high-quality commit messages and pull requests",
      "Work with branches and worktrees safely",
    ],
    sections: [
      {
        id: "everyday-git",
        title: "Everyday git, in plain English",
        blocks: [
          {
            type: "p",
            text: "Claude Code runs real `git` (and the `gh` GitHub CLI if installed) through its Bash tool. Many developers end up using it for the majority of their git interactions — especially the ones they have to look up.",
          },
          {
            type: "table",
            headers: ["You say", "Claude runs (roughly)"],
            rows: [
              ["“What have I changed?”", "`git status`, `git diff`"],
              ["“Summarise the diff on this branch vs main.”", "`git diff main...HEAD`, `git log main..HEAD`"],
              ["“Create a branch for the profile feature.”", "`git switch -c feature/user-profile`"],
              ["“Who last changed this function and why?”", "`git log -L`, `git blame`, reads the commit message"],
              ["“Which commit broke pagination?”", "`git bisect` with `npm test` as the check"],
              ["“Rebase onto main and resolve the conflicts.”", "`git rebase main`, edits conflicted files, `git rebase --continue`"],
              ["“Open a PR with a good description.”", "`git push -u`, `gh pr create --title … --body …`"],
              ["“Address the review comments on PR #42.”", "`gh pr view 42 --comments`, edits, commits, pushes"],
            ],
          },
        ],
      },
      {
        id: "review",
        title: "Review before you commit",
        blocks: [
          {
            type: "prompt",
            label: "Self-review",
            text: "Review all the changes you made. Explain the important modifications and identify anything that could introduce a regression.",
          },
          {
            type: "p",
            text: "A good self-review answer covers: which files changed and why, any behaviour change for existing callers, edge cases not covered by tests, security implications, and things a human reviewer should look at closely.",
          },
          {
            type: "prompt",
            label: "Commit message",
            text: "Create a concise commit message for these changes.",
          },
          {
            type: "code",
            lang: "text",
            title: "What a good generated commit looks like",
            code: "feat(profile): add GET/PATCH /me/profile endpoints\n\n- Add profileService with validation for name, bio, avatarUrl, timezone\n- Register profile routes; reuse authenticate() and publicUser()\n- Extend user model with optional bio, avatarUrl, timezone fields\n- Add test/profile.test.js (8 cases incl. validation and auth)\n\nNo changes to existing endpoints.",
          },
          {
            type: "callout",
            variant: "tip",
            title: "Fresh eyes review",
            text: "The session that wrote the code is biased toward it. For important changes, `/clear` (or open a second terminal) and ask a fresh session: “Review the diff on this branch as a senior engineer. Look for bugs, security issues and missing tests.” You can also use the built-in `/review` command.",
          },
        ],
      },
      {
        id: "principle",
        title: "The important developer principle",
        blocks: [
          {
            type: "callout",
            variant: "warning",
            title: "You own what you merge",
            text: "Claude Code can **perform** development actions, but developers remain **responsible** for reviewing consequential changes. Read every diff before it is committed. Never let an agent push to a protected branch, rewrite shared history, or touch production without an explicit human decision.",
          },
          {
            type: "list",
            items: [
              "Read the diff — use `git diff` or your IDE's diff view, not just Claude's summary.",
              "Run the tests yourself at least once before merging.",
              "Deny risky commands in settings: `Bash(git push --force:*)`, `Bash(git reset --hard:*)`.",
              "Keep commits small so review is realistic.",
              "Be explicit: “commit, but don't push” is a perfectly good instruction.",
            ],
          },
        ],
      },
      {
        id: "github",
        title: "Beyond the terminal: GitHub integration",
        blocks: [
          {
            type: "p",
            text: "Claude Code can also run inside GitHub. Run `/install-github-app` in a session to set up the Claude GitHub app and the GitHub Action. Then anyone on the repo can mention `@claude` in an issue or PR comment to ask for a fix, a review, or an implementation, and Claude opens a PR.",
          },
          {
            type: "code",
            lang: "text",
            title: "Example PR comment",
            code: "@claude the pagination test is failing on this branch.\nFind the root cause and push a fix with a regression test.",
          },
        ],
      },
    ],
    takeaways: [
      "Talk to git in plain English; Claude runs real git/gh commands.",
      "Always self-review: ask for regressions before committing.",
      "Use a fresh session (or /review) for an unbiased review.",
      "The agent acts; you remain accountable. Read every diff.",
    ],
    quiz: [
      {
        q: "Why use a fresh session for code review?",
        options: [
          "Fresh sessions are faster",
          "The session that wrote the code carries its assumptions; a clean context reviews more objectively",
          "Old sessions can't run git",
          "It's required by GitHub",
        ],
        answer: 1,
        explain: "Like human reviewers, a reviewer without the author's assumptions catches more issues.",
      },
      {
        q: "Which is a good safety measure?",
        options: [
          "Allow `git push --force` globally",
          "Deny force-push and hard-reset in .claude/settings.json",
          "Skip reading diffs when tests pass",
          "Always use --dangerously-skip-permissions",
        ],
        answer: 1,
        explain: "Deny rules prevent destructive commands from ever running, even if approved by accident.",
      },
    ],
  },

  // ───────────────────────────────────────────── 6
  {
    slug: "testing-debugging",
    number: 6,
    title: "Claude Code + Testing + Debugging",
    tagline: "Reproduce → investigate → root cause → fix → test → verify.",
    time: "40–46 min",
    minutes: 6,
    mode: "Live Demo",
    icon: "🐞",
    objectives: [
      "Run a test suite with Claude Code and analyse failures",
      "Separate diagnosis from fixing (“do not modify anything yet”)",
      "Read stack traces and find root causes, not symptoms",
      "Use test-driven development with an agent",
      "Guard against agents “fixing” tests instead of code",
    ],
    sections: [
      {
        id: "scenario",
        title: "Scenario: a deliberately broken application",
        blocks: [
          {
            type: "p",
            text: "The TaskFlow demo repo ships with **two failing tests** caused by real bugs. Clone it (see the Labs page) and run this three-step sequence. The separation into steps is the lesson.",
          },
          {
            type: "steps",
            items: [
              {
                title: "1 · Diagnose only",
                body: "Forbidding edits forces Claude to investigate instead of jumping to a patch.",
                prompt: "Run the test suite and identify the root cause of the failures. Do not modify anything yet.",
              },
              {
                title: "2 · Plan",
                body: "Review the plan. Is it fixing the cause, or masking the symptom?",
                prompt: "Create a plan to fix the failures.",
              },
              {
                title: "3 · Fix and verify",
                body: "Claude edits, re-runs the suite, and iterates until green.",
                prompt: "Implement the fix and run the tests again.",
              },
            ],
          },
          {
            type: "code",
            lang: "text",
            title: "What the failing run looks like",
            code: "✖ page 1 returns the first tasks\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:\n    actual: 'Task 6',\n    expected: 'Ship it',\n\n✖ lists only tasks whose due date has passed as overdue\n  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:\n    actual: [ 'Future' ],\n    expected: [ 'Old' ],\n\nℹ tests 8\nℹ pass 6\nℹ fail 2",
          },
          {
            type: "callout",
            variant: "note",
            title: "Spoiler (expand only after trying)",
            text: "Bug 1: `listTasks` computes `start = page * limit`, so page 1 skips the first page — should be `(page - 1) * limit`. Bug 2: `overdueTasks` uses `new Date(t.dueDate) > now` — the comparison is inverted; overdue means the due date is **before** now.",
          },
        ],
      },
      {
        id: "workflow",
        title: "The debugging workflow",
        blocks: [
          {
            type: "flow",
            steps: ["Bug", "Reproduce", "Investigate", "Root cause", "Fix", "Test", "Verify"],
          },
          {
            type: "table",
            headers: ["Stage", "Prompt pattern"],
            rows: [
              ["Reproduce", "“Write a failing test (or a script) that reproduces: <bug report>. Confirm it fails.”"],
              ["Investigate", "“Trace the code path for this input. Add temporary logging if needed. Don't fix yet.”"],
              ["Root cause", "“Explain why this happens. Is the bug here or upstream? Are there other callers affected?”"],
              ["Fix", "“Fix the root cause with the smallest change. Don't change the test.”"],
              ["Test", "“Run the full suite, not just the new test.”"],
              ["Verify", "“Remove temporary logging. Show me the final diff and explain why it's correct.”"],
            ],
          },
        ],
      },
      {
        id: "stack-traces",
        title: "Error analysis and stack traces",
        blocks: [
          {
            type: "p",
            text: "Paste or pipe errors straight in. Claude reads the trace, opens the files at the referenced lines, and follows the call chain.",
          },
          {
            type: "code",
            lang: "bash",
            title: "Ways to feed errors to Claude Code",
            code: "# inside a session: run and capture\n!npm test\n\n# pipe a log file into a one-shot analysis\ncat logs/server.log | claude -p \"find the first error and explain the root cause\"\n\n# tail a CI failure\ngh run view --log-failed | claude -p \"why did CI fail? suggest a fix\"",
          },
          {
            type: "callout",
            variant: "tip",
            title: "Give it the reproduction, not your theory",
            text: "“Login returns 500 when the email has uppercase letters; here's the curl and the response” is better than “I think the regex is broken.” Let the agent investigate — your theory may anchor it to the wrong place.",
          },
        ],
      },
      {
        id: "tdd",
        title: "Test-driven development with an agent",
        blocks: [
          {
            type: "p",
            text: "TDD is even more effective with an agent, because a failing test is an unambiguous, machine-checkable goal.",
          },
          {
            type: "steps",
            items: [
              { title: "Write tests first", body: "Be explicit that you are doing TDD so it doesn't write mock implementations.", prompt: "We're doing TDD. Write tests for a DELETE /tasks/:id endpoint: success (204), 404 for unknown id, 403 for another user's task. Don't implement the endpoint." },
              { title: "Confirm they fail", body: "Proves the tests actually test something.", prompt: "Run the tests and confirm the new ones fail for the right reason." },
              { title: "Commit the tests", body: "Locks the spec in place." },
              { title: "Implement until green", body: "Claude iterates: code, run, adjust.", prompt: "Now implement the endpoint so all tests pass. Do not modify the tests." },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            title: "Watch for test tampering",
            text: "Agents optimise for “tests pass”. Occasionally they will weaken an assertion, skip a test or special-case the test input. Say explicitly “do not modify the tests” and **check the diff for changes under `test/`**.",
          },
        ],
      },
      {
        id: "regression",
        title: "Regression testing",
        blocks: [
          {
            type: "list",
            items: [
              "Every bug fix gets a test that would have caught it. Put this rule in CLAUDE.md.",
              "Ask Claude to run the **whole** suite after a fix, not just the new test.",
              "Ask: “What else calls this function? Could the fix change their behaviour?”",
              "For UI bugs, give Claude a screenshot before and after, or a browser automation MCP (e.g. Playwright) to check visually.",
            ],
          },
        ],
      },
    ],
    takeaways: [
      "Separate diagnosis, planning and fixing into distinct prompts.",
      "Reproduce first — a failing test is the best possible goal.",
      "Fix root causes; run the full suite; check the diff for test tampering.",
      "Every bug fix leaves behind a regression test.",
    ],
    quiz: [
      {
        q: "Why say “Do not modify anything yet” in the first debugging prompt?",
        options: [
          "To save tokens",
          "To force investigation of the root cause before any patch is attempted",
          "Because Claude can't edit during tests",
          "To trigger plan mode automatically",
        ],
        answer: 1,
        explain: "Separating diagnosis from fixing produces better root-cause analysis and gives you a checkpoint to review.",
      },
      {
        q: "During TDD, the agent changed an assertion so the test passes. What should you have done?",
        options: [
          "Nothing — green is green",
          "Explicitly instruct “do not modify the tests” and review changes under test/",
          "Delete the tests",
          "Switch models",
        ],
        answer: 1,
        explain: "Tests are the spec. Lock them (commit them, instruct the agent) and review diffs touching them.",
      },
    ],
  },
];

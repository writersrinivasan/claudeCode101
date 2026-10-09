import type { Module } from "./types";

export const modulesPart3: Module[] = [
  // ───────────────────────────────────────────── 7
  {
    slug: "mcp",
    number: 7,
    title: "MCP + Claude Code",
    tagline: "Model Context Protocol: connecting the agent to your tools and data.",
    time: "46–52 min",
    minutes: 6,
    mode: "Concept + Demo",
    icon: "🔌",
    objectives: [
      "Explain what MCP is and why it exists",
      "Add, scope, list and authenticate MCP servers",
      "Share MCP configuration with your team via .mcp.json",
      "Identify high-value developer use cases and the security considerations",
    ],
    sections: [
      {
        id: "what",
        title: "What is MCP?",
        blocks: [
          {
            type: "p",
            text: "**MCP (Model Context Protocol) is an open standard for connecting AI agents to external capabilities and context.** An MCP **server** exposes tools (actions), resources (data) and prompts. Claude Code is an MCP **client**: once a server is connected, its tools appear alongside Read, Edit and Bash.",
          },
          {
            type: "p",
            text: "Think of it as “USB-C for AI tools”: write one GitHub server and every MCP-compatible agent can use it. There are servers for GitHub, Sentry, Linear, Jira, Notion, Slack, Figma, Postgres, Playwright, cloud providers — and you can write your own for internal systems.",
          },
          {
            type: "code",
            lang: "text",
            title: "Claude Code as the hub",
            code: "Claude Code\n │\n ├── GitHub         issues, PRs, code search\n ├── Database       schema, read-only queries\n ├── Documentation  up-to-date library docs\n ├── APIs           internal services\n ├── Jira / Linear  tickets and specs\n ├── Slack          threads and context\n ├── Cloud          logs, deploys, infra\n └── Internal tools your own MCP servers",
          },
          {
            type: "compare",
            left: {
              title: "Without MCP",
              tone: "bad",
              items: [
                "“Here is the API documentation. Please read it.” (paste 2,000 lines)",
                "Copy the Jira ticket text into the prompt",
                "Run the SQL yourself and paste results",
              ],
            },
            right: {
              title: "With MCP",
              tone: "good",
              items: [
                "“Look up the current docs for the payments API and use them.”",
                "“Implement ENG-4521 from Jira and update the ticket when done.”",
                "“Check the schema of the orders table and write the migration.”",
              ],
            },
          },
        ],
      },
      {
        id: "setup",
        title: "Adding MCP servers",
        blocks: [
          {
            type: "p",
            text: "Servers connect over one of three transports: **stdio** (a local process Claude Code launches), **HTTP** (streamable HTTP, the recommended remote transport), or **SSE** (older remote transport).",
          },
          {
            type: "code",
            lang: "bash",
            title: "Common commands",
            code: "# remote HTTP server\nclaude mcp add --transport http github https://api.githubcopilot.com/mcp/\n\n# local stdio server (everything after -- is the command to launch)\nclaude mcp add playwright -- npx -y @playwright/mcp@latest\n\n# pass environment variables\nclaude mcp add my-db --env DATABASE_URL=postgres://readonly@localhost/app \\\n  -- npx -y some-postgres-mcp-server\n\n# manage\nclaude mcp list\nclaude mcp get github\nclaude mcp remove github",
          },
          {
            type: "code",
            lang: "text",
            title: "Inside a session",
            code: "/mcp            # view server status, tools, and authenticate (OAuth)\n@github:...     # some servers expose resources you can @-mention",
          },
          {
            type: "table",
            headers: ["Scope", "Flag", "Stored in", "Use for"],
            rows: [
              ["Local (default)", "`--scope local`", "Your user config, this project only", "Personal or experimental servers"],
              ["Project", "`--scope project`", "`.mcp.json` in the repo (commit it)", "Servers the whole team should have"],
              ["User", "`--scope user`", "Your user config, all projects", "Tools you use everywhere"],
            ],
          },
          {
            type: "code",
            lang: "json",
            title: ".mcp.json — shared, version-controlled team config",
            code: '{\n  "mcpServers": {\n    "github": {\n      "type": "http",\n      "url": "https://api.githubcopilot.com/mcp/"\n    },\n    "playwright": {\n      "command": "npx",\n      "args": ["-y", "@playwright/mcp@latest"]\n    },\n    "docs": {\n      "type": "http",\n      "url": "${DOCS_MCP_URL:-https://docs.internal.example.com/mcp}"\n    }\n  }\n}',
          },
          {
            type: "callout",
            variant: "note",
            title: "Environment variable expansion",
            text: "`.mcp.json` supports `${VAR}` and `${VAR:-default}`, so you can commit the file without committing secrets. Claude Code asks each developer to approve project-scoped servers the first time.",
          },
        ],
      },
      {
        id: "use-cases",
        title: "Developer use cases",
        blocks: [
          {
            type: "table",
            headers: ["Use case", "Example prompt"],
            rows: [
              ["Database investigation", "“Using the read-only DB server, find users created in the last 24h with no tasks. Explain the query.”"],
              ["Documentation lookup", "“Fetch the current Next.js docs for caching and update our data fetching to match.”"],
              ["GitHub workflows", "“List open issues labelled bug, pick the smallest, fix it and open a PR.”"],
              ["Issue tracking", "“Read Linear ticket ENG-123, implement it, then comment on the ticket with a summary.”"],
              ["Error monitoring", "“Get the top Sentry error from the last 24h, find the root cause in our code, propose a fix.”"],
              ["Browser testing", "“Use Playwright to open localhost:3000, sign up, and screenshot each step. Report anything broken.”"],
              ["Design to code", "“Implement the component from this Figma frame using our design tokens.”"],
              ["Internal APIs & cloud", "“Check the staging deploy logs for the payments service and summarise errors since 9am.”"],
            ],
          },
        ],
      },
      {
        id: "security",
        title: "Security considerations",
        blocks: [
          {
            type: "list",
            items: [
              "**Only install servers you trust.** An MCP server runs with your credentials and can return content that influences the agent (prompt injection).",
              "**Least privilege.** Use read-only database users and narrowly-scoped tokens.",
              "**Approve tools deliberately.** MCP tool calls go through the same permission system; allow-list only what you need, e.g. `mcp__github__get_issue`.",
              "**Watch context cost.** Every connected server adds tool definitions to context. Disconnect servers you are not using (`/context` shows the cost).",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "No server configured for the session?",
            text: "Keep this part conceptual, or demo with something zero-config like the Playwright server against the portal you're reading right now.",
          },
        ],
      },
    ],
    takeaways: [
      "MCP is the open standard that plugs tools and data into the agent.",
      "`claude mcp add` (stdio / http) + `/mcp` to manage and authenticate.",
      "Commit `.mcp.json` to share team servers; keep secrets in env vars.",
      "Least privilege and trusted servers only — MCP output is untrusted input.",
    ],
    quiz: [
      {
        q: "Which file lets your team share MCP server configuration via git?",
        options: ["CLAUDE.md", ".mcp.json", "package.json", ".claude/settings.local.json"],
        answer: 1,
        explain: "Project-scoped servers live in .mcp.json at the repo root.",
      },
      {
        q: "What's the best practice for a database MCP server?",
        options: [
          "Use the production admin account",
          "Use a read-only user with access to non-sensitive data",
          "Disable permissions so queries run faster",
          "Paste the password into CLAUDE.md",
        ],
        answer: 1,
        explain: "Least privilege limits the damage from mistakes or prompt injection.",
      },
    ],
  },

  // ───────────────────────────────────────────── 8
  {
    slug: "end-to-end-demo",
    number: 8,
    title: "The 10-Minute “WOW” Demo",
    tagline: "One continuous workflow: requirement → exploration → plan → code → test → debug → review → git.",
    time: "52–58 min",
    minutes: 6,
    mode: "WOW Demo",
    icon: "✨",
    objectives: [
      "See the complete agentic workflow end-to-end, uninterrupted",
      "Know how to structure a one-shot, multi-stage prompt",
      "Know what to watch for while the agent works",
    ],
    sections: [
      {
        id: "challenge",
        title: "The challenge",
        blocks: [
          {
            type: "prompt",
            label: "The end-to-end prompt",
            text: "Take this existing application. Understand the codebase, implement a new feature, add tests, run the tests, identify and fix any failures, review the changes, and prepare a commit.",
          },
          {
            type: "flow",
            steps: ["Requirement", "Repository exploration", "Planning", "Coding", "Testing", "Debugging", "Review", "Git"],
          },
        ],
      },
      {
        id: "script",
        title: "A concrete demo script (TaskFlow)",
        blocks: [
          {
            type: "code",
            lang: "bash",
            title: "Setup (before the session)",
            code: "cd taskflow-api\ngit init && git add -A && git commit -m \"chore: initial import\"\ngit switch -c feature/task-search\nclaude",
          },
          {
            type: "prompt",
            label: "Paste this as one prompt",
            text: "Take this existing application and add task search.\n\nRequirement: GET /tasks/search?q=<text> returns the current user's tasks whose title contains q (case-insensitive), using the same pagination shape as GET /tasks.\n\nWork like a senior engineer:\n1. Explore the codebase and explain the architecture briefly.\n2. Write a short plan.\n3. Implement following existing patterns (thin routes, logic in services, no new dependencies).\n4. Add tests in the existing style.\n5. Run the full test suite. If anything fails — including pre-existing failures — find the root cause and fix it.\n6. Review your own diff for regressions and security issues.\n7. Commit with a conventional commit message. Do not push.\n\nUse a todo list to track progress.",
          },
          {
            type: "p",
            text: "Why this is a great live demo: the repo already contains two failing tests that have nothing to do with search. The audience watches Claude discover the pre-existing failures during step 5, diagnose them and fix them — debugging they never asked for explicitly.",
          },
        ],
      },
      {
        id: "watch",
        title: "What to point out while it runs",
        blocks: [
          {
            type: "table",
            headers: ["Moment", "Talking point"],
            rows: [
              ["It reads files before writing", "Context gathering — no blind generation."],
              ["The todo list appears", "Visible planning; you can redirect at any item."],
              ["Permission prompts", "Human in the loop. Approve `npm test` with “don't ask again”."],
              ["Tests fail", "This is good! Watch it read the assertion and trace the cause."],
              ["It fixes unrelated bugs", "Was that in scope? Discuss: agents need clear boundaries."],
              ["Self-review", "Ask the audience: what would you still check yourself?"],
              ["Commit", "Readable conventional message; nothing pushed."],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Demo insurance",
            text: "Rehearse once and commit a `done` branch. If the network or the model has a bad day, `git switch done` and walk through the diff. Live demos are about workflow, not luck.",
          },
        ],
      },
    ],
    takeaways: [
      "The real power is the continuous loop, not any single feature.",
      "Numbered stages + constraints + a definition of done = reliable one-shot runs.",
      "Failures during the run are a feature: they show the agent iterating.",
    ],
    quiz: [
      {
        q: "Why include “Do not push” in the end-to-end prompt?",
        options: [
          "Pushing is impossible from Claude Code",
          "It keeps a human decision point before changes leave your machine",
          "It makes the commit faster",
          "Git doesn't allow agent pushes",
        ],
        answer: 1,
        explain: "Explicit boundaries keep consequential, outward-facing actions under human control.",
      },
    ],
  },

  // ───────────────────────────────────────────── 9
  {
    slug: "takeaways",
    number: 9,
    title: "Final Takeaways + Q&A",
    tagline: "Five things to remember, and the question to keep asking.",
    time: "58–60 min",
    minutes: 2,
    mode: "Discussion",
    icon: "🎯",
    objectives: ["Consolidate the session", "Leave with a plan for your first week with Claude Code"],
    sections: [
      {
        id: "five-things",
        title: "5 things developers should remember",
        blocks: [
          {
            type: "cards",
            items: [
              { icon: "1️⃣", title: "More than code completion", body: "Claude Code is an agent: it reads, plans, edits, runs and verifies." },
              { icon: "2️⃣", title: "Give it repository context", body: "Not isolated snippets. Let it explore; maintain a great CLAUDE.md." },
              { icon: "3️⃣", title: "Use it for multi-step tasks", body: "Features, bug hunts, refactors, migrations — goals, not lines." },
              { icon: "4️⃣", title: "Tests and review remain critical", body: "Give it a way to verify itself, and read every diff you merge." },
              { icon: "5️⃣", title: "Developer + AI agent", body: "Not developer vs AI. You set direction and own quality; it does the legwork." },
            ],
          },
        ],
      },
      {
        id: "first-week",
        title: "Your first week with Claude Code",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Day 1 — Install & explore", body: "Install, open your main repo, ask it to explain the architecture. Ask five questions you've always wondered about." },
              { title: "Day 2 — CLAUDE.md", body: "Run /init, prune it, add your real commands and rules. Commit it." },
              { title: "Day 3 — Bug fix", body: "Pick a small bug. Reproduce with a failing test, fix, review, commit." },
              { title: "Day 4 — Feature", body: "Plan mode → implement a small feature end-to-end. Practise /clear between tasks." },
              { title: "Day 5 — Automate", body: "Add permission allow-rules, one custom slash command, and maybe one MCP server your team uses." },
            ],
          },
        ],
      },
      {
        id: "closing",
        title: "Closing question",
        blocks: [
          {
            type: "callout",
            variant: "pro",
            title: "Think about this",
            text: "If an AI agent can understand your repository, modify multiple files, execute commands, run tests and iterate — **what part of your current development workflow should still be done manually?**",
          },
          {
            type: "p",
            text: "Common answers worth discussing: deciding *what* to build; product and architecture trade-offs; reviewing for correctness and security; owning production incidents; mentoring; and knowing when the agent is confidently wrong.",
          },
        ],
      },
    ],
    takeaways: [
      "Agent, context, multi-step, verification, partnership.",
      "Start small this week; build habits and a CLAUDE.md.",
    ],
    quiz: [
      {
        q: "Which statement best reflects the session's philosophy?",
        options: [
          "AI will replace developer judgement",
          "Developers + AI agents: humans own direction and quality, agents do the legwork",
          "AI tools are only for juniors",
          "Code review is no longer needed",
        ],
        answer: 1,
        explain: "Developer + AI agent, not developer vs AI.",
      },
    ],
  },

  // ───────────────────────────────────────────── 10 (bonus)
  {
    slug: "power-features",
    number: 10,
    title: "Bonus: Power Features for Daily Use",
    tagline: "Settings, custom commands, sub-agents, hooks, skills, headless mode and CI.",
    time: "Self-study",
    minutes: 0,
    mode: "Reference",
    icon: "⚡",
    objectives: [
      "Configure settings and permissions at the right scope",
      "Create custom slash commands and sub-agents for repeat workflows",
      "Use hooks for deterministic automation (format, lint, guard rails)",
      "Run Claude Code headless in scripts and CI",
    ],
    sections: [
      {
        id: "settings",
        title: "Settings files and scopes",
        blocks: [
          {
            type: "table",
            headers: ["File", "Scope", "Commit?"],
            rows: [
              ["`~/.claude/settings.json`", "You, all projects", "—"],
              ["`.claude/settings.json`", "Project, shared with team", "Yes"],
              ["`.claude/settings.local.json`", "You, this project", "No (git-ignored)"],
              ["Managed policy settings", "Organisation (set by admins)", "—"],
            ],
          },
          {
            type: "code",
            lang: "json",
            title: ".claude/settings.json — a solid starting point",
            code: '{\n  "permissions": {\n    "allow": [\n      "Bash(npm test:*)",\n      "Bash(npm run lint:*)",\n      "Bash(npx tsc --noEmit)",\n      "Bash(git status)",\n      "Bash(git diff:*)",\n      "Bash(git log:*)"\n    ],\n    "deny": [\n      "Read(./.env*)",\n      "Read(./**/secrets/**)",\n      "Bash(git push --force:*)",\n      "Bash(rm -rf:*)"\n    ]\n  },\n  "env": {\n    "NODE_ENV": "development"\n  }\n}',
          },
        ],
      },
      {
        id: "commands",
        title: "Custom slash commands",
        blocks: [
          {
            type: "p",
            text: "Turn any prompt you repeat into a command. Markdown files in `.claude/commands/` (project, shared) or `~/.claude/commands/` (personal) become `/command-name`. `$ARGUMENTS` receives whatever you type after the command; `$1`, `$2` receive positional args.",
          },
          {
            type: "code",
            lang: "markdown",
            title: ".claude/commands/fix-issue.md → /fix-issue 123",
            code: "---\ndescription: Fix a GitHub issue end-to-end\nallowed-tools: Bash(gh issue view:*), Bash(npm test:*)\n---\n\nFix GitHub issue #$ARGUMENTS.\n\n1. Run `gh issue view $ARGUMENTS` to read the issue.\n2. Find the relevant code and reproduce the problem with a failing test.\n3. Fix the root cause. Do not modify existing tests.\n4. Run `npm test` until everything passes.\n5. Commit with message `fix: <summary> (closes #$ARGUMENTS)`. Do not push.",
          },
          {
            type: "callout",
            variant: "note",
            title: "Skills",
            text: "For richer, reusable capabilities use **skills**: a folder like `.claude/skills/api-endpoint/SKILL.md` with a name and description in frontmatter plus instructions, scripts and templates. Claude loads a skill automatically when the task matches its description. Commands are invoked by you; skills can also be picked up by Claude.",
          },
        ],
      },
      {
        id: "subagents",
        title: "Sub-agents",
        blocks: [
          {
            type: "p",
            text: "Sub-agents are specialised assistants with their **own context window, system prompt and tool permissions**. Claude delegates to them (automatically, based on their description, or when you ask), and only their summary comes back — keeping your main context clean. Create them with `/agents` or as files in `.claude/agents/`.",
          },
          {
            type: "code",
            lang: "markdown",
            title: ".claude/agents/security-reviewer.md",
            code: "---\nname: security-reviewer\ndescription: Reviews code changes for security vulnerabilities. Use proactively after changes to auth, input handling or data access.\ntools: Read, Grep, Glob, Bash(git diff:*)\nmodel: opus\n---\n\nYou are a senior application security engineer.\n\nReview the current diff for: injection, broken authentication, missing\nauthorization checks (IDOR), sensitive data exposure, insecure crypto,\nand unsafe defaults.\n\nFor each finding report: file:line, severity, exploit scenario, fix.\nIf nothing is found, say so. Do not edit files.",
          },
          {
            type: "prompt",
            text: "Use the security-reviewer sub-agent to review my changes.",
          },
        ],
      },
      {
        id: "hooks",
        title: "Hooks: deterministic automation",
        blocks: [
          {
            type: "p",
            text: "CLAUDE.md is guidance the model *usually* follows. **Hooks are guaranteed**: shell commands the harness runs at lifecycle events. Use them for things that must always happen.",
          },
          {
            type: "table",
            headers: ["Event", "Fires", "Typical use"],
            rows: [
              ["`PreToolUse`", "Before a tool runs (can block it)", "Block edits to protected files; block dangerous commands"],
              ["`PostToolUse`", "After a tool succeeds", "Auto-format / lint the edited file"],
              ["`UserPromptSubmit`", "When you send a prompt", "Inject context, validate prompts"],
              ["`Notification`", "When Claude needs input", "Desktop / Slack notification"],
              ["`Stop` / `SubagentStop`", "When Claude finishes", "Run tests, notify, log"],
              ["`SessionStart` / `SessionEnd`", "Session lifecycle", "Load env/context; cleanup"],
              ["`PreCompact`", "Before context compaction", "Save transcript or notes"],
            ],
          },
          {
            type: "code",
            lang: "json",
            title: "Auto-format every file Claude edits (settings.json)",
            code: '{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Edit|Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "jq -r \'.tool_input.file_path\' | xargs npx prettier --write"\n          }\n        ]\n      }\n    ]\n  }\n}',
          },
          {
            type: "callout",
            variant: "warning",
            title: "Hooks run with your permissions",
            text: "Hook commands execute automatically on your machine. Review hook configuration in any repo before trusting it, just as you would a git hook or npm postinstall script. Use `/hooks` to inspect them.",
          },
        ],
      },
      {
        id: "headless",
        title: "Headless mode, scripting and CI",
        blocks: [
          {
            type: "code",
            lang: "bash",
            title: "Non-interactive usage with -p",
            code: "# one-shot question\nclaude -p \"summarise what changed in the last 10 commits\"\n\n# machine-readable output for scripts\nclaude -p \"list TODO comments as JSON\" --output-format json\n\n# restrict tools in automation\nclaude -p \"run the tests and fix failures\" \\\n  --allowedTools \"Read,Edit,Bash(npm test:*)\"\n\n# fan-out: migrate many files\nfor f in $(git ls-files 'src/**/*.js'); do\n  claude -p \"convert $f to TypeScript; keep behaviour identical\" \\\n    --allowedTools \"Read,Edit,Write\"\ndone",
          },
          {
            type: "list",
            items: [
              "**GitHub Actions** — `/install-github-app`, then `@claude` in issues and PRs; or use the official action in your own workflows.",
              "**Pre-commit / CI linting** — “review this diff for typos and obvious bugs” as a non-blocking CI step.",
              "**Agent SDK** — build your own agents on the same harness (TypeScript and Python SDKs).",
            ],
          },
        ],
      },
      {
        id: "shortcuts",
        title: "Quality-of-life tips",
        blocks: [
          {
            type: "list",
            items: [
              "Run `/terminal-setup` to enable Shift+Enter for newlines in your terminal.",
              "Paste screenshots (Ctrl+V on macOS too in most terminals) for UI work.",
              "Use `/statusline` to show model, branch and context usage in your prompt line.",
              "Use `/model` to switch to a faster model for simple tasks, a stronger one for hard ones.",
              "Ask Claude to **write a script** for repetitive verification (e.g. `scripts/smoke.sh`), then reference it in CLAUDE.md.",
              "Use `claude --continue` after closing the terminal to pick up exactly where you left off.",
            ],
          },
        ],
      },
    ],
    takeaways: [
      "settings.json = permissions & env; commit the project one.",
      "Commands for prompts you repeat; sub-agents for specialised, isolated work.",
      "Hooks for anything that must always happen.",
      "`claude -p` turns the agent into a scriptable CLI tool for CI.",
    ],
    quiz: [
      {
        q: "You need every edited file to be formatted, guaranteed. What should you use?",
        options: ["A line in CLAUDE.md", "A PostToolUse hook", "A sub-agent", "Plan mode"],
        answer: 1,
        explain: "CLAUDE.md is advisory; hooks are executed deterministically by the harness.",
      },
      {
        q: "What is the main benefit of a sub-agent?",
        options: [
          "It's always cheaper",
          "It has its own context window and tool permissions, returning only a summary",
          "It can push to production",
          "It bypasses permissions",
        ],
        answer: 1,
        explain: "Isolated context keeps your main session focused and lets you restrict tools for the specialist.",
      },
    ],
  },
];

import type { Module } from "./types";

export const modulesPart1: Module[] = [
  // ───────────────────────────────────────────── 0
  {
    slug: "why-claude-code",
    number: 0,
    title: "Why Claude Code? The Developer Workflow Is Changing",
    tagline: "From “AI helps me write code” to “AI works with my codebase”.",
    time: "0–5 min",
    minutes: 5,
    mode: "Concept + Demo",
    icon: "🚀",
    objectives: [
      "Explain what Claude Code is in one sentence",
      "Tell the difference between an autocomplete assistant and a coding agent",
      "Know where Claude Code fits in a modern development workflow",
      "Set realistic expectations for what the agent will and will not do",
    ],
    sections: [
      {
        id: "what-is-it",
        title: "What is Claude Code?",
        blocks: [
          {
            type: "p",
            text: "**Claude Code is an agentic coding tool that lives in your terminal (and in VS Code, JetBrains, the desktop app and the web).** You describe a goal in plain English; Claude Code reads your repository, plans an approach, edits files, runs commands such as your test suite, looks at the results, and iterates until the task is done — asking for your permission along the way.",
          },
          {
            type: "p",
            text: "The key word is **agentic**. Claude Code is not a text box that returns a snippet for you to paste. It operates on your real project with real tools: it can `Read` and `Edit` files, `Grep` and `Glob` to search, run `Bash` commands, fetch web pages, and talk to external systems through MCP servers.",
          },
          {
            type: "callout",
            variant: "note",
            title: "One-sentence definition for your notes",
            text: "Claude Code = a large language model (Claude) + a set of tools (read, search, edit, run) + a loop that keeps going until the goal is met + you in control of permissions.",
          },
        ],
      },
      {
        id: "assistant-vs-agent",
        title: "Claude Code vs traditional AI coding assistants",
        blocks: [
          {
            type: "compare",
            left: {
              title: "Traditional AI assistant",
              tone: "bad",
              items: [
                "Sees the current file or a pasted snippet",
                "Suggests the next line or a block of code",
                "You copy, paste and wire it in",
                "You run the build and tests yourself",
                "You feed errors back by hand",
                "Has no memory of project conventions",
              ],
            },
            right: {
              title: "Claude Code (coding agent)",
              tone: "good",
              items: [
                "Explores the whole repository on its own",
                "Plans multi-file changes before touching code",
                "Edits the files directly (with your approval)",
                "Runs builds, linters and tests itself",
                "Reads failures and fixes them in a loop",
                "Remembers conventions via CLAUDE.md",
              ],
            },
          },
          {
            type: "table",
            headers: ["Dimension", "Autocomplete / chat assistant", "Claude Code"],
            rows: [
              ["Unit of work", "A line, function or snippet", "A task or goal (“add profile feature”)"],
              ["Context", "Open file / pasted text", "Entire repo, git history, terminal output, external tools"],
              ["Actions", "Suggest text", "Read, search, edit, run commands, call MCP tools"],
              ["Feedback loop", "Human-driven", "Self-driven: run → observe → fix"],
              ["Where it runs", "Editor sidebar", "Terminal, IDE, desktop, web, CI (headless)"],
              ["Your role", "Typist + integrator", "Tech lead: define goal, review, approve"],
            ],
          },
        ],
      },
      {
        id: "the-agent-loop",
        title: "The concept of an AI coding agent",
        blocks: [
          {
            type: "p",
            text: "Under the hood every agent runs the same simple loop. Claude decides on the next action, a tool executes it, the result comes back into context, and Claude decides again. This continues until Claude believes the goal is achieved — or until you interrupt with `Esc`.",
          },
          {
            type: "flow",
            title: "The agent loop",
            steps: ["Gather context", "Decide next action", "Use a tool", "Observe result", "Goal met? → repeat or finish"],
          },
          {
            type: "cards",
            items: [
              { icon: "🔍", title: "Gather context", body: "Read files, grep for symbols, list directories, check git status, read CLAUDE.md." },
              { icon: "🛠️", title: "Take action", body: "Edit or create files, run shell commands, call MCP tools, spawn sub-agents for side quests." },
              { icon: "✅", title: "Verify work", body: "Run tests, type-checkers, linters or the app itself. Read the output. Fix and re-run." },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Why this matters for you",
            text: "Because the agent verifies its own work, the single biggest quality lever you have is **giving it a way to check itself**: a test command, a type-check, a lint step, a script that reproduces the bug. An agent with a feedback loop outperforms an agent without one, every time.",
          },
        ],
      },
      {
        id: "where-it-fits",
        title: "Where Claude Code fits in your workflow",
        blocks: [
          {
            type: "list",
            items: [
              "**Onboarding** — “Explain this codebase”, “Where is X handled?”, “Draw the request flow.”",
              "**Feature work** — plan, implement across files, write tests, open a PR.",
              "**Debugging** — reproduce, read stack traces, bisect, fix the root cause.",
              "**Refactoring & migrations** — rename across the repo, upgrade a framework, convert JS → TS.",
              "**Code review** — review a diff or PR for bugs, security issues, missing tests.",
              "**Ops & glue** — write scripts, fix CI, parse logs, generate release notes.",
              "**Automation** — run non-interactively in CI with `claude -p` (headless mode) or via GitHub Actions.",
            ],
          },
        ],
      },
      {
        id: "opening-hook",
        title: "The opening hook (try it yourself)",
        blocks: [
          {
            type: "prompt",
            label: "The session's opening challenge",
            text: "Understand this codebase, find the problem, implement the solution, test it, and show me what changed.",
            why: "One sentence, five distinct engineering activities. By the end of this hour you will have watched Claude Code do every one of them on a real repository.",
          },
          {
            type: "callout",
            variant: "warning",
            title: "Set expectations",
            text: "Claude Code is powerful but not magic. It can misunderstand vague goals, over-engineer, or confidently fix the wrong thing. Treat it like a fast, tireless, very well-read **new teammate**: give clear goals, provide context, and **review its work**.",
          },
        ],
      },
    ],
    takeaways: [
      "Claude Code is an agent: model + tools + loop + human permissions.",
      "Its unit of work is a goal, not a code snippet.",
      "It verifies its own work — so give it tests and commands to run.",
      "You move from typist to tech lead: define, review, approve.",
    ],
    quiz: [
      {
        q: "What most distinguishes Claude Code from an autocomplete assistant?",
        options: [
          "It uses a bigger model",
          "It can take actions (read, edit, run) in a loop toward a goal",
          "It only works in the terminal",
          "It never needs human approval",
        ],
        answer: 1,
        explain: "The agentic loop — gather context, act, verify, repeat — is the defining difference. It also runs in IDEs, desktop and web, and it asks for permission by default.",
      },
      {
        q: "What is the single biggest lever for improving the quality of agent output?",
        options: [
          "Typing prompts in ALL CAPS",
          "Giving it a way to verify its work (tests, lint, type-check)",
          "Using the longest possible prompt",
          "Disabling all permissions",
        ],
        answer: 1,
        explain: "An agent that can run a check, see failure output and iterate converges on correct code far more reliably.",
      },
    ],
  },

  // ───────────────────────────────────────────── 1
  {
    slug: "fundamentals",
    number: 1,
    title: "Claude Code Fundamentals",
    tagline: "Install it, launch it, point it at a repo, and ask good questions.",
    time: "5–12 min",
    minutes: 7,
    mode: "Live Demo",
    icon: "🧭",
    objectives: [
      "Install and authenticate Claude Code on macOS, Linux or Windows",
      "Start an interactive session inside a project",
      "Understand how Claude Code explores a repository with its built-in tools",
      "Use @-mentions, ! bash mode and the core slash commands",
      "Understand and control the permission system",
    ],
    sections: [
      {
        id: "install",
        title: "Installing Claude Code",
        blocks: [
          {
            type: "p",
            text: "You need a Claude subscription (Pro, Max, Team or Enterprise) or an Anthropic Console account with API billing. Cloud providers (Amazon Bedrock, Google Vertex AI, Microsoft Foundry) are supported for enterprise setups.",
          },
          {
            type: "code",
            lang: "bash",
            title: "macOS / Linux / WSL — native installer (recommended)",
            code: "curl -fsSL https://claude.ai/install.sh | bash",
          },
          {
            type: "code",
            lang: "bash",
            title: "macOS — Homebrew",
            code: "brew install --cask claude-code",
          },
          {
            type: "code",
            lang: "powershell",
            title: "Windows — PowerShell",
            code: "irm https://claude.ai/install.ps1 | iex",
          },
          {
            type: "code",
            lang: "bash",
            title: "Any platform with Node.js 18+ — npm",
            code: "npm install -g @anthropic-ai/claude-code\n# never use sudo with this; fix npm permissions instead",
          },
          {
            type: "code",
            lang: "bash",
            title: "Verify and keep up to date",
            code: "claude --version     # print installed version\nclaude doctor        # diagnose install / config problems\nclaude update        # update (native installs also auto-update)",
          },
          {
            type: "callout",
            variant: "tip",
            title: "Prefer the IDE?",
            text: "Install the **Claude Code extension** for VS Code (or Cursor/Windsurf) or the JetBrains plugin. You get the same agent with inline diffs, file/selection context, and a graphical panel. Everything in this portal applies to both the CLI and the IDE.",
          },
        ],
      },
      {
        id: "launch",
        title: "Launching and connecting to a project",
        blocks: [
          {
            type: "p",
            text: "Claude Code works on **the directory you launch it from**. That folder (and everything below it) is the project it can see. Always `cd` into the repo root first.",
          },
          {
            type: "code",
            lang: "bash",
            title: "Starting a session",
            code: "cd ~/code/taskflow-api\nclaude                         # interactive session\n\n# first run: you'll be asked to log in (browser opens)\n# and to trust the folder",
          },
          {
            type: "table",
            headers: ["Command", "What it does"],
            rows: [
              ["`claude`", "Start an interactive session in the current directory"],
              ["`claude \"explain this repo\"`", "Start a session with an initial prompt"],
              ["`claude -p \"query\"`", "Print mode: run once non-interactively, print result, exit (great for scripts/CI)"],
              ["`cat log.txt | claude -p \"why did this fail?\"`", "Pipe content in as context"],
              ["`claude -c`", "Continue the most recent conversation in this directory"],
              ["`claude -r`", "Resume: pick a previous conversation from a list"],
              ["`claude --model <name>`", "Choose a model for the session (e.g. `opus`, `sonnet`)"],
              ["`claude --permission-mode plan`", "Start in plan mode (read-only analysis, no edits)"],
              ["`claude --add-dir ../shared-lib`", "Give access to an additional directory"],
            ],
          },
        ],
      },
      {
        id: "tools",
        title: "How Claude Code explores a repository",
        blocks: [
          {
            type: "p",
            text: "Claude Code does **not** upload or index your whole repo up front. It explores on demand, like a developer would: list the tree, read the README and package manifest, grep for symbols, open the files that matter. You will see every tool call in the transcript.",
          },
          {
            type: "table",
            headers: ["Tool", "Purpose", "Needs permission?"],
            rows: [
              ["Read", "Read a file (also images and PDFs)", "No"],
              ["Glob", "Find files by pattern, e.g. `src/**/*.ts`", "No"],
              ["Grep", "Search file contents (ripgrep)", "No"],
              ["Edit / Write", "Change or create files", "Yes (unless auto-accept)"],
              ["Bash", "Run shell commands — tests, builds, git, curl…", "Yes (per command / pattern)"],
              ["WebFetch / WebSearch", "Read docs and pages from the web", "Yes"],
              ["Task / Agent", "Spawn a sub-agent with its own context for a side task", "No"],
              ["TodoWrite", "Maintain a visible task checklist for multi-step work", "No"],
              ["MCP tools", "Anything an MCP server exposes (GitHub, DB, Jira…)", "Yes"],
            ],
          },
          {
            type: "flow",
            title: "Typical exploration sequence for “explain this app”",
            steps: [
              "List root files",
              "Read README / package.json",
              "Find entry point",
              "Follow imports",
              "Grep key symbols",
              "Summarise architecture",
            ],
          },
        ],
      },
      {
        id: "interaction",
        title: "Talking to Claude Code: the essentials",
        blocks: [
          {
            type: "table",
            headers: ["Input", "Meaning", "Example"],
            rows: [
              ["Plain text", "A request or question", "`where do we validate emails?`"],
              ["`@path`", "Reference a file or folder — its contents are pulled into context", "`explain @src/services/authService.js`"],
              ["`!command`", "Bash mode: run a shell command directly and add the output to context", "`!npm test`"],
              ["`/command`", "Slash command (built-in or custom)", "`/init`, `/clear`, `/compact`"],
              ["`Esc`", "Interrupt Claude mid-action (context is kept)", "—"],
              ["`Esc` `Esc`", "Rewind: jump back to an earlier message / checkpoint", "—"],
              ["`Shift+Tab`", "Cycle permission modes: normal → auto-accept edits → plan mode", "—"],
              ["`Ctrl+C` / `Ctrl+D`", "Cancel current input / exit", "—"],
              ["Drag & drop / paste image", "Add a screenshot or diagram as context", "UI bug screenshots"],
            ],
          },
          {
            type: "h3",
            text: "Core slash commands",
          },
          {
            type: "table",
            headers: ["Command", "Use it to…"],
            rows: [
              ["`/help`", "List all available commands (the authoritative list for your version)"],
              ["`/init`", "Generate a starter CLAUDE.md by analysing the repo"],
              ["`/memory`", "Open and edit your CLAUDE.md memory files"],
              ["`/clear`", "Wipe the conversation — start a fresh task with a clean context"],
              ["`/compact [focus]`", "Summarise the conversation to free context, optionally keeping a focus"],
              ["`/context`", "Visualise what is using your context window"],
              ["`/model`", "Switch models mid-session"],
              ["`/permissions`", "View and edit allow/deny rules"],
              ["`/rewind`", "Restore code and/or conversation to an earlier checkpoint"],
              ["`/resume`", "Pick up a previous session"],
              ["`/review`", "Ask for a code review of changes / a PR"],
              ["`/mcp`", "Manage MCP servers and authenticate"],
              ["`/agents`", "Create and manage sub-agents"],
              ["`/cost` · `/status`", "Token usage for the session · account, model and config status"],
              ["`/config`", "Settings UI (theme, editor mode, etc.)"],
              ["`/doctor`", "Diagnose installation problems"],
            ],
          },
          {
            type: "callout",
            variant: "note",
            title: "Commands evolve fast",
            text: "Claude Code ships updates frequently. Treat these tables as a map, and run `/help` in your own install for the current, exact list.",
          },
        ],
      },
      {
        id: "permissions",
        title: "Permissions: you stay in control",
        blocks: [
          {
            type: "p",
            text: "By default Claude Code can read freely but **asks before** it edits files or runs commands. When it asks, you can approve once, approve and remember (for that command pattern), or reject and tell it what to do instead.",
          },
          {
            type: "table",
            headers: ["Mode", "How to enter", "Behaviour"],
            rows: [
              ["Default", "Start normally", "Prompts for edits and commands"],
              ["Accept edits", "`Shift+Tab` once", "File edits auto-approved; commands still prompt"],
              ["Plan mode", "`Shift+Tab` twice, or `--permission-mode plan`", "Read-only: researches and proposes a plan; no edits until you approve"],
              ["Bypass", "`--dangerously-skip-permissions`", "No prompts at all. Only inside an isolated container/VM you can throw away"],
            ],
          },
          {
            type: "code",
            lang: "json",
            title: ".claude/settings.json — pre-approve safe commands, block secrets",
            code: '{\n  "permissions": {\n    "allow": [\n      "Bash(npm test:*)",\n      "Bash(npm run lint)",\n      "Bash(git status)",\n      "Bash(git diff:*)"\n    ],\n    "deny": [\n      "Read(./.env)",\n      "Read(./.env.*)",\n      "Read(./secrets/**)",\n      "Bash(rm -rf:*)",\n      "Bash(git push:*)"\n    ]\n  }\n}',
          },
          {
            type: "callout",
            variant: "warning",
            title: "Safety rule of thumb",
            text: "Never run with skipped permissions on your real machine. Deny-list secrets (`.env`, keys) explicitly. Read what a `Bash` command does before you approve it — especially anything touching git remotes, databases, cloud CLIs or `rm`.",
          },
        ],
      },
      {
        id: "demo",
        title: "Live demo: understand an unfamiliar codebase",
        blocks: [
          {
            type: "prompt",
            label: "Session demo prompt",
            text: "Explain this entire application to me. Identify the main components, entry points, dependencies and data flow.",
            why: "Asks for structure (components), where execution starts (entry points), what it relies on (dependencies) and how a request moves (data flow) — the four things you need to be productive in a new codebase.",
          },
          {
            type: "p",
            text: "Good follow-up questions to try on any repo:",
          },
          {
            type: "list",
            items: [
              "“Trace what happens, file by file, when a client calls `POST /auth/login`.”",
              "“Draw an ASCII diagram of the modules and their dependencies.”",
              "“Which parts of this code have no test coverage?”",
              "“What would break if I renamed the `db` export?”",
              "“What are the three riskiest areas of this codebase and why?”",
              "“How do I run this locally? What environment variables does it need?”",
              "“Look at git log for the last 20 commits and summarise what the team has been working on.”",
            ],
          },
          {
            type: "callout",
            variant: "pro",
            title: "Pro tip: ask questions before asking for code",
            text: "Spending the first few prompts on questions is not wasted time. Everything Claude reads becomes context that makes its later edits better aligned with your codebase.",
          },
        ],
      },
    ],
    takeaways: [
      "Launch `claude` from the repo root — that directory is its world.",
      "It explores on demand with Read, Glob, Grep and Bash; you see every step.",
      "Use `@file` to point, `!cmd` to run, `/clear` between tasks.",
      "Permissions are your safety net: pre-approve safe commands, deny secrets.",
    ],
    quiz: [
      {
        q: "Which key combination cycles between normal mode, auto-accept edits and plan mode?",
        options: ["Ctrl+P", "Shift+Tab", "Esc Esc", "Alt+M"],
        answer: 1,
        explain: "Shift+Tab cycles permission modes. Esc interrupts; Esc Esc rewinds.",
      },
      {
        q: "You are about to start an unrelated task in the same session. What should you usually do first?",
        options: ["/compact", "/clear", "/init", "Restart your computer"],
        answer: 1,
        explain: "/clear resets the context so stale information from the previous task doesn't distract Claude. /compact is for continuing the same task with less context.",
      },
      {
        q: "How does Claude Code learn about your repository?",
        options: [
          "It uploads and indexes the whole repo before starting",
          "It explores on demand using tools like Read, Glob, Grep and Bash",
          "It only sees files you paste into the prompt",
          "It reads your GitHub account",
        ],
        answer: 1,
        explain: "Agentic search: it navigates the repo the way a developer would, reading only what it needs.",
      },
    ],
  },

  // ───────────────────────────────────────────── 2
  {
    slug: "pair-programming",
    number: 2,
    title: "Claude Code as a Pair Programmer",
    tagline: "Context-aware development: Ask → Analyze → Implement → Test → Review.",
    time: "12–20 min",
    minutes: 8,
    mode: "Live Coding",
    icon: "🤝",
    objectives: [
      "Use Claude Code for everyday tasks: generate, modify, refactor, explain",
      "Find bugs and add error handling with context from the real codebase",
      "Generate meaningful tests that follow existing conventions",
      "Apply the Ask → Analyze → Implement → Test → Review loop",
      "Write prompts that are specific, contextual and verifiable",
    ],
    sections: [
      {
        id: "workflow",
        title: "The pair-programming workflow",
        blocks: [
          {
            type: "flow",
            steps: ["Ask", "Analyze", "Implement", "Test", "Review"],
          },
          {
            type: "table",
            headers: ["Stage", "What you do", "What Claude does"],
            rows: [
              ["Ask", "State the goal and constraints", "Clarifies, asks questions if ambiguous"],
              ["Analyze", "Point at relevant files, or let it search", "Reads code, explains current behaviour, proposes approach"],
              ["Implement", "Approve the approach", "Edits files, following existing patterns"],
              ["Test", "Tell it how to verify", "Writes/updates tests, runs them, fixes failures"],
              ["Review", "Read the diff, ask “why?”", "Explains changes, flags risks, refines"],
            ],
          },
        ],
      },
      {
        id: "everyday-tasks",
        title: "Everyday tasks — with prompts that work",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Generate a new function",
                body: "Name the location, the contract, and the conventions to follow.",
                prompt: "Add a `isStrongPassword(password)` helper in src/utils/validate.js. Rules: min 10 chars, at least one letter and one digit. Follow the style of the existing helpers in that file and add unit tests.",
              },
              {
                title: "Modify existing code",
                body: "Describe the behaviour change, not the keystrokes.",
                prompt: "Make GET /tasks accept an optional `done=true|false` query parameter that filters the results. Keep pagination working.",
              },
              {
                title: "Refactor",
                body: "State the target design and the invariant (behaviour must not change).",
                prompt: "Refactor src/services/authService.js so the `httpError` helper is shared with taskService via a new src/utils/errors.js module. Behaviour must not change — run the tests before and after.",
              },
              {
                title: "Explain legacy code",
                body: "Ask for the why, the edge cases, and the risks.",
                prompt: "Explain src/router.js line by line. What edge cases does it not handle? What would happen with a trailing slash or a URL-encoded segment?",
              },
              {
                title: "Find bugs",
                body: "Ask for a ranked list with evidence before any fix.",
                prompt: "Review src/services/taskService.js for bugs. For each one give the line, a concrete input that triggers it, and the expected vs actual result. Don't fix anything yet.",
              },
              {
                title: "Add error handling",
                body: "Specify how errors should surface (status codes, messages, logging).",
                prompt: "src/app.js crashes with a 500 on malformed JSON bodies. Make invalid JSON return 400 with `{ error: \"Invalid JSON body\" }` and add a test for it.",
              },
              {
                title: "Generate tests",
                body: "Point at existing tests so new ones match the framework and style.",
                prompt: "Write tests for completeTask in the style of test/tasks.test.js. Cover: success, unknown id (404), and completing a task owned by another user.",
              },
              {
                title: "Improve an implementation",
                body: "Name the quality attribute you care about.",
                prompt: "listTasks filters the whole task array on every request. Suggest two ways to make it scale better, explain the trade-offs, then implement the simpler one.",
              },
            ],
          },
        ],
      },
      {
        id: "auth-demo",
        title: "Live example: review the authentication logic",
        blocks: [
          {
            type: "prompt",
            label: "Step 1 — analyse",
            text: "Find the authentication logic in this application. Explain how it works. Identify potential problems and suggest improvements.",
          },
          {
            type: "p",
            text: "On the TaskFlow demo repo, a good analysis should surface issues like these (try to spot them yourself first!):",
          },
          {
            type: "table",
            headers: ["Issue", "Where", "Why it matters"],
            rows: [
              ["Unsalted SHA-256 password hashing", "`src/utils/crypto.js`", "Fast hashes are brute-forceable; identical passwords share hashes. Use scrypt/bcrypt/argon2 with a salt."],
              ["Forgeable tokens", "`issueToken` / `authenticate`", "Token is just base64(userId:time). Anyone can mint a token for user 1. Needs a signature (HMAC/JWT) and verification."],
              ["Tokens never expire", "`authenticate`", "A leaked token is valid forever. Add an expiry and check it."],
              ["User enumeration", "`login` returns 404 vs 401", "Different errors reveal which emails are registered. Return one generic 401."],
              ["Missing authorization check", "`completeTask`", "Any user can complete any task by id (IDOR). Check `task.ownerId`."],
              ["No timing-safe compare", "`verifyPassword`", "Use `crypto.timingSafeEqual` for secret comparisons."],
            ],
          },
          {
            type: "prompt",
            label: "Step 2 — implement",
            text: "Implement the improvement and add appropriate tests.",
            why: "Because step 1 put the analysis into context, this short follow-up is enough. Claude knows exactly which improvement and which test style you mean.",
          },
          {
            type: "callout",
            variant: "tip",
            title: "Scope big changes",
            text: "If the analysis lists six problems, don't ask for all six at once. Ask: “Fix the token forgery and expiry first. Keep the API contract unchanged. Add tests that prove a forged token is rejected.” Small, verifiable steps beat one giant diff.",
          },
        ],
      },
      {
        id: "prompting",
        title: "Prompting principles that actually matter",
        blocks: [
          {
            type: "compare",
            left: {
              title: "Vague",
              tone: "bad",
              items: [
                "“fix the bug”",
                "“add tests”",
                "“make it better”",
                "“write a login page”",
              ],
            },
            right: {
              title: "Specific & verifiable",
              tone: "good",
              items: [
                "“GET /tasks?page=1 returns the 2nd page. Find why, fix it, prove it with a test.”",
                "“Add tests for completeTask covering 404 and wrong-owner cases, in the style of test/tasks.test.js.”",
                "“Reduce listTasks from O(n) per request; keep the response shape identical.”",
                "“Add a login form following the patterns in src/components/forms; reuse our useForm hook.”",
              ],
            },
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Be specific about the goal** — the what and the why, not just the how.",
              "**Point at context** — `@files`, existing examples, docs, screenshots, error output.",
              "**State constraints** — don't change the API, no new dependencies, keep it under N lines.",
              "**Define done** — “all tests pass”, “lint clean”, “curl returns 200”.",
              "**Ask for a plan first** on anything non-trivial — “think hard and propose a plan; don't code yet.”",
              "**Course-correct early** — press `Esc` the moment it heads in the wrong direction.",
            ],
          },
          {
            type: "callout",
            variant: "pro",
            title: "Extended thinking",
            text: "For tricky problems, ask Claude to think: words like “think”, “think hard” or “ultrathink” give it more reasoning budget before acting. Use it for design decisions and gnarly bugs, not for renaming a variable.",
          },
        ],
      },
    ],
    takeaways: [
      "Pair-programming loop: Ask → Analyze → Implement → Test → Review.",
      "Analysis first, code second — the analysis becomes context for the fix.",
      "Specific + contextual + verifiable prompts beat clever prompts.",
      "Keep changes small and reviewable; interrupt early with Esc.",
    ],
    quiz: [
      {
        q: "Why ask Claude to analyse and explain before asking it to implement?",
        options: [
          "It's cheaper",
          "The analysis loads relevant code into context, so the follow-up implementation is better aligned",
          "Claude can't write code without an explanation first",
          "It's required by the permission system",
        ],
        answer: 1,
        explain: "Everything Claude reads and reasons about stays in context, so the later edit is informed by the analysis.",
      },
      {
        q: "Which prompt is the most effective?",
        options: [
          "“add tests”",
          "“write good tests please”",
          "“Add tests for completeTask covering success, 404 and wrong owner, in the style of test/tasks.test.js, then run npm test”",
          "“TESTS!!!”",
        ],
        answer: 2,
        explain: "It names the target, the cases, the convention to follow and how to verify.",
      },
    ],
  },

  // ───────────────────────────────────────────── 3
  {
    slug: "agentic-development",
    number: 3,
    title: "Agentic Software Development",
    tagline: "Give a goal, not a snippet request. Let the agent plan, build, test and iterate.",
    time: "20–30 min",
    minutes: 10,
    mode: "Major Demo",
    icon: "🤖",
    objectives: [
      "Contrast traditional AI coding with agentic coding",
      "Use plan mode to get an implementation plan before any edits",
      "Drive a multi-file feature from requirement to passing tests",
      "Phrase requirements so the agent follows existing architecture",
      "Manage context: /clear, /compact, sub-agents and checkpoints",
    ],
    sections: [
      {
        id: "traditional-vs-agentic",
        title: "Traditional vs agentic coding",
        blocks: [
          {
            type: "p",
            text: "In traditional AI coding, the **developer** is the loop: prompt, copy, integrate, test, paste the error back, repeat. In agentic coding, the **agent** runs the loop and the developer sets the goal and approves the outcome.",
          },
          {
            type: "flow",
            title: "Traditional AI coding",
            vertical: true,
            steps: ["Developer", "Prompt", "Code snippet", "Developer integrates", "Developer tests"],
          },
          {
            type: "flow",
            title: "Agentic coding",
            vertical: true,
            steps: [
              "Developer: task / goal",
              "Claude Code",
              "Understand repository",
              "Plan",
              "Modify multiple files",
              "Run commands",
              "Run tests",
              "Fix problems",
              "Review changes",
              "Developer approval",
            ],
          },
        ],
      },
      {
        id: "explore-plan-code-commit",
        title: "The canonical workflow: Explore → Plan → Code → Commit",
        blocks: [
          {
            type: "steps",
            items: [
              {
                title: "Explore",
                body: "Ask Claude to read the relevant parts of the code and explicitly tell it not to write code yet. For big repos, ask it to use sub-agents to investigate in parallel.",
                prompt: "Read the routes, services and db layer. Explain how a new resource would be added end-to-end. Don't write any code yet.",
              },
              {
                title: "Plan (use plan mode)",
                body: "Press Shift+Tab until you see “plan mode”. Claude can only read and research; it ends with a plan you approve, edit or reject.",
                prompt: "Think hard and create an implementation plan for a user profile feature. List files to change, new files, test cases, and risks.",
              },
              {
                title: "Code",
                body: "Approve the plan. Claude implements it, typically tracking progress with a visible todo list, running tests as it goes.",
                prompt: "Implement the plan. Run npm test after each step and fix any failures before moving on.",
              },
              {
                title: "Commit",
                body: "Have Claude review its own diff, then commit (and optionally open a PR).",
                prompt: "Review the full diff for regressions, then commit with a conventional commit message.",
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Save the plan",
            text: "For larger features ask Claude to write the plan to a file (e.g. `docs/plans/profile.md`) or a GitHub issue. If the implementation goes sideways you can `/clear` and restart from the plan instead of from scratch.",
          },
        ],
      },
      {
        id: "demo",
        title: "Demo: add a user profile feature",
        blocks: [
          {
            type: "compare",
            left: {
              title: "Don’t ask",
              tone: "bad",
              items: ["“Write me a user profile page.”"],
            },
            right: {
              title: "Instead ask",
              tone: "good",
              items: [
                "“Understand the existing application architecture and implement a user profile feature following the patterns already used in this codebase.”",
              ],
            },
          },
          {
            type: "p",
            text: "The first prompt produces generic code that ignores your conventions. The second makes Claude learn the architecture first — routes → services → db, error shape, test helpers — and then extend it consistently. **That is the difference between code generation and agentic development.**",
          },
          {
            type: "prompt",
            label: "Full requirement for the TaskFlow demo",
            text: "Understand the existing application architecture and implement a user profile feature following the patterns already used in this codebase.\n\nRequirements:\n- GET /me/profile returns the current user's profile (name, bio, avatarUrl, timezone)\n- PATCH /me/profile updates any of those fields\n- Validate: name 1–80 chars, bio max 280 chars, avatarUrl must be https, timezone must be a valid IANA zone\n- Never expose passwordHash\n- Add tests in the existing style; all tests must pass\n\nStart in plan mode and show me the plan before editing.",
          },
          {
            type: "p",
            text: "What you should see Claude Code do:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Understand the architecture** — read `app.js`, `router.js`, routes, services, `db.js`, test helpers.",
              "**Identify relevant files** — `routes/auth.js` or a new `routes/profile.js`, a new `services/profileService.js`, `db.js` for new fields, `utils/validate.js`.",
              "**Create a plan** — presented for approval in plan mode.",
              "**Modify multiple files** — service, route, registration in `app.js`, validation helpers.",
              "**Add the functionality** — following the `{ status, json }` handler contract and `err.status` error pattern.",
              "**Create/update tests** — `test/profile.test.js` using `startTestServer()`.",
              "**Run tests** — `npm test`.",
              "**Fix issues** — read failures, adjust, re-run.",
              "**Summarise changes** — files touched, design decisions, follow-ups.",
            ],
          },
        ],
      },
      {
        id: "context-management",
        title: "Managing context like a pro",
        blocks: [
          {
            type: "p",
            text: "Claude's **context window** is everything it can “see” right now: your messages, files it read, command output, CLAUDE.md. It is large but finite, and quality drops when it fills with irrelevant material. Managing it is a core skill.",
          },
          {
            type: "table",
            headers: ["Technique", "When to use"],
            rows: [
              ["`/clear`", "Between unrelated tasks. The most underused command."],
              ["`/compact focus on the profile feature`", "Long task, context getting full, you want to keep going."],
              ["`/context`", "See what's consuming context (files, tools, MCP servers)."],
              ["Sub-agents", "“Use a sub-agent to find every place we call fetch()”. The sub-agent explores in its own context and returns only a summary."],
              ["Plans/notes in files", "Persist decisions to a markdown file so they survive /clear."],
              ["`Esc Esc` / `/rewind`", "Go back to a checkpoint — undo both conversation and code edits Claude made."],
            ],
          },
          {
            type: "callout",
            variant: "warning",
            title: "Checkpoints are not git",
            text: "Checkpoints track edits Claude made through its file tools within a session. They do not capture changes made by shell commands (e.g. a migration script) or by you. Commit early and often; git is your real safety net.",
          },
        ],
      },
      {
        id: "parallel",
        title: "Scaling up: parallel agents",
        blocks: [
          {
            type: "p",
            text: "Once you trust the workflow, you can run several Claude Code sessions at once — each in its own **git worktree** so they don't step on each other.",
          },
          {
            type: "code",
            lang: "bash",
            title: "Parallel sessions with git worktrees",
            code: "git worktree add ../taskflow-profile -b feature/profile\ngit worktree add ../taskflow-bugfix  -b fix/pagination\n\n# terminal 1\ncd ../taskflow-profile && claude\n# terminal 2\ncd ../taskflow-bugfix && claude\n\n# when done\ngit worktree remove ../taskflow-profile",
          },
          {
            type: "list",
            items: [
              "**Writer / reviewer** — one session implements, a fresh session (clean context) reviews the diff.",
              "**Test-first split** — one session writes failing tests, another makes them pass.",
              "**Fan-out** — independent tickets in separate worktrees, reviewed as separate PRs.",
            ],
          },
        ],
      },
    ],
    takeaways: [
      "Agentic = the agent runs the loop; you own the goal and the approval.",
      "Explore → Plan → Code → Commit. Use plan mode for anything non-trivial.",
      "Ask it to follow existing patterns — that is what makes output mergeable.",
      "Manage context deliberately: /clear, /compact, sub-agents, saved plans.",
    ],
    quiz: [
      {
        q: "What does plan mode do?",
        options: [
          "Makes Claude faster",
          "Lets Claude read and research but not edit, ending with a plan for you to approve",
          "Schedules a task for later",
          "Disables all tools",
        ],
        answer: 1,
        explain: "Plan mode is read-only. It's ideal for getting a reviewed plan before any changes happen.",
      },
      {
        q: "Why is “implement a profile feature following the patterns already used in this codebase” better than “write a profile page”?",
        options: [
          "It's longer",
          "It forces Claude to study the architecture first, so the result matches your conventions",
          "It uses fewer tokens",
          "It avoids writing tests",
        ],
        answer: 1,
        explain: "It changes the task from generating generic code to extending this specific system consistently.",
      },
      {
        q: "Which does NOT get restored by Claude Code checkpoints?",
        options: [
          "An edit Claude made with its Edit tool",
          "A file Claude created with Write",
          "A database migration Claude ran via Bash",
          "The conversation history",
        ],
        answer: 2,
        explain: "Side effects of shell commands are outside checkpoint tracking. Use git (and care) for those.",
      },
    ],
  },
];

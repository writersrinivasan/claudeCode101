import type { Lab } from "./types";

export const labs: Lab[] = [
  {
    slug: "setup",
    title: "Lab 0 · Set up your practice environment",
    module: "fundamentals",
    duration: "10 min",
    level: "Beginner",
    summary: "Install Claude Code, download the TaskFlow demo repo and start your first session.",
    goal: "Have Claude Code running inside the TaskFlow repo with git initialised and tests runnable.",
    steps: [
      {
        title: "Install Claude Code",
        body: "Use the native installer (or Homebrew / npm — see Module 1).",
        code: "curl -fsSL https://claude.ai/install.sh | bash\nclaude --version",
      },
      {
        title: "Download the demo repo",
        body: "Download the zip from the button at the top of this page and unzip it. Requires Node.js 20+; there are no dependencies to install.",
        code: "unzip taskflow-api.zip && cd taskflow-api\nnode --version   # v20 or newer",
      },
      {
        title: "Initialise git (your safety net)",
        body: "Commit the starting state so you can always diff and reset.",
        code: "git init && git add -A && git commit -m \"chore: initial import\"",
      },
      {
        title: "Run the tests yourself once",
        body: "You should see 6 passing and 2 failing. That is intentional.",
        code: "npm test",
      },
      {
        title: "Start Claude Code",
        body: "Log in when the browser opens, and trust the folder.",
        code: "claude",
      },
      {
        title: "Say hello",
        body: "Make sure everything works.",
        prompt: "What does this project do? Answer in three sentences.",
      },
    ],
    success: [
      "`claude` starts in the repo and answers questions about it",
      "`npm test` shows 6 pass / 2 fail",
      "`git log` shows your initial commit",
    ],
  },
  {
    slug: "explore",
    title: "Lab 1 · Understand an unfamiliar codebase",
    module: "fundamentals",
    duration: "10 min",
    level: "Beginner",
    summary: "Use Claude Code as an onboarding buddy: architecture, entry points, data flow.",
    goal: "Be able to explain TaskFlow's architecture to a colleague without having read the code yourself.",
    steps: [
      {
        title: "The big picture",
        body: "Watch the tool calls: which files does it read first, and why?",
        prompt: "Explain this entire application to me. Identify the main components, entry points, dependencies and data flow.",
      },
      {
        title: "Trace a request",
        body: "Make it concrete.",
        prompt: "Trace what happens, file by file and function by function, when a client calls POST /tasks with a valid token.",
      },
      {
        title: "Visualise",
        body: "Diagrams help retention.",
        prompt: "Draw an ASCII diagram of the modules and their import dependencies.",
      },
      {
        title: "Use @ and !",
        body: "Practise the two most useful input shortcuts.",
        prompt: "!npm test\n\nThen: explain @src/router.js — what edge cases does it not handle?",
      },
      {
        title: "Risk assessment",
        body: "Get an opinion, not just a description.",
        prompt: "What are the three riskiest areas of this codebase? Rank them and justify.",
      },
    ],
    success: [
      "You can name the layers: app → router → routes → services → db",
      "You know where auth happens and how tokens are checked",
      "You used @file and !command at least once",
    ],
    stretch: ["Ask: “Which functions have no test coverage?” and verify the answer by reading the tests."],
  },
  {
    slug: "auth-review",
    title: "Lab 2 · Pair-program an auth security fix",
    module: "pair-programming",
    duration: "15 min",
    level: "Intermediate",
    summary: "Find the weaknesses in TaskFlow's authentication, then fix the most serious one with tests.",
    goal: "Forged tokens are rejected and tokens expire, proven by new tests, with all old tests still passing.",
    steps: [
      {
        title: "Analyse",
        body: "Don't fix yet; get the full list first.",
        prompt: "Find the authentication logic in this application. Explain how it works. Identify potential problems and suggest improvements. Don't change any code yet.",
      },
      {
        title: "Prove the problem",
        body: "A failing test makes the vulnerability undeniable.",
        prompt: "Write a test showing that a client can forge a valid token for user 1 without knowing their password. Run it — it should currently PASS (demonstrating the vulnerability). Then invert it so it expects 401.",
      },
      {
        title: "Fix with constraints",
        body: "Scope it tightly.",
        prompt: "Fix token forgery and add a 1-hour expiry. Use HMAC-SHA256 from node:crypto with a secret from process.env.TOKEN_SECRET (fallback to a dev default). No new dependencies. Keep the API contract unchanged. Run all tests.",
      },
      {
        title: "Review",
        body: "Read the diff yourself.",
        code: "git diff",
      },
      {
        title: "Next problem",
        body: "Pick another finding from step 1.",
        prompt: "Now fix the authorization bug in completeTask so users can only complete their own tasks. Return 404 (not 403) to avoid leaking existence. Add a test.",
      },
    ],
    success: [
      "A forged token test expects and gets 401",
      "An expired token test expects and gets 401",
      "Users cannot complete other users' tasks",
      "No new dependencies in package.json",
    ],
    stretch: ["Replace SHA-256 password hashing with `crypto.scrypt` plus a per-user salt, and make login return the same error for unknown email and wrong password."],
  },
  {
    slug: "profile-feature",
    title: "Lab 3 · Agentic feature: user profiles",
    module: "agentic-development",
    duration: "20 min",
    level: "Intermediate",
    summary: "Drive a multi-file feature with plan mode, from requirement to green tests.",
    goal: "GET/PATCH /me/profile implemented following existing patterns, fully tested.",
    steps: [
      {
        title: "Branch",
        body: "Isolate the work.",
        code: "git switch -c feature/user-profile",
      },
      {
        title: "Enter plan mode",
        body: "Press Shift+Tab until the status line shows plan mode.",
      },
      {
        title: "Give the requirement",
        body: "Note the emphasis on existing patterns.",
        prompt: "Understand the existing application architecture and implement a user profile feature following the patterns already used in this codebase.\n\n- GET /me/profile returns name, bio, avatarUrl, timezone\n- PATCH /me/profile updates any of those fields\n- Validate: name 1–80 chars, bio ≤ 280 chars, avatarUrl https only, timezone a valid IANA zone\n- Never expose passwordHash\n- Tests in the existing style; all must pass",
      },
      {
        title: "Critique the plan",
        body: "Push back before approving. Try at least one change.",
        prompt: "Put profile logic in its own service file rather than authService. Also, how will you validate IANA timezones without a dependency?",
      },
      {
        title: "Approve and watch",
        body: "Accept the plan. Watch the todo list, file edits and test runs. Approve `npm test` with “don't ask again”.",
      },
      {
        title: "Verify manually",
        body: "Don't just trust the tests — hit the API.",
        code: "npm start\n# in another terminal: log in, then\ncurl -s -X PATCH localhost:3001/me/profile \\\n  -H \"Authorization: Bearer $TOKEN\" -H 'Content-Type: application/json' \\\n  -d '{\"bio\":\"Hello\",\"timezone\":\"Asia/Kolkata\"}'",
      },
    ],
    success: [
      "New service + route files, registered in app.js",
      "Validation errors return 400 with a clear message",
      "New tests use startTestServer() and pass",
      "passwordHash never appears in any response",
    ],
    stretch: ["Open a second terminal, start a fresh `claude`, and ask it to review the branch diff as a senior engineer."],
  },
  {
    slug: "claude-md",
    title: "Lab 4 · Write a CLAUDE.md that changes behaviour",
    module: "claude-md",
    duration: "10 min",
    level: "Beginner",
    summary: "Bootstrap with /init, refine by hand, and observe the difference on the same task.",
    goal: "A committed CLAUDE.md that makes Claude follow TaskFlow's rules without being told.",
    steps: [
      {
        title: "Baseline without memory",
        body: "Note what Claude does by default. Then discard the changes.",
        prompt: "Add a DELETE /tasks/:id endpoint.",
        code: "git stash -u   # or: git checkout . && git clean -fd",
      },
      {
        title: "Generate a draft",
        body: "Let Claude analyse the repo.",
        code: "/init",
      },
      {
        title: "Refine it",
        body: "Open with /memory and add the rules from Module 4 (no deps, thin routes, failing-test-first for bugs, never expose passwordHash, conventional commits). Delete generic filler.",
        code: "/memory",
      },
      {
        title: "Same task, fresh context",
        body: "Clear and repeat.",
        code: "/clear",
        prompt: "Implement a DELETE /tasks/:id endpoint following the project instructions.",
      },
      {
        title: "Compare and commit",
        body: "Did it check ownership? Write tests first? Avoid deps? Commit CLAUDE.md.",
        code: "git add CLAUDE.md && git commit -m \"docs: add CLAUDE.md\"",
      },
    ],
    success: [
      "CLAUDE.md is under ~40 lines and project-specific",
      "Second run follows at least two rules it ignored in the baseline",
    ],
  },
  {
    slug: "debugging",
    title: "Lab 5 · Debug the failing test suite",
    module: "testing-debugging",
    duration: "10 min",
    level: "Beginner",
    summary: "Diagnose → plan → fix the two deliberately broken tests, the disciplined way.",
    goal: "8/8 tests passing, with root causes fixed in source code and no test files modified.",
    steps: [
      {
        title: "Diagnose only",
        body: "Resist the urge to let it fix things.",
        prompt: "Run the test suite and identify the root cause of the failures. Do not modify anything yet.",
      },
      {
        title: "Plan",
        body: "Check the plan fixes causes, not tests.",
        prompt: "Create a plan to fix the failures.",
      },
      {
        title: "Fix",
        body: "Constrain it.",
        prompt: "Implement the fix and run the tests again. Do not modify any file under test/.",
      },
      {
        title: "Verify there's no test tampering",
        body: "The test directory should have no changes.",
        code: "git diff --stat\ngit diff test/   # should be empty",
      },
      {
        title: "Commit",
        body: "Let Claude write the message.",
        prompt: "Review the changes for regressions, then commit with a concise conventional commit message.",
      },
    ],
    success: ["`npm test` → 8 pass, 0 fail", "`git diff HEAD~1 -- test/` is empty", "Commit message explains both root causes"],
    stretch: ["Ask Claude to add a test for page 2 and for `limit` larger than the total."],
  },
  {
    slug: "power-user",
    title: "Lab 6 · Automate: command, sub-agent, hook",
    module: "power-features",
    duration: "20 min",
    level: "Advanced",
    summary: "Create a custom slash command, a security sub-agent and a hook that runs tests when Claude stops.",
    goal: "Repeatable team workflows checked into .claude/.",
    steps: [
      {
        title: "Custom command",
        body: "Create .claude/commands/new-endpoint.md taking $ARGUMENTS as the endpoint description, encoding your TDD workflow. Or ask Claude to write it.",
        prompt: "Create a project slash command /new-endpoint that takes an endpoint description as $ARGUMENTS and implements it TDD-style following CLAUDE.md.",
      },
      {
        title: "Use it",
        body: "Try your new command.",
        code: "/new-endpoint GET /tasks/stats returning counts of done, open and overdue tasks",
      },
      {
        title: "Sub-agent",
        body: "Run /agents and create a read-only security-reviewer (see Module 10 for a template).",
        code: "/agents",
      },
      {
        title: "Hook",
        body: "Run /hooks (or ask Claude) to add a Stop hook that runs `npm test` so you always see the suite status at the end of a turn.",
        prompt: "Add a Stop hook in .claude/settings.json that runs npm test --silent and shows the summary.",
      },
      {
        title: "Headless",
        body: "Use Claude as a CLI tool.",
        code: "claude -p \"list every endpoint with its auth requirement as a markdown table\" > ENDPOINTS.md",
      },
    ],
    success: [
      "`/new-endpoint` appears in the slash command menu",
      "The security-reviewer sub-agent produces findings on your diff",
      "A hook runs automatically",
    ],
  },
];

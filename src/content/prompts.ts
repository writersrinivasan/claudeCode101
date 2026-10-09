import type { PromptEntry } from "./types";

export const promptCategories = [
  "Understand",
  "Plan",
  "Implement",
  "Test & Debug",
  "Review",
  "Git",
  "Refactor",
  "Docs & Ops",
] as const;

export const prompts: PromptEntry[] = [
  // Understand
  { category: "Understand", title: "Explain the whole app", when: "First minutes in any new repo.", prompt: "Explain this entire application to me. Identify the main components, entry points, dependencies and data flow." },
  { category: "Understand", title: "Trace a request", when: "Understanding a specific flow end-to-end.", prompt: "Trace what happens, file by file and function by function, when a client calls <METHOD /path>. Include middleware, validation, data access and error handling." },
  { category: "Understand", title: "Where is X?", when: "Finding the code responsible for a behaviour.", prompt: "Where in this codebase is <behaviour> implemented? List the files and functions involved and how they connect." },
  { category: "Understand", title: "Architecture diagram", when: "Building a mental model or documenting.", prompt: "Draw an ASCII (or Mermaid) diagram of this system's modules and their dependencies. Mark external services." },
  { category: "Understand", title: "Risk map", when: "Prioritising tech debt or review effort.", prompt: "What are the riskiest parts of this codebase (complexity, missing tests, security, coupling)? Rank the top 5 with evidence." },
  { category: "Understand", title: "History of a function", when: "Before changing code you don't understand.", prompt: "Look at the git history of <function/file>. Why was it written this way? Summarise the relevant commits." },
  { category: "Understand", title: "Local setup", when: "Getting a project running.", prompt: "How do I run this project locally? List prerequisites, env vars, setup commands and how to run tests. Then try it and fix anything that fails." },

  // Plan
  { category: "Plan", title: "Plan before coding", when: "Any non-trivial change (use plan mode).", prompt: "Think hard and create an implementation plan for <feature>. List files to change, new files, data model changes, test cases, risks and open questions. Don't write code yet." },
  { category: "Plan", title: "Options with trade-offs", when: "Design decisions.", prompt: "Propose 2–3 approaches for <problem>. For each: summary, pros, cons, effort, risk. Recommend one and explain why." },
  { category: "Plan", title: "Save the plan", when: "Long tasks that may need /clear.", prompt: "Write the plan to docs/plans/<name>.md as a checklist. We'll tick items off as we go." },
  { category: "Plan", title: "Clarify first", when: "Requirements are fuzzy.", prompt: "Before implementing <feature>, ask me up to 5 clarifying questions about requirements and edge cases." },

  // Implement
  { category: "Implement", title: "Follow existing patterns", when: "Adding a feature to an established codebase.", prompt: "Understand the existing application architecture and implement <feature> following the patterns already used in this codebase. Find a similar existing feature and mirror its structure." },
  { category: "Implement", title: "Implement with definition of done", when: "Any implementation task.", prompt: "Implement <change>. Constraints: no new dependencies, don't change public API. Done when: <test command> passes and lint is clean." },
  { category: "Implement", title: "Add error handling", when: "Hardening code paths.", prompt: "Add error handling to <module>. Invalid input → 400 with a clear message; not found → 404; unexpected → 500 logged with context. Add tests for each case." },
  { category: "Implement", title: "Incremental steps", when: "Large features.", prompt: "Implement the plan one step at a time. After each step run the tests and show me a one-line status. Stop and ask if something is unclear." },

  // Test & Debug
  { category: "Test & Debug", title: "Diagnose without fixing", when: "Failing tests or a bug report.", prompt: "Run the test suite and identify the root cause of the failures. Do not modify anything yet." },
  { category: "Test & Debug", title: "Reproduce a bug", when: "Bug report from a user or ticket.", prompt: "Write a failing test that reproduces this bug: <description / steps / expected vs actual>. Confirm it fails for the right reason. Don't fix yet." },
  { category: "Test & Debug", title: "Fix without touching tests", when: "Making tests pass honestly.", prompt: "Fix the root cause so all tests pass. Do not modify, skip or weaken any test. Run the full suite." },
  { category: "Test & Debug", title: "TDD", when: "Building new behaviour with a clear spec.", prompt: "We're doing TDD. Write tests for <behaviour> covering <cases>. Don't implement anything. Run them and confirm they fail." },
  { category: "Test & Debug", title: "Generate tests in house style", when: "Increasing coverage.", prompt: "Write tests for <function/module> in the style of <existing test file>. Cover happy path, edge cases and error cases. Run them." },
  { category: "Test & Debug", title: "Explain a stack trace", when: "A crash you don't understand.", prompt: "Here's a stack trace: <paste>. Find the root cause in our code, explain it, and propose the minimal fix." },
  { category: "Test & Debug", title: "Flaky test hunt", when: "Intermittent CI failures.", prompt: "<test name> is flaky. Run it 20 times, identify the source of non-determinism (time, order, shared state, network) and fix it." },

  // Review
  { category: "Review", title: "Self-review for regressions", when: "Before every commit.", prompt: "Review all the changes you made. Explain the important modifications and identify anything that could introduce a regression." },
  { category: "Review", title: "Senior-engineer review", when: "Fresh session reviewing a branch.", prompt: "Review the diff between this branch and main as a senior engineer. Look for bugs, security issues, missing tests, and unclear code. Rank findings by severity with file:line." },
  { category: "Review", title: "Security review", when: "Changes to auth, input handling, data access.", prompt: "Do a security review of <files/diff>: injection, broken auth, missing authorization checks, sensitive data exposure, insecure crypto. For each finding give an exploit scenario and a fix." },
  { category: "Review", title: "Explain like a PR description", when: "Understanding someone else's change.", prompt: "Explain what PR #<n> / this diff does, why, and what a reviewer should focus on." },

  // Git
  { category: "Git", title: "Commit message", when: "After reviewing changes.", prompt: "Create a concise conventional commit message for these changes. Commit, but do not push." },
  { category: "Git", title: "Open a PR", when: "Feature complete.", prompt: "Push this branch and open a PR with gh. Include summary, motivation, testing done, and risks in the description." },
  { category: "Git", title: "Resolve conflicts", when: "Rebasing a stale branch.", prompt: "Rebase this branch onto main and resolve conflicts, preserving the intent of both sides. Run tests after. Explain each resolution." },
  { category: "Git", title: "Find the breaking commit", when: "Something used to work.", prompt: "<test> used to pass. Use git bisect with the test as the check to find the commit that broke it, and explain what changed." },
  { category: "Git", title: "Summarise recent work", when: "Stand-ups, release notes.", prompt: "Summarise the commits since <tag/date> as release notes grouped by feature, fix and chore." },

  // Refactor
  { category: "Refactor", title: "Safe refactor", when: "Improving structure without behaviour change.", prompt: "Refactor <code> to <target design>. Behaviour must not change. Run tests before and after; if coverage is thin, add characterisation tests first." },
  { category: "Refactor", title: "Rename across repo", when: "Renaming a concept.", prompt: "Rename <old> to <new> everywhere (code, tests, docs, comments). Show me the list of affected files first." },
  { category: "Refactor", title: "Migrate a pattern", when: "Framework / library upgrades.", prompt: "Migrate all usages of <old API> to <new API>. Do one file first, show me, then do the rest. Run tests after each batch." },
  { category: "Refactor", title: "Simplify", when: "Code that grew organically.", prompt: "Simplify <function>: reduce nesting, remove duplication, improve names. Keep behaviour identical and explain each change." },

  // Docs & Ops
  { category: "Docs & Ops", title: "Bootstrap CLAUDE.md", when: "New project or new to Claude Code.", prompt: "/init — then: Trim this CLAUDE.md to only project-specific, actionable information. Add our test, lint and build commands." },
  { category: "Docs & Ops", title: "Remember a rule", when: "You corrected Claude twice.", prompt: "Add this rule to CLAUDE.md: <rule>." },
  { category: "Docs & Ops", title: "Document an API", when: "Endpoints lack docs.", prompt: "Generate an OpenAPI 3.1 spec for all endpoints in this app by reading the routes and services. Validate it lists auth requirements." },
  { category: "Docs & Ops", title: "Fix CI", when: "Red pipeline.", prompt: "CI is failing. Read the logs (gh run view --log-failed), find the root cause, fix it locally and confirm with the same command CI runs." },
  { category: "Docs & Ops", title: "Write a script", when: "Repetitive manual checks.", prompt: "Write scripts/smoke.sh that starts the server, logs in, creates a task, lists tasks and exits non-zero on any failure. Then add it to CLAUDE.md." },
];

# AI-assisted development workflow

Keep project knowledge in this repository, not only in a long-running chat. AI tools should read `AGENTS.md` and the architecture guide, then inspect the code that owns the requested behavior. Avoid uploading the entire project as a ZIP when the tool can work in the repository directly.

## Feature request prompt

```text
Read AGENTS.md and docs/architecture.md. Inspect only the files relevant to this request.

User outcome:
[What should a person be able to do?]

Acceptance criteria:
- [Observable result]
- [Important edge case]

First summarize the current behavior and propose the smallest safe change. Then implement it, keep unrelated behavior unchanged, and report the files changed and checks run.
```

## Bug report prompt

```text
Read AGENTS.md. Reproduce or trace this bug before editing.

Steps:
1. [Action]
2. [Action]

Expected: [Expected behavior]
Actual: [What happens instead]
Error or screenshot: [Relevant detail, with private data removed]

Identify the cause, make a focused fix, and explain how you checked the regression.
```

## UI change prompt

```text
Read AGENTS.md and docs/architecture.md. Change the [screen/component] to achieve [visual/user outcome]. Keep note behavior intact. Use the shared MUI theme and design tokens for colors, type, and common dimensions. List the affected files before editing and summarize the visual and behavior changes afterward.
```

## Session handoff

When work is paused, leave a short note in the issue or chat with the goal, current state, files to inspect next, decisions, open questions, and checks already run. Put durable architecture or product decisions in `docs/`; do not copy temporary chat history into project documentation.

## Context hygiene

- Include the user outcome, acceptance criteria, relevant file paths, and reproduction details; avoid pasting unrelated source files.
- Remove credentials and real personal note contents from prompts and examples.
- Ask the AI to inspect before editing when it does not know how a path works.
- Split large changes into reviewable steps. Review the diff and check outputs before accepting it.
- Update this repository's docs when durable behavior or architecture changes, and keep them concise.

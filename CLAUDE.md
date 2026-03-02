# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cleo is an AI assistant project currently in early development. The stack and architecture will evolve — update this file as the project grows.

## Git & GitHub Workflow

**Every session must commit and push work to GitHub. No work should be left uncommitted.**

- **Remote**: https://github.com/hruaia21hrahsel/Cleo (`master` branch)
- After completing any meaningful unit of work — a new file, a feature, a fix, a config change — commit and push immediately. Do not batch unrelated changes into one commit.
- Before ending a session or switching tasks, ensure all work is committed and pushed so nothing is ever lost.
- Write clean, descriptive commit messages that explain *why*, not just *what*. Use the imperative mood (e.g. "Add login route" not "Added login route").
- Include the Co-Authored-By trailer on every commit:
  ```
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
- Prefer small, focused commits over large catch-all ones — each commit should represent one logical change.
- Always run `git push` after committing. A local-only commit is not a safe backup.

## Repository Structure

Currently minimal — will be updated as the project takes shape:

```
Cleo/
├── CLAUDE.md        # This file
└── .gitignore       # Covers .env, node_modules, build dirs, .claude/settings.local.json
```

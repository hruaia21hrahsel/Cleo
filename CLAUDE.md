# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Cleo is an AI assistant project currently in early development. The stack and architecture will evolve — update this file as the project grows.

## Git & GitHub Workflow

This project uses Git with all changes committed and pushed to GitHub after meaningful work.

- **Remote**: https://github.com/hruaia21hrahsel/Cleo (`master` branch)
- **Always** commit completed work and push to GitHub — this is the primary backup and versioning mechanism
- Write clean, descriptive commit messages that explain *why*, not just *what*
- Include the Co-Authored-By trailer on all commits:
  ```
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```
- Prefer small, focused commits over large catch-all ones

## Repository Structure

Currently minimal — will be updated as the project takes shape:

```
Cleo/
├── CLAUDE.md        # This file
└── .gitignore       # Covers .env, node_modules, build dirs, .claude/settings.local.json
```

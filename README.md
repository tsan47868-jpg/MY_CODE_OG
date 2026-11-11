# MY_CODE_OG

MY_CODE_OG is a local-first CLI coding assistant for reviewing code, explaining mistakes, and helping you fix problems without needing an account or a remote dashboard.

## What it does

- Reviews a file or folder for bugs and code quality issues
- Answers coding questions in plain English
- Proposes code changes and asks for approval before writing or deleting each file
- Runs terminal commands only after showing them and getting your approval
- Runs in interactive chat mode for ongoing help
- Saves conversation history on the user's device in a local JSON file
- Uses your own OpenRouter API key from `.env.local` or the environment
- Works without sign-up or sign-in

## Project structure

```text
cli-first-app/
├── README.md
├── .env.local
├── package.json
├── .gitignore
├── src/
│   └── index.js
├── test/
│   └── cli.test.js
└── .my_code_og_history.json   # created automatically when you use the app
```

## Setup

1. Open the project folder.
2. Make sure `.env.local` contains your OpenRouter key:

```env
OPEN_ROUTER=your_api_key_here
```

3. Start an interactive coding session:

```bash
npm start
```

The CLI starts with a large pixel/block-letter `MY_CODE_OG` banner inspired by the screenshot.
The current app version is `0.0.1` and appears next to the CLI name at startup.
Interactive prompts use a matching framed style; approval prompts show pixel-edged buttons with white backgrounds and dark `[ ALLOW ]` / `[ DENY ]` labels. Plain-text choices are used when output is redirected or `NO_COLOR` is set.

You can also use `npm run dev` or `npm run chat` to start the interactive chat. To see the other commands, run:

```bash
npm run help
npm run
```

Run the CLI checks with:

```powershell
npm test
```

## Ask the assistant to change files

Use the `edit` command to ask MY_CODE_OG to implement a task:

```powershell
node src/index.js edit "Add input validation to the signup form"
```

Or use the npm shortcut:

```powershell
npm run edit -- "Add input validation to the signup form"
```

The assistant prepares a plan and previews each proposed file operation. For every file, type `allow` to apply that one write, update, or deletion. Any other response denies that operation and leaves the file unchanged. When you allow a new file in a new folder, the required folders are created as part of that approved operation. Directories cannot be deleted. Proposed paths must stay inside the current project, and the assistant does not run shell commands.

Review the preview carefully before allowing a change. Code and project files used as context are sent to OpenRouter for processing; `.env*` files and local history are excluded from that context.

## Run a terminal command

From the project folder, you can ask MY_CODE_OG to run a command:

```powershell
node src/index.js run "npm test"
```

Or, while in chat, type:

```text
/run npm test
```

MY_CODE_OG displays the exact command and working directory first. In terminals with SGR mouse support, click the `[ ALLOW ]` or `[ DENY ]` pixel button; you can also type `allow` or `deny`. Every command requires its own approval; normal chat responses never execute commands. Commands run in the directory where MY_CODE_OG was started, do not receive interactive keyboard input, and are stopped after two minutes.

## Available commands

The commands below can be run with `node src/index.js ...`. The matching npm shortcuts are shown where available.

### 1. Review a file or folder

```bash
npm run review -- ./README.md
```

```bash
npm run review -- ./src
```

You can also run `node src/index.js review ./src`.

This reads the target file or directory, sends the relevant text to OpenRouter, and prints a review with:
- quick assessment
- main issues found
- recommended fixes
- next steps

### 2. Ask a direct question

```bash
node src/index.js ask "Why is this function failing?"
```

This is useful for quick debugging questions or asking for a refactor suggestion without reviewing an entire file.

### 3. Propose and approve file changes

```bash
node src/index.js edit "Fix the error handling in the API client"
```

Each proposed file change is individually gated by an explicit `allow` response; click the pixel `[ ALLOW ]` or `[ DENY ]` button in a mouse-enabled terminal, or type `allow`/`deny`. Pressing Enter without typing `allow` skips the change. New files can be created in existing or new subfolders.

### 4. Start interactive chat

```bash
npm run chat
```

Then type questions like:

```text
> Explain this bug in simple terms.
> Show me how to fix this function.
> Review this file for security issues.
> /edit Create a file named notes.txt with a short project summary
> /run npm test
> exit
```

Use `/edit <task>` in chat whenever you want the assistant to propose file creation, updates, or deletion. It shows a preview and asks `allow` or `deny` before each operation. Use `/run <command>` to run a terminal command after reviewing and allowing it.

### 5. View local history

```bash
node src/index.js history
```

This prints the device-local history saved in `.my_code_og_history.json`.

### 6. Show help

```bash
node src/index.js help
```

## Example workflow

```bash
cd C:\Users\Admin\OneDrive\Desktop\cli-first-app
node src/index.js review ./src
node src/index.js ask "Find the bug in this function and suggest a fix"
node src/index.js chat
```

## How the app works

- Reads your project files locally
- Sends the selected code to OpenRouter for analysis
- Returns a code review or answer in the terminal
- Stores a copy of the interaction in a local file on the current device
- Keeps everything private and local without requiring a login system

## Notes about privacy

MY_CODE_OG is intentionally local-first:

- no sign-up required
- no sign-in required
- history stays on the device
- the user controls the API key

## Common usage patterns

Use the app when you want to:

- review a project before shipping
- debug a failing function
- ask for a clean refactor suggestion
- get quick issue summaries from code files
- continue a coding conversation in the terminal

## Quick start

```bash
cd path/to/cli-first-app
node src/index.js review ./README.md
```

This is the fastest way to test the app immediately.

## Summary

MY_CODE_OG is a lightweight local CLI assistant that helps developers review code, fix issues, and keep work moving without a login flow or cloud account. It is designed for fast terminal use and stores history locally on the user's machine.

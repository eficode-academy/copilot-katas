# GitHub Copilot Katas

<p align="center">
  <img src="https://github.githubassets.com/images/modules/site/copilot/copilot.png" alt="GitHub Copilot" width="200"/>
</p>

Welcome to the **GitHub Copilot Katas**! This hands-on workshop will take you from basic code completion to advanced AI-assisted development using GitHub Copilot.

Whether you're new to AI pair programming or looking to level up your skills, this workshop is designed to help you get the most out of GitHub Copilot.

## 🎯 What You'll Build

Throughout this workshop, you'll work with two projects using GitHub Copilot as your AI pair programmer:

### Part 1: Todo Application (Labs 00–04)
- ⌨️ Generate code with **inline completion** and comment-driven suggestions
- 💬 Explore and refactor code through Chat in **Ask Mode**
- 🤖 Build full features autonomously with **Agent Mode**
- 📋 Plan complex changes before coding with **Plan Mode**

### Part 2: Recipe Book API (Labs 05–09)
- 🔌 Connect Copilot to external tools with **MCP**
- 📏 Define coding standards with **Custom Instructions**
- 📄 Build reusable **Prompt Templates**
- 🤖 Create specialized **Custom Agents**
- 🧠 Encode domain expertise as **Skills**

## 🛠️ Prerequisites

Before you begin, ensure you have:

1. **VS Code** installed ([Download](https://code.visualstudio.com/))
2. **GitHub Copilot Chat** extension installed
3. A valid **GitHub Copilot subscription** (individual or organization)

### Choose Your Language

The first workshop supports multiple programming languages. Choose one:

| Language | Requirements |
|----------|-------------|
| **JavaScript** | Node.js 18+ |
| **Python** | Python 3.10+ |
| **C#** | .NET 8+ |
| **R** | R 4.2+ (see [R Data Analysis lab](labs/r-data-analysis.md)) |

## 📚 Workshop Structure

The workshop is divided into two parts covering core and advanced GitHub Copilot features:

### Part 1: Core Features (Todo App)

### [Lab 00 - Getting Started](labs/00-getting-started.md)
Set up your environment and verify Copilot is working correctly.

### [Lab 01 - Inline Code Completion](labs/01-inline-completion.md)
Master the art of inline code suggestions, including:
- Autocomplete suggestions
- Code generation from comments
- Next edit suggestions (Copilot Edits)
- Tab completion strategies

### [Lab 02 - Chat Window (Ask Mode)](labs/02-chat-window.md)
Learn to use the Copilot Chat effectively:
- Chatbot interaction basics
- Useful slash commands (`/explain`, `/fix`, `/tests`, etc.)
- Adding context with `@workspace`, `@terminal`, `#file`
- Learning and refactoring code

### [Lab 03 - Agent Mode](labs/03-agent-mode.md)
Let Copilot take the wheel:
- Creating new files and features
- Generating unit tests
- Autonomous multi-step tasks

### [Lab 04 - Plan Mode](labs/04-plan-mode.md)
Plan before you build:
- Creating implementation plans with Copilot
- Iterating on plans before coding
- Executing plans step by step
- Combining planning with agent execution

### Part 2: Advanced Customization (Recipe API)

### [Lab 05 - MCP (Model Context Protocol)](labs/05-mcp.md)
Extend Copilot with external tools and data:
- Installing MCP servers from the gallery and configuring `mcp.json`
- Server types: stdio (local) and HTTP/SSE (remote)
- Using MCP tools, resources, prompts, and apps
- Input variables for secure API key management
- Server trust, management, and combining multiple servers

### [Lab 06 - Custom Instructions](labs/06-instructions.md)
Teach Copilot your team's conventions:
- Repo-level instructions (`.github/copilot-instructions.md`)
- File-scoped instructions (`.instructions.md` with `applyTo` globs)
- Auto-generating instructions with `/init`
- Verifying with the diagnostics view

### [Lab 07 - Prompt Files](labs/07-prompts.md)
Create reusable task templates:
- Building `.prompt.md` files with YAML frontmatter
- Variables (`${file}`, `${selection}`, `${input:name}`)
- Configuring agent mode, model, and tools per prompt
- Building a prompt library for your team

### [Lab 08 - Custom Agents](labs/08-agents.md)
Build specialized AI team members:
- Creating `.agent.md` files with YAML frontmatter
- Agent tools, models, and visibility controls
- Handoffs for multi-agent workflows
- Agents dropdown and `/agents` command

### [Lab 09 - Custom Skills](labs/09-skills.md)
Encode deep domain expertise:
- Creating `SKILL.md` files in named directories
- Progressive 3-level loading and automatic discovery
- Including resources (scripts, templates, data) alongside skills
- `/skills` command and visibility controls

### R Track: Data Analysis

### [Lab R - R Data Analysis](labs/r-data-analysis.md)
A standalone lab for R developers covering the same Copilot features through a data-analysis lens:
- Inline completion for dplyr pipelines and ggplot2 charts
- Copilot Chat for statistical summaries and code explanation
- Agent Mode to scaffold complete analysis scripts
- Next Edit Suggestions for repetitive transformations

## 📁 Project Structure

```
copilot-katas/
├── README.md
├── CHEATSHEET.md
├── labs/
│   ├── 00-getting-started.md
│   ├── 01-inline-completion.md
│   ├── 02-chat-window.md
│   ├── 03-agent-mode.md
│   ├── 04-plan-mode.md
│   ├── 05-mcp.md
│   ├── 06-instructions.md
│   ├── 07-prompts.md
│   ├── 08-agents.md
│   ├── 09-skills.md
│   └── r-data-analysis.md  ← R track (standalone)
├── starter-code/
│   ├── javascript/          ← Todo App (Labs 00-04)
│   │   ├── package.json
│   │   ├── index.html
│   │   └── src/
│   ├── python/              ← Todo App (Labs 00-04)
│   │   ├── requirements.txt
│   │   └── src/
│   ├── csharp/              ← Todo App (Labs 00-04)
│   │   ├── TodoApp.csproj
│   │   └── src/
│   ├── r/                   ← R Data Analysis (Lab R)
│   │   ├── README.md
│   │   ├── data/
│   │   └── src/
│   └── recipe-api/          ← Recipe API (Labs 05-09)
│       ├── package.json
│       ├── README.md
│       └── src/
├── trainer/
│   └── GUIDE.md
└── solutions/
    └── (reference implementations)
```

## 🧭 Philosophy

This tutorial is designed to be:

- **Self-paced**: Work through exercises at your own speed
- **Hands-on**: Learn by doing, not just reading
- **Discovery-based**: The exercises guide you but don't always give exact answers
- **Language-flexible**: Use the programming language you're most comfortable with

## 🚀 Ready to Begin?

Head over to [Lab 00 - Getting Started](labs/00-getting-started.md) to begin your journey!

## 📖 Quick Reference

For a quick reference of common Copilot shortcuts and commands, see [CHEATSHEET.md](CHEATSHEET.md).

## 🤝 Contributing

Found an issue or have a suggestion? Feel free to open an issue or submit a pull request!

## 📄 License

MIT License - feel free to use this material for your own training sessions.

# GitHub Copilot Katas

<p align="center">
  <img src="https://github.githubassets.com/images/modules/site/copilot/copilot.png" alt="GitHub Copilot" width="200"/>
</p>

Welcome to the **GitHub Copilot Katas**! This hands-on workshop will take you from basic code completion to advanced AI-assisted development using GitHub Copilot.

Whether you're new to AI pair programming or looking to level up your skills, this workshop is designed to help you get the most out of GitHub Copilot.

## 🎯 What You'll Build

Throughout this workshop, you'll build a **To-Do Application** using GitHub Copilot as your AI pair programmer. The app includes:

- ✅ Add new to-do items
- ✅ Mark items as completed
- ✅ Remove items
- ✅ Edit existing items
- ✅ Filter by status (all/active/completed)
- ✅ Persist data in local storage

## 🛠️ Prerequisites

Before you begin, ensure you have:

1. **VS Code** installed ([Download](https://code.visualstudio.com/))
2. **GitHub Copilot** extension installed and activated
3. **GitHub Copilot Chat** extension installed
4. A valid **GitHub Copilot subscription** (individual or organization)

### Choose Your Language

This workshop supports multiple programming languages. Choose one:

| Language | Requirements |
|----------|-------------|
| **JavaScript** | Node.js 18+ |
| **Python** | Python 3.10+ |
| **C#** | .NET 8+ |

## 📚 Workshop Structure

The workshop is divided into four main exercises, each focusing on different GitHub Copilot features:

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

### [Lab 03 - Edit Mode](labs/03-edit-mode.md)
Make targeted changes with Edit Mode:
- Single file modifications
- Multi-file changes
- Working with review suggestions

### [Lab 04 - Agent Mode](labs/04-agent-mode.md)
Let Copilot take the wheel:
- Creating new files and features
- Generating unit tests
- Autonomous multi-step tasks
- Using MCP tools

## 📁 Project Structure

```
copilot-katas/
├── README.md
├── CHEATSHEET.md
├── labs/
│   ├── 00-getting-started.md
│   ├── 01-inline-completion.md
│   ├── 02-chat-window.md
│   ├── 03-edit-mode.md
│   └── 04-agent-mode.md
├── starter-code/
│   ├── javascript/
│   │   ├── package.json
│   │   ├── index.html
│   │   └── src/
│   ├── python/
│   │   ├── requirements.txt
│   │   └── src/
│   └── csharp/
│       ├── TodoApp.csproj
│       └── src/
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

# Todo App — C# Starter

The starter code for **Labs 00–04** of the GitHub Copilot Katas, using ASP.NET Core minimal APIs.

## Requirements

- .NET 8 SDK

## Run

```bash
cd starter-code/csharp
dotnet restore
dotnet run               # serves http://localhost:3000
# or, with auto-reload:
dotnet watch
```

Then open <http://localhost:3000> in your browser.

A VS Code launch configuration (`.NET Core Launch (web)`) is also included at the repo root in `.vscode/launch.json`, so you can press **F5** to debug.

## What's here

```
csharp/
├── Program.cs          # ASP.NET Core minimal API (entry point)
├── src/
│   ├── Todo.cs         # empty — you'll implement Todo in Lab 01
│   └── TodoList.cs     # empty — you'll implement TodoList in Lab 01
└── TodoApp.csproj
```

## Tests

The starter doesn't ship with a test project. You'll add one in Lab 03 — Copilot can scaffold it with `dotnet new xunit`.

Head back to [Lab 00](../../labs/00-getting-started.md) to begin.

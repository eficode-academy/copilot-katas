# GitHub Copilot Cheatsheet

Quick reference for GitHub Copilot features, shortcuts, and best practices.

---

## ⌨️ Keyboard Shortcuts

### Inline Completion

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Accept suggestion | `Tab` | `Tab` |
| Dismiss suggestion | `Esc` | `Esc` |
| Next suggestion | `Option+]` | `Alt+]` |
| Previous suggestion | `Option+[` | `Alt+[` |
| Accept next word | `Cmd+→` | `Ctrl+→` |
| Show all suggestions | `Ctrl+Enter` | `Ctrl+Enter` |
| Trigger suggestion | `Option+\` | `Alt+\` |

### Copilot Chat

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Open Chat panel | `Cmd+Shift+I` | `Ctrl+Shift+I` |
| Inline Chat | `Cmd+I` | `Ctrl+I` |
| Quick Chat | `Cmd+Shift+P` → "Quick Chat" | `Ctrl+Shift+P` → "Quick Chat" |

---

## 💬 Chat Modes

| Mode | Purpose | Best For |
|------|---------|----------|
| **Ask** | Read-only Q&A | Learning, explanations, code review |
| **Agent** | Autonomous tasks | Complex multi-file changes, new features |
| **Plan** | Plan then execute | Structured implementation, large features |

---

## 🔧 Slash Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/explain` | Explain selected code | Select code → `/explain` |
| `/fix` | Fix issues in code | `/fix this null reference error` |
| `/tests` | Generate unit tests | `/tests for the TodoList class` |
| `/doc` | Add documentation | `/doc using JSDoc format` |
| `/clear` | Clear chat history | `/clear` |
| `/new` | Start new conversation | `/new` |

---

## 📎 Context References

| Reference | Description | Example |
|-----------|-------------|---------|
| `@workspace` | Entire workspace | `@workspace how is auth handled?` |
| `@terminal` | Terminal output | `@terminal explain this error` |
| `#file` | Specific file | `#file:todo.js explain this` |
| `#selection` | Selected code | `#selection refactor to async` |
| `#editor` | Current file | `#editor find bugs` |

---

## 💡 Inline Completion Tips

### Write Better Comments

```javascript
// ❌ Vague
// sort list

// ✅ Specific  
// Sort todos by creation date in descending order (newest first)

// ✅ Very Specific
// Sort todos array by createdAt property descending, return new array
```

### Provide Context

```javascript
// Include type hints
function addTodo(text: string): Todo {

// Include return description
// Returns the newly created todo with generated ID

// Include error cases
// Throws Error if text is empty or undefined
```

### Use Examples

```javascript
// Example: formatDate("2024-01-15") => "January 15, 2024"
function formatDate(dateString) {
```

---

## 🎯 Chat Prompt Tips

### Be Specific

```
❌ "Fix my code"
✅ "Fix the null reference error in the getTodo method on line 45"

❌ "Make it better"
✅ "Refactor this function to use async/await and add error handling"
```

### Provide Context

```
✅ "I'm using React 18 with TypeScript. How do I..."
✅ "In the context of my TodoList class, add a method that..."
✅ "Using the existing Todo model in #file:todo.js, create..."
```

### Specify Constraints

```
✅ "Without using any external libraries..."
✅ "Using only ES6+ features..."
✅ "Following the existing code style in this project..."
```

### Request Format

```
✅ "Explain in bullet points..."
✅ "Show me 3 different approaches..."
✅ "Give me a step-by-step guide..."
```

---

## 🤖 Agent Mode Tips

### Good Prompts

```
✅ "Create a complete notifications feature:
1. Create a Notification model
2. Create a NotificationService
3. Add integration with TodoList
4. Write unit tests
5. Add documentation"
```

### Let Agent Work

- Give goals, not step-by-step instructions
- Let it explore the codebase
- Review terminal commands before allowing

---

## 📋 Plan Mode Tips

### Good Planning Prompts

```
✅ "I want to add a notifications feature. Help me plan:
1. What models and services are needed
2. How to integrate with the existing code
3. What tests to write
4. What order to implement things"
```

### Iterate on the Plan

- Review the generated plan before executing
- Ask Copilot to adjust scope or approach
- Break large plans into smaller phases
- Use the plan as a checklist during implementation

---

## 🔌 MCP (Model Context Protocol) Tips

### Installing MCP Servers

- Open Extensions view (`Cmd+Shift+X`) → search `@mcp` to browse the gallery
- Click **Install** (user profile) or right-click → **Install in Workspace** (`.vscode/mcp.json`)
- Run `MCP: Add Server` from Command Palette for a guided flow

### Configuration (`.vscode/mcp.json`)

```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch@latest"]
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    }
  }
}
```

### Server Types

| Type | Use Case | Key Fields |
|------|----------|------------|
| `stdio` | Local servers | `command`, `args`, `env`, `envFile` |
| `http` | Remote servers | `url`, `headers` |
| `sse` | Remote (SSE only) | `url`, `headers` |

### Input Variables (for secrets)

```json
{
  "inputs": [{ "type": "promptString", "id": "api-key", "description": "API Key", "password": true }],
  "servers": { "myServer": { "type": "http", "url": "...", "headers": { "Authorization": "Bearer ${input:api-key}" } } }
}
```

### MCP Capabilities

| Capability | Access |
|------------|--------|
| **Tools** | Automatically available in Agent Mode |
| **Resources** | Add Context > MCP Resources |
| **Prompts** | Type `/<server>.<prompt>` in chat |
| **Apps** | Appear inline in chat |

### Useful Commands

| Command | Description |
|---------|-------------|
| `MCP: Add Server` | Add via guided flow |
| `MCP: List Servers` | Manage all servers |
| `MCP: Browse Resources` | Browse MCP resources |
| `MCP: Reset Trust` | Re-require trust confirmation |

### Tips

- Use `${workspaceFolder}` for relative paths in config
- Use camelCase for server names (e.g., `"uiTesting"`)
- Never hardcode API keys — use `${input:id}` instead
- Always review MCP tool calls before approving
- Only add servers from trusted sources

---

## 📝 Custom Instructions Tips

### Instruction Types

| Type | File | Scope |
|------|------|-------|
| Repo-level | `.github/copilot-instructions.md` | Always applied to all chats |
| File-scoped | `.github/instructions/*.instructions.md` | Applied to files matching `applyTo` glob |

### File-Scoped Example

```markdown
---
applyTo: "src/routes/**/*.js"
---
All route handlers must validate input and return consistent JSON responses.
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `/init` | Auto-generate instructions from your codebase |
| Right-click → Diagnostics | See which instructions are loaded |

### Priority Order

Personal > Repository > Organization

### Tips

- Keep under ~1000 words for best results
- Check into version control for team sharing
- Use `applyTo` globs for language/folder-specific rules
- Test by generating code and verifying compliance
- Use `/init` to bootstrap instructions automatically

---

## 📄 Prompt Files Tips

### Location

```
.github/prompts/
├── new-endpoint.prompt.md
├── write-tests.prompt.md
└── code-review.prompt.md
```

### YAML Frontmatter

```markdown
---
description: Create a new REST API endpoint
agent: agent
model: GPT-4.1
tools: ['codebase', 'terminal', 'editFiles']
---
Your prompt content here...
```

### Variables

| Variable | Description |
|----------|-------------|
| `${file}` | Current file content |
| `${selection}` | Currently selected code |
| `${input:name}` | Prompt user for input at runtime |

### File References

Reference other files using Markdown links:
```markdown
Use the patterns from [api routes](../src/routes/recipes.js)
```

### Usage

1. Type `/` in Copilot Chat to see available prompts
2. Select a prompt and Copilot executes the template
3. Add extra context or instructions alongside the prompt

---

## 🤖 Custom Agents Tips

### File Location

```
.github/agents/
├── api-builder.agent.md
├── test-writer.agent.md
└── reviewer.agent.md
```

### Invoking Agents

- Select from the **agents dropdown** at the top of the Chat view
- Type `/agents` to quickly configure and manage agents

### Agent Structure (with YAML frontmatter)

```markdown
---
description: Expert API developer for building endpoints
tools: ['codebase', 'terminal', 'editFiles']
model: GPT-4.1
---
You are an expert API developer...
```

### Handoffs (multi-agent workflows)

```yaml
handoffs:
  - label: Start Implementation
    agent: api-builder
    prompt: Implement the plan above.
    send: false
```

### Visibility Control

| Setting | Effect |
|---------|--------|
| `user-invokable: false` | Hidden from dropdown, available as subagent |
| `disable-model-invocation: true` | In dropdown, can't be used as subagent |

---

## 🧠 Skills Tips

### File Location (directory with `SKILL.md`)

```
.github/skills/
├── recipe-validation/
│   └── SKILL.md
├── unit-conversion/
│   ├── SKILL.md
│   ├── tables/
│   └── examples/
└── api-design/
    └── SKILL.md
```

### SKILL.md Structure

```markdown
---
name: recipe-validation
description: >-
  Validates recipe data for the Recipe Book API.
  Use when creating or reviewing validation logic.
---
# Recipe Validation
Your domain knowledge, tables, rules...
```

### Key Concepts

| Concept | Detail |
|---------|--------|
| **Auto-discovery** | Copilot finds relevant skills automatically |
| **3-level loading** | Discovery → Instructions → Resources |
| **`name` must match dir** | `name: x` requires directory `x/` |
| **`/skills` command** | Manage and inspect available skills |

### Visibility Control

| Setting | Effect |
|---------|--------|
| `user-invokable: false` | Hidden from users, available to agents |
| `disable-model-invocation: true` | User-only, not auto-discovered |

### Tips

- Description is critical — it determines if the skill gets loaded
- Include resources (scripts, templates, data) alongside `SKILL.md`
- Keep each skill focused on one domain area
- Follows the open standard at agentskills.io

---

## 📝 Common Patterns

### Generate Boilerplate

```
// Type this comment and let Copilot complete:
// Express route handler for GET /api/todos
```

### Implement Interfaces

```typescript
// After defining an interface, type:
// Implement the ITodoService interface
```

### Add Error Handling

```
// Inline chat prompt:
"Add try-catch with proper error handling"
```

### Convert Code Style

```
// Inline chat prompt:
"Convert callbacks to async/await"
```

---

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| No suggestions appearing | Check Copilot is enabled; try typing a comment |
| Suggestions not relevant | Add more context; be more specific |
| Chat not responding | Check internet; reload VS Code |
| Wrong language suggestions | Ensure file has correct extension |
| Repeated bad suggestions | Start fresh with `/new` in chat |

---

## 🔗 Quick Links

- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [Prompt Engineering Guide](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)
- [Keyboard Shortcuts](https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-in-your-environment)

---

## 🎓 Remember

1. **Copilot is a tool** - Review all suggestions critically
2. **Context is king** - Better context = better suggestions
3. **Iterate quickly** - Don't accept if it's not right
4. **Learn the shortcuts** - Muscle memory makes you faster
5. **Experiment** - Try different approaches to prompting

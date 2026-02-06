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
| **Edit** | Propose file changes | Refactoring, adding features |
| **Agent** | Autonomous tasks | Complex multi-file changes |

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

## 🏗️ Edit Mode Tips

### Multi-File Changes

```
✅ Reference files explicitly:
"In #file:todo.js and #file:todoList.js, add validation..."

✅ Be clear about scope:
"Update all files that use the Todo class to include priority"
```

### Review Carefully

- Check diffs before accepting
- Accept changes incrementally
- Ask for revisions if needed

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

# Lab 01 - Inline Code Completion

## Learning Goals

By the end of this lab, you will be able to:
- Use autocomplete suggestions effectively
- Generate code from natural language comments
- Leverage Next Edit Suggestions (NES)
- Write better prompts for more accurate suggestions
- Understand when to accept, modify, or reject suggestions

## Introduction

Inline code completion is the core feature of GitHub Copilot. As you type, Copilot analyzes your code context and suggests completions that appear as "ghost text" in your editor.

### How It Works

1. **Context Analysis**: Copilot reads your current file, open tabs, and comments
2. **Pattern Recognition**: It identifies what you're trying to accomplish
3. **Suggestion Generation**: It provides relevant code completions
4. **Your Decision**: You accept, modify, or reject the suggestion

## Terminology

- **Ghost Text**: Grayed-out suggestions that appear inline as you type
- **Tab Completion**: Pressing Tab to accept a suggestion
- **Partial Accept**: Accepting only part of a suggestion (word by word)
- **Next Edit Suggestion (NES)**: Copilot predicting your next edit location
- **Context Window**: The code Copilot can "see" to make suggestions

---

## Exercise 1: Autocomplete Suggestions

### Task 1.1: Basic Function Completion

Open your language's todo file and let Copilot help you create the basic Todo structure.

**JavaScript** (`src/todo.js`):
```javascript
// Start typing this:
class Todo {
    // Just press Enter after the opening brace and see what Copilot suggests
}
```

**Python** (`src/todo.py`):
```python
# Start typing this:
class Todo:
    # Press Enter and see what Copilot suggests for __init__
```

**C#** (`src/Todo.cs`):
```csharp
// Start typing this:
public class Todo
{
    // Press Enter and see what Copilot suggests
}
```

**✅ Try This:**
1. Type the class declaration
2. Press Enter to go to a new line
3. Wait for Copilot to suggest constructor/properties
4. Press `Tab` to accept or `Esc` to dismiss
5. Try typing just `pub` or `pri` and see what gets suggested

**💡 Tips:**
- If you don't like a suggestion, press `Esc` and keep typing
- Press `Alt+]` to see alternative suggestions
- The more context you provide, the better the suggestions

### Task 1.2: Smart Property Suggestions

Now let's see how Copilot understands context. Add properties to your Todo class.

Start typing these property names one at a time:
- `id`
- `title` or `text`
- `completed` or `isCompleted`
- `createdAt` or `created_at`

**Observe:** Copilot should suggest appropriate types and default values based on the property name!

---

## Exercise 2: Code from Comments

This is one of Copilot's most powerful features: describe what you want in plain English (or your language), and Copilot writes the code.

### Task 2.1: Generate Functions from Comments

Add these comments to your code file and let Copilot generate the implementations:

**Comment 1 - Add Todo:**
```
// Function to add a new todo item to the list
```

**Comment 2 - Remove Todo:**
```
// Function to remove a todo item by its id
```

**Comment 3 - Toggle Complete:**
```
// Function to toggle the completed status of a todo item
```

**Comment 4 - Filter Todos:**
```
// Function to filter todos by their completion status
```

**✅ Try This:**
1. Type the comment and press Enter
2. Wait for the suggestion to appear
3. Review the suggestion before accepting
4. Modify the comment if the suggestion isn't what you wanted

### Task 2.2: Be Specific for Better Results

Compare these prompts and see how specificity affects suggestions:

**Vague comment:**
```
// sort the list
```

**Specific comment:**
```
// Sort todos by creation date in descending order (newest first)
```

**Very specific comment:**
```
// Sort todos array by createdAt property in descending order, returning a new sorted array without modifying the original
```

**🔬 Experiment:** Try different levels of detail and observe how suggestions change.

---

## Exercise 3: Next Edit Suggestions (NES)

Copilot can predict where you'll want to edit next and suggest changes. This feature is incredibly powerful for repetitive tasks.

### Task 3.1: Repetitive Property Addition

1. Create a Todo class with one property
2. After adding the first property, Copilot may suggest adding similar properties
3. Look for the lightbulb or the "Next Edit" indicator

### Task 3.2: Pattern Recognition

Try this sequence:

**JavaScript:**
```javascript
const todo1 = { id: 1, text: 'Learn Copilot', completed: false };
// Now start typing const todo2...
```

**Python:**
```python
todo1 = {"id": 1, "text": "Learn Copilot", "completed": False}
# Now start typing todo2...
```

**C#:**
```csharp
var todo1 = new Todo { Id = 1, Text = "Learn Copilot", Completed = false };
// Now start typing var todo2...
```

**Observe:** Copilot recognizes the pattern and suggests the next item!

### Task 3.3: Refactoring Patterns

1. Change a variable name in one place
2. Look for Copilot to suggest the same change in other locations
3. Use `Tab` to accept, then check if it suggests the next occurrence

---

## Exercise 4: Advanced Inline Techniques

### Task 4.1: Partial Accept

Sometimes you only want part of a suggestion. Learn to accept word by word:

| Shortcut | Action |
|----------|--------|
| `Cmd+→` (Mac) / `Ctrl+→` (Win) | Accept next word |
| `Cmd+Shift+→` | Accept to end of line |

**Try it:** Get a long suggestion and accept just the first few words.

### Task 4.2: See All Suggestions

Press `Ctrl+Enter` to open the Copilot suggestions panel, showing multiple alternatives.

**Try it:**
1. Type a comment for a function
2. Press `Ctrl+Enter`
3. Review all suggested implementations
4. Click the one you prefer

### Task 4.3: Inline Chat for Quick Fixes

Press `Cmd+I` (Mac) or `Ctrl+I` (Windows) to open inline chat:

**Try these prompts:**
- "Add error handling to this function"
- "Make this function async"
- "Add JSDoc/docstring to this function"

---

## Exercise 5: Build the Todo List Manager

Now let's put it all together! Use inline completion to build a TodoList manager class.

### Requirements

Create a `TodoList` class/module with the following methods:

1. **addTodo(text)** - Add a new todo with auto-generated ID and timestamp
2. **removeTodo(id)** - Remove a todo by ID
3. **toggleTodo(id)** - Toggle completion status
4. **getTodos()** - Get all todos
5. **getActiveTodos()** - Get uncompleted todos only
6. **getCompletedTodos()** - Get completed todos only
7. **clearCompleted()** - Remove all completed todos

### Strategy

1. Start with a descriptive class comment
2. Add method comments one at a time
3. Let Copilot suggest implementations
4. Refine with additional comments if needed

### Example Starting Point

**JavaScript:**
```javascript
/**
 * TodoList - A simple todo list manager
 * Manages a collection of todo items with add, remove, and filter capabilities
 */
class TodoList {
    constructor() {
        // Copilot should suggest initialization
    }
    
    // Add a new todo item with the given text
    // Returns the created todo object
    addTodo(text) {
        // Let Copilot fill this in
    }
}
```

**Python:**
```python
"""
TodoList - A simple todo list manager
Manages a collection of todo items with add, remove, and filter capabilities
"""
class TodoList:
    def __init__(self):
        # Copilot should suggest initialization
        pass
    
    def add_todo(self, text: str) -> dict:
        """Add a new todo item with the given text. Returns the created todo."""
        # Let Copilot fill this in
        pass
```

**C#:**
```csharp
/// <summary>
/// TodoList - A simple todo list manager
/// Manages a collection of todo items with add, remove, and filter capabilities
/// </summary>
public class TodoList
{
    // Let Copilot suggest properties
    
    // Add a new todo item with the given text
    // Returns the created todo object
    public Todo AddTodo(string text)
    {
        // Let Copilot fill this in
    }
}
```

---

## Challenges

### Challenge 1: Statistics Method
Add a method that returns statistics about the todo list:
```
{ total: 10, completed: 3, active: 7, percentComplete: 30 }
```
*Hint: Write a detailed comment describing the return value*

### Challenge 2: Search Function
Add a method to search todos by text (case-insensitive partial match).
*Hint: Be specific about the matching behavior in your comment*

### Challenge 3: Due Dates
Extend the Todo model to include a `dueDate` property and add methods:
- `getOverdueTodos()`
- `getTodosDueToday()`
- `sortByDueDate()`

---

## Key Takeaways

| Concept | Tip |
|---------|-----|
| **Better comments = Better code** | Be specific and descriptive |
| **Context matters** | Keep related files open |
| **Accept incrementally** | Use partial accept for fine control |
| **Iterate quickly** | Reject and retype if not satisfied |
| **Pattern power** | Copilot learns from your patterns |

---

## What's Next?

You've mastered inline completion! Now let's explore the Chat interface for more complex interactions.

👉 Continue to [Lab 02 - Chat Window (Ask Mode)](02-chat-window.md)

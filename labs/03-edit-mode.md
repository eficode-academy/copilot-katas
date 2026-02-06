# Lab 03 - Edit Mode

## Learning Goals

By the end of this lab, you will be able to:
- Use Copilot's Edit Mode to modify single files
- Make changes across multiple files simultaneously
- Review and accept/reject proposed changes
- Use Edit Mode for complex refactoring tasks
- Understand when to use Edit Mode vs. other modes

## Introduction

Edit Mode is a powerful feature that lets Copilot directly modify your files. Unlike Ask Mode (which just gives you answers), Edit Mode:

- **Proposes actual changes** to your code
- **Shows diffs** before applying
- **Can modify multiple files** at once
- **Integrates with your workflow** seamlessly

### Accessing Edit Mode

| Method | How |
|--------|-----|
| **Chat Dropdown** | Click the mode dropdown in Chat and select "Edit" |
| **Keyboard** | `Cmd+Shift+I` (Mac) / `Ctrl+Shift+I` (Win) → Select Edit mode |
| **Inline Edit** | `Cmd+I` (Mac) / `Ctrl+I` (Win) on selected code |

---

## Exercise 1: Single File Edits

### Task 1.1: Add Error Handling

Let's add error handling to our TodoList class.

1. Open your `TodoList` file (todo.js, todo.py, or TodoList.cs)
2. Switch to **Edit Mode** in Copilot Chat
3. Type this prompt:

```
Add error handling to all methods in the TodoList class. Throw appropriate errors for:
- Adding empty todo text
- Removing a todo that doesn't exist
- Toggling a todo that doesn't exist
```

4. **Review the diff** that Copilot shows
5. Click **Accept** or **Discard** for each change

**✅ Observe:**
- How changes are highlighted
- The before/after comparison
- Option to accept individual changes

### Task 1.2: Add Type Annotations

**For JavaScript - Add JSDoc types:**
```
Add JSDoc type annotations to all methods and properties in this file
```

**For Python - Add type hints:**
```
Add Python type hints to all methods and properties in this class
```

**For C# - Add XML documentation:**
```
Add XML documentation comments to all public methods and properties
```

### Task 1.3: Refactor a Method

Select a specific method and use inline edit:

1. Select the `addTodo` method
2. Press `Cmd+I` (Mac) or `Ctrl+I` (Win)
3. Type: `Refactor to validate input and return a result object with success/error status`
4. Review and accept the changes

---

## Exercise 2: Multi-File Edits

This is where Edit Mode really shines! Let's make coordinated changes across multiple files.

### Task 2.1: Add a New Property Across Files

Let's add a `priority` field to our todos.

1. Make sure you have files open:
   - Your Todo model/class file
   - Your TodoList manager file
   - Your HTML/UI file (if applicable)

2. In Edit Mode, type:

```
Add a "priority" property to the Todo model (values: "low", "medium", "high", default to "medium").
Update the TodoList class to:
1. Accept priority when adding a todo
2. Add a method to filter by priority
3. Add a method to sort by priority
```

3. Review changes across ALL affected files

**✅ Observe:**
- Changes proposed in multiple files
- How related changes are coordinated
- The ability to accept/reject per file

### Task 2.2: Implement Due Dates

```
Add a due date feature to the Todo application:
1. Add a "dueDate" property to the Todo model (optional, can be null)
2. Add a method "setDueDate(id, date)" to TodoList
3. Add a method "getOverdueTodos()" that returns todos past their due date
4. Add a method "getTodosDueToday()" for today's todos
```

### Task 2.3: Add Event System

```
Implement an event/observer system for the TodoList:
1. Create an EventEmitter class or use a simple callback pattern
2. Emit events when todos are added, removed, or toggled
3. Allow subscribing to these events
Update all relevant files to support this.
```

---

## Exercise 3: Working with Review Suggestions

### Task 3.1: Iterative Refinement

Sometimes the first suggestion isn't perfect. Learn to iterate:

1. Request a change:
```
Add a "tags" feature where each todo can have multiple tags
```

2. Review the suggestion. If it's not quite right, respond:
```
Good start, but I want tags to be stored as an array of strings, not a comma-separated string
```

3. Continue refining:
```
Also add a method to find all todos that have a specific tag
```

### Task 3.2: Partial Acceptance

1. Request a large change
2. Accept some changes but not others
3. Ask Copilot to adjust the rejected parts:

```
I accepted the model changes but not the UI changes. Please redo the UI changes to use a dropdown instead of checkboxes for priority selection.
```

---

## Exercise 4: Complex Refactoring

### Task 4.1: Extract a Service Layer

```
Refactor this code to separate concerns:
1. Create a TodoService class that handles business logic
2. Create a TodoRepository class/module that handles data storage
3. Keep TodoList as a simple container/facade
Maintain backward compatibility with existing code.
```

### Task 4.2: Convert Callback Pattern to Promises

**JavaScript:**
```
Convert all callback-based async operations to use Promises and async/await
```

**Python:**
```
Convert this synchronous code to use async/await with asyncio
```

### Task 4.3: Implement Undo/Redo

```
Add undo/redo functionality to the TodoList:
1. Keep a history of changes
2. Add methods: undo(), redo(), canUndo(), canRedo()
3. Support undoing: add, remove, toggle, edit operations
```

---

## Exercise 5: File Creation in Edit Mode

Edit Mode can also create new files!

### Task 5.1: Create a Configuration File

```
Create a new config file (config.js/config.py/appsettings.json) with settings for:
- Maximum todos allowed
- Default priority
- Auto-save interval in milliseconds
- Date format string
```

### Task 5.2: Create a Utility Module

```
Create a new utils file with helper functions:
- generateId(): generates unique IDs
- formatDate(date): formats dates consistently  
- validateTodoText(text): validates todo text
- debounce(fn, delay): debounces function calls
```

---

## Exercise 6: Build a Feature End-to-End

Let's build the **Categories/Lists** feature using Edit Mode.

### Step 1: Plan with Ask Mode First

Switch to Ask Mode temporarily:
```
I want to add a feature where users can organize todos into categories or lists (like "Work", "Personal", "Shopping"). What changes do I need to make?
```

### Step 2: Implement with Edit Mode

Switch back to Edit Mode:

**Part 1 - Model:**
```
Create a Category model with: id, name, color
Add a categoryId property to the Todo model
```

**Part 2 - Manager:**
```
Create a CategoryManager class to:
- Add/remove categories
- List all categories
- Get todos by category
```

**Part 3 - Integration:**
```
Update TodoList to work with categories:
- Filter todos by category
- Move todo to different category
- Get todos without a category
```

### Step 3: Review All Changes

1. Look at the complete set of changes
2. Accept or modify as needed
3. Test the new functionality

---

## Exercise 7: Handling Edit Conflicts

### Task 7.1: Understanding Conflicts

1. Make a manual change to a file
2. Ask Copilot to edit the same area
3. Observe how conflicts are handled

### Task 7.2: Resolving Conflicts

```
There's a conflict in my changes. Please resolve it by keeping my manual changes and integrating the new functionality around them.
```

---

## Challenges

### Challenge 1: API Layer

```
Create a REST API interface for the Todo application:
1. Define API endpoints (GET /todos, POST /todos, etc.)
2. Create request/response types
3. Implement mock API handlers
4. Add an API client class
```

### Challenge 2: State Management

```
Implement proper state management:
1. Create an immutable state structure
2. Implement actions/reducers pattern
3. Add state persistence
4. Create state selectors for filtered views
```

### Challenge 3: Full CRUD Operations

```
Ensure complete CRUD operations are implemented:
- Create: Add todo with all properties
- Read: Get single todo by ID, get all with filtering/sorting
- Update: Edit todo text, change priority, update due date
- Delete: Remove single, bulk delete, clear completed
```

---

## Pro Tips for Edit Mode

### When to Use Edit Mode

| Scenario | Recommendation |
|----------|----------------|
| Single line change | Inline completion |
| Understanding code | Ask Mode |
| Small targeted edit | Inline Chat (`Cmd+I`) |
| Multi-file changes | Edit Mode ✓ |
| Large refactoring | Edit Mode ✓ |
| Creating new files | Edit Mode ✓ |
| Code review | Ask Mode |

### Best Practices

1. **Be specific** about what files should change
2. **Review carefully** before accepting
3. **Accept incrementally** for large changes
4. **Keep files open** that you want edited
5. **Use file references** (#file) for clarity
6. **Save before editing** to have a clean state
7. **Commit frequently** so you can revert if needed

### Common Patterns

```
# Reference specific files
In #file:todo.js and #file:todoList.js, add validation for...

# Specify what NOT to change
Update the Todo class but don't modify the existing tests

# Request a specific approach
Implement using the factory pattern, not class inheritance
```

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Edit Mode edits directly** | Changes are proposed as diffs |
| **Multi-file power** | Coordinate changes across files |
| **Review before accept** | Always check proposed changes |
| **Iterate on suggestions** | Refine through conversation |
| **Right tool for the job** | Use Edit Mode for modifications |

---

## What's Next?

You've mastered Edit Mode for targeted changes. Now let's explore Agent Mode for autonomous, multi-step tasks.

👉 Continue to [Lab 04 - Agent Mode](04-agent-mode.md)

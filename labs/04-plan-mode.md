# Lab 04 - Plan Mode

## Learning Goals

By the end of this lab, you will be able to:
- Use Plan Mode to structure complex tasks before implementation
- Iterate on plans through conversation with Copilot
- Execute plans step by step with Copilot's help
- Understand when to use Plan Mode vs. other modes
- Combine planning with agent execution for large features

## Introduction

In the previous labs you've built a lot — a working Todo app with a frontend, statistics, search, authentication, database storage, notifications, and more. You did most of that by jumping straight into Agent Mode and letting Copilot figure it out.

Plan Mode takes a different approach. Instead of jumping straight into implementation, Plan Mode lets you:

- **Create a structured plan** before writing any code
- **Iterate on the approach** through conversation
- **Break down complex tasks** into manageable steps
- **Review and adjust** before committing to an implementation
- **Execute the plan** step by step or hand it off to Agent Mode

This is especially valuable as your codebase grows — which is exactly where you are now.

### Accessing Plan Mode

| Method | How |
|--------|-----|
| **Chat Dropdown** | Click the mode dropdown in Chat and select "Plan" |
| **Keyboard** | `Cmd+Shift+I` (Mac) / `Ctrl+Shift+I` (Win) → Select Plan mode |

### When to Use Plan Mode

Plan Mode is ideal when:
- You're building a new feature with multiple components
- You're unfamiliar with the codebase or technology
- The task involves changes across many files
- You want to explore different approaches before committing
- You need to coordinate work across a team

---

## Exercise 1: Your First Plan

### Task 1.1: Plan a Simple Feature

Your Todo app has grown through the previous labs, but todos are still a flat list with no organization. Let's plan a way to categorize them.

Switch to **Plan Mode** in Copilot Chat and type:

```
I want to add a "categories" feature to the Todo app where users can organize
their todos into categories like "Work", "Personal", and "Shopping".
Help me plan this feature.
```

**✅ Observe:**
- Copilot creates a structured implementation plan
- The plan accounts for the existing codebase (models, services, UI)
- Steps are broken down into logical phases
- The plan considers integration with features already built (search, statistics, etc.)

### Task 1.2: Refine the Plan

Now iterate on the plan:

```
I like the plan but I want to keep it simpler. Each todo should just have a
single category string, not a separate Category model. Update the plan.
```

**✅ Observe:**
- Copilot adjusts the plan based on your feedback
- The scope is reduced while keeping the feature intact
- You haven't written any code yet, but you have a clear direction

### Task 1.3: Ask Questions About the Plan

```
What are the trade-offs of using a simple string vs. a Category model?
Which approach would be easier to extend later?
```

---

## Exercise 2: Detailed Implementation Plans

### Task 2.1: Plan a Multi-File Feature

Your app currently has a flat list of todos. Let's plan something more complex: nested subtasks with progress tracking.

```
Plan the implementation of a "subtasks" feature for the Todo app:
- Any todo can have child todos (subtasks)
- A parent todo shows progress based on how many subtasks are completed
- Subtasks can be collapsed/expanded in the UI
- Completing all subtasks auto-completes the parent

Please create a detailed plan with:
1. What files need to be created or modified
2. What changes are needed in each file
3. The order to implement things (model → service → UI)
4. How to test each piece
5. How this interacts with existing features (search, statistics, recurring todos)
```

**✅ Observe:**
- The plan identifies specific files to change
- Changes are ordered logically (model first, then service, then UI)
- Testing is included at each step
- The plan considers interactions with features you've already built

### Task 2.2: Plan with Constraints

```
Plan an undo/redo system for the Todo app with these constraints:
- No external libraries allowed
- Must support undoing: add, delete, toggle, and edit operations
- Should keep a history of the last 20 actions
- Needs keyboard shortcuts (Cmd/Ctrl+Z for undo, Cmd/Ctrl+Shift+Z for redo)
- Must work with the existing database storage
- The UI should show undo/redo buttons that are disabled when history is empty
```

**✅ Observe:**
- Copilot respects your constraints in the plan
- The plan accounts for the complexity of integrating with persistent storage
- Performance and memory considerations are included

---

## Exercise 3: From Plan to Code

This is where Plan Mode really shines — turning plans into reality.

### Task 3.1: Execute a Plan Step by Step

1. First, create a plan in Plan Mode for the categories feature you designed in Exercise 1:

```
Let's plan the implementation of the categories feature we discussed earlier.
Each todo gets a simple category string. I need:
- Model changes to add a category field
- A way to manage the list of available categories
- UI controls: a category dropdown when adding/editing a todo,
  and a category filter in the sidebar or filter bar
- Update statistics to show breakdown by category
- Make sure search still works with categories

Create a step-by-step implementation plan.
```

2. Review the plan. When you're satisfied, ask:

```
Let's start implementing. Begin with step 1.
```

3. After each step, review the changes and move to the next:

```
Step 1 looks good. Let's move to step 2.
```

**✅ Observe:**
- You maintain control of the pace
- Each step can be reviewed before moving on
- You can adjust the plan mid-implementation if needed

### Task 3.2: Adjust Mid-Implementation

After implementing a few steps, change direction:

```
Actually, I also want each category to have a color associated with it.
Todos should show a colored dot or badge for their category.
Update the remaining plan to include color coding.
```

**✅ Observe:**
- The plan adapts to new requirements
- Already-implemented steps are preserved
- New steps are integrated with existing work

---

## Exercise 4: Planning Complex Refactoring

Your app has grown significantly through Labs 01-03. Time to clean it up!

### Task 4.1: Plan a Code Reorganization

```
The Todo app has grown through many iterations and the code could use some
reorganization. Plan a refactoring to improve the codebase:
1. Analyze the current code structure
2. Propose a better organization following SOLID principles
3. List all the changes needed with their order
4. Identify any risks or things that might break (tests, database, UI)
5. Suggest how to verify nothing is broken after each change
```

### Task 4.2: Plan an Interface Extraction

```
Several parts of our Todo app have similar patterns (storage, services,
notifications). Plan extracting common interfaces:
1. Identify repeated patterns across the codebase
2. Propose shared interfaces or base classes
3. Show which files would implement each interface
4. Plan the migration order to minimize breakage
5. Ensure all existing tests still pass after each step
```

---

## Exercise 5: Planning with Context

### Task 5.1: Plan Using Workspace Context

```
@workspace Analyze the current Todo app and plan adding keyboard shortcuts
throughout the application:
1. What keyboard shortcuts would be most useful?
2. How should we handle shortcut registration and conflict detection?
3. Where in the existing code should this be integrated?
4. Should we add a help overlay showing available shortcuts (press ?)
5. How do we make sure shortcuts don't conflict with browser defaults?
```

**✅ Observe:**
- Copilot analyzes your actual codebase to make specific recommendations
- The plan references real files and functions in your project
- Suggestions are tailored to what already exists

### Task 5.2: Plan Based on Existing Code

```
#file:todoList.js Plan how to add batch operations to the existing TodoList:
1. Select multiple todos (checkboxes or shift-click)
2. Batch actions: complete all, delete all, move to category, set priority
3. A floating action bar that appears when items are selected
4. "Select All" and "Deselect All" controls

Show me the plan considering what's already implemented in this file.
```

---

## Exercise 6: Build a Complete Feature with Plan Mode

Let's put it all together by planning and building a **Subtasks** feature from scratch.

### Step 1: High-Level Plan

```
I want to add subtasks to the Todo app. Any todo should be able to have
child todos nested under it.

Create a high-level plan first. Don't include implementation details yet.
Just outline the major phases and what each phase accomplishes.
```

### Step 2: Detailed Plan

```
Now expand the plan with implementation details:
- What model changes are needed (how to represent parent-child relationships)
- What service methods to add or modify
- How the UI should render nested todos (indentation, collapse/expand)
- How progress tracking works (parent shows X of Y subtasks complete)
- How existing features interact (search, statistics, recurring, notifications)
- How to test each component
```

### Step 3: Review and Refine

```
Before we start coding, are there any edge cases or potential issues with
this plan? What about:
- Maximum nesting depth (should we limit it?)
- What happens when you delete a parent todo?
- How do subtasks interact with recurring todos?
- Performance with deeply nested structures
```

### Step 4: Implement

```
The plan looks good. Let's start implementing step by step, beginning with
the model changes.
```

### Step 5: Verify

```
Now that we've implemented the feature, review all the changes and verify
they match our plan. Are there any gaps?
```

---

## Exercise 7: Architecture Planning

### Task 7.1: Plan Work Distribution

```
I need to split upcoming work on the Todo app across 3 developers. Plan how to
divide these new features so they can work in parallel with minimal conflicts:
- Todo templates (save and reuse common todo structures)
- Activity log / audit trail (track all changes to todos)
- Drag & drop reordering (manual sort order for todos)

Show the work breakdown and identify any dependencies between the streams.
```

### Task 7.2: Plan an Architecture Decision

```
Our Todo app currently handles everything client-side. Plan the pros and
cons of moving to a client-server architecture with a REST API:

Consider our existing features:
- Authentication (already has client-side auth)
- SQLite database (already set up)
- Export/Import
- Notifications
- Search

For each option (keep client-side vs. add REST API), outline:
- Migration effort for each existing feature
- Scalability
- Multi-device support
- Data safety
```

---

## Challenges

### Challenge 1: Full Feature Plan and Build

```
Plan and implement a complete "Smart Lists" feature:
- Automatically group todos by: Today, Upcoming, Overdue, Completed
- Each smart list updates dynamically as todos change
- Users can create custom smart lists with filter rules (e.g. "Work todos due this week")
- Smart lists appear in a sidebar navigation
- Users can pin their favorite smart lists to the top

Create the plan first, iterate on it, then implement step by step.
```

### Challenge 2: Todo Templates

```
Plan and implement a "Templates" feature:
1. Users can save any todo (including subtasks) as a reusable template
2. Templates have a name and optional description
3. Creating a todo from a template pre-fills all fields
4. Templates can be shared between users (integrate with existing auth)
5. Add a template gallery to the UI

Plan the feature, refine through conversation, then implement.
```

### Challenge 3: Drag & Drop Reordering

```
Plan and implement drag & drop reordering for todos:
1. Users can drag todos to reorder them manually
2. Support drag & drop between categories
3. Handle reordering within subtask groups
4. Persist the custom order in the database
5. Show visual feedback during drag (placeholder, drop target highlight)
6. Support touch devices

Plan first, identify the tricky parts, then implement.
```

---

## Plan Mode Best Practices

### When to Use Plan Mode

| Scenario | Recommendation |
|----------|----------------|
| Quick code fix | Inline completion |
| Understanding code | Ask Mode |
| Small targeted edit | Inline Chat (`Cmd+I`) |
| Multi-step autonomous task | Agent Mode |
| **New feature design** | Plan Mode ✓ |
| **Complex refactoring** | Plan Mode ✓ |
| **Unfamiliar codebase** | Plan Mode ✓ |
| **Architecture decisions** | Plan Mode ✓ |
| **Team work planning** | Plan Mode ✓ |

### Writing Good Planning Prompts

1. **State the goal clearly** - What do you want to achieve?
2. **Mention constraints** - Any limitations or requirements?
3. **Ask for structure** - Request numbered steps, phases, or milestones
4. **Include context** - Reference existing files or patterns
5. **Request risk analysis** - Ask about edge cases and potential issues

### Example of a Great Planning Prompt

```
Plan a "subtasks" feature for the Todo app.

Goal: Allow any todo to have nested child todos that track progress.

Requirements:
- Todos can have unlimited subtasks (but limit nesting to 3 levels)
- Parent todo shows progress: "3 of 5 subtasks complete"
- Completing all subtasks auto-completes the parent
- Subtasks can be collapsed/expanded in the UI
- Deleting a parent deletes all subtasks

Constraints:
- Must work with the existing SQLite database schema
- Must integrate with search (search should find subtasks too)
- Statistics should count subtasks separately

Please provide:
1. A phased implementation plan
2. Files to create/modify in each phase
3. Testing approach for each phase
4. Potential gotchas and how to handle them
```

### Iterating on Plans

- Start broad, then drill down into details
- Challenge assumptions: "What if we did X instead?"
- Ask about trade-offs between approaches
- Don't over-plan — implement early phases to validate the approach
- Revisit the plan after each phase

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Plan before you code** | Better plans lead to better implementations |
| **Iterate on plans** | Refine through conversation before coding |
| **Use context** | Reference files and workspace for accurate plans |
| **Stay flexible** | Adjust the plan as you learn during implementation |
| **Right tool for the job** | Plan Mode for design, Agent Mode for execution |

---

## Congratulations! 🎉

You've completed Part 1 of the GitHub Copilot Katas!

### What You've Learned

1. **Inline Completion** - Fast, contextual code suggestions
2. **Chat (Ask Mode)** - Conversational Q&A and learning
3. **Agent Mode** - Autonomous multi-step task execution
4. **Plan Mode** - Structured planning before implementation

### Next Steps

Ready to go deeper? Part 2 covers advanced Copilot customization using a new Recipe API project.

👉 Continue to [Lab 05 - MCP (Model Context Protocol)](05-mcp.md)

---

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Copilot Blog](https://github.blog/tag/github-copilot/)
- [Prompt Engineering Guide](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

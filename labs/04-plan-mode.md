# Lab 04 - Plan Mode

## Learning Goals

By the end of this lab, you will be able to:
- Use Plan Mode to structure complex tasks before implementation
- Iterate on plans through conversation with Copilot
- Execute plans step by step with Copilot's help
- Understand when to use Plan Mode vs. other modes
- Combine planning with agent execution for large features

## Introduction

Plan Mode is designed for when you want to think before you code. Instead of jumping straight into implementation, Plan Mode lets you:

- **Create a structured plan** before writing any code
- **Iterate on the approach** through conversation
- **Break down complex tasks** into manageable steps
- **Review and adjust** before committing to an implementation
- **Execute the plan** step by step or hand it off to Agent Mode

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

Switch to **Plan Mode** in Copilot Chat and type:

```
I want to add a "categories" feature to the Todo app where users can organize
their todos into categories like "Work", "Personal", and "Shopping".
Help me plan this feature.
```

**✅ Observe:**
- Copilot creates a structured implementation plan
- The plan includes models, services, and integration points
- Steps are broken down into logical phases
- The plan considers the existing codebase

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

```
Plan the implementation of a "due date reminder" feature for the Todo app:
- Users can set a due date on any todo
- Todos that are past their due date should be highlighted
- Users can filter to see overdue todos
- A summary shows how many todos are overdue

Please create a detailed plan with:
1. What files need to be created or modified
2. What changes are needed in each file
3. The order to implement things
4. How to test each piece
```

**✅ Observe:**
- The plan identifies specific files to change
- Changes are ordered logically (model first, then service, then UI)
- Testing is included at each step

### Task 2.2: Plan with Constraints

```
Plan a search feature for the Todo app with these constraints:
- No external libraries allowed
- Must support searching by title, description, and tags
- Must be case-insensitive
- Should work efficiently with 1000+ todos
- Needs to work in all three languages (JavaScript, Python, C#)
```

**✅ Observe:**
- Copilot respects your constraints in the plan
- The plan accounts for cross-language compatibility
- Performance considerations are included

---

## Exercise 3: From Plan to Code

This is where Plan Mode really shines — turning plans into reality.

### Task 3.1: Execute a Plan Step by Step

1. First, create a plan in Plan Mode:

```
Plan an "export to JSON" feature for the Todo app:
- Export all todos to a JSON file
- Export only filtered todos (by status, category, or date range)
- Include metadata (export date, total count)
- Format the JSON for readability
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
Actually, I also want to support CSV export. Update the remaining plan to include
CSV alongside JSON, and share the common filtering logic between them.
```

**✅ Observe:**
- The plan adapts to new requirements
- Already-implemented steps are preserved
- New steps are integrated with existing work

---

## Exercise 4: Planning Complex Refactoring

### Task 4.1: Plan a Code Reorganization

```
The Todo app code is getting complex. Plan a refactoring to separate concerns:
1. Analyze the current code structure
2. Propose a better organization following SOLID principles
3. List all the changes needed with their order
4. Identify any risks or things that might break
5. Suggest how to verify nothing is broken after each change
```

### Task 4.2: Plan a Pattern Migration

```
Plan converting the Todo app from a class-based approach to a more functional
programming style:
1. Identify which parts to convert
2. Show the before/after for each major change
3. Ensure backward compatibility
4. List the order of changes to minimize breakage
```

---

## Exercise 5: Planning with Context

### Task 5.1: Plan Using Workspace Context

```
@workspace Analyze the current Todo app structure and plan the following
improvements:
1. Add input validation everywhere it's missing
2. Add proper error handling with custom error types
3. Add logging for debugging
What's the current state and what needs to change?
```

### Task 5.2: Plan Based on Existing Code

```
#file:todo.js Plan how to extend this file to support:
1. Subtasks (nested todos)
2. Progress tracking (percentage complete based on subtasks)
3. Collapsible groups in the UI

Show me the plan considering what's already implemented.
```

---

## Exercise 6: Build a Complete Feature with Plan Mode

Let's put it all together by planning and building a **Notifications** feature.

### Step 1: High-Level Plan

```
I want to add a notifications feature to the Todo app. Notifications should
fire when:
- A todo is due within 24 hours
- A todo is overdue
- A todo is completed (as a confirmation)

Create a high-level plan first. Don't include implementation details yet.
```

### Step 2: Detailed Plan

```
Now expand the plan with implementation details:
- What models/classes are needed
- What methods to add
- How to integrate with existing code
- How to test each component
```

### Step 3: Review and Refine

```
Before we start coding, are there any edge cases or potential issues with
this plan? What about:
- Timezone handling
- Duplicate notifications
- Performance with many todos
```

### Step 4: Implement

```
The plan looks good. Let's start implementing step by step, beginning with
the Notification model.
```

### Step 5: Verify

```
Now that we've implemented the feature, review all the changes and verify
they match our plan. Are there any gaps?
```

---

## Exercise 7: Team Planning

### Task 7.1: Plan Work Distribution

```
I need to split the work on the Todo app across 3 developers. Plan how to
divide these features so they can work in parallel with minimal conflicts:
- User authentication
- Todo sharing between users  
- Activity log and audit trail

Show the work breakdown and identify any dependencies between the streams.
```

### Task 7.2: Plan an Architecture Decision

```
We need to decide how to store Todo data. Plan the pros and cons of:
1. Local storage (current approach)
2. SQLite database
3. REST API with a backend server

For each option, outline:
- Implementation effort
- Scalability
- Offline support
- Data safety
```

---

## Challenges

### Challenge 1: Full Feature Plan and Build

```
Plan and implement a complete "Smart Lists" feature:
- Automatically group todos by: Today, Upcoming, Overdue, Completed
- Each smart list updates dynamically
- Users can pin their favorite smart lists
- Add custom smart lists with filter rules

Create the plan first, iterate on it, then implement step by step.
```

### Challenge 2: Migration Plan

```
Plan a migration from in-memory storage to persistent storage:
1. Analyze current data flow
2. Design the storage interface
3. Plan the migration steps
4. Include rollback strategy
5. Plan validation and testing

Execute the plan after review.
```

### Challenge 3: Plan a Testing Strategy

```
Plan a comprehensive testing strategy for the Todo app:
1. Unit tests for all business logic
2. Integration tests for storage
3. Edge case coverage
4. Test data management
5. CI/CD integration

Create the plan, review it, then implement the test suite.
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
Plan a "recurring todos" feature for the Todo app.

Goal: Allow users to create todos that automatically repeat on a schedule.

Requirements:
- Support daily, weekly, and monthly recurrence
- When a recurring todo is completed, auto-create the next occurrence
- Allow users to skip an occurrence without breaking the pattern
- Show upcoming occurrences in a calendar view

Constraints:
- Use only standard library (no external scheduling libraries)
- Must work offline (no server-side scheduling)

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

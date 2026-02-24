# Lab 03 - Agent Mode

## Learning Goals

By the end of this lab, you will be able to:
- Use Agent Mode for autonomous multi-step tasks
- Create new files and features with minimal guidance
- Generate comprehensive unit tests automatically
- Let Copilot explore your codebase and make decisions
- Use tools and terminal commands through the agent
- Understand when Agent Mode is the right choice

## Introduction

Agent Mode is the most autonomous mode of GitHub Copilot. Unlike Ask Mode where you only get answers, Agent Mode:

- **Plans and executes** multi-step tasks independently
- **Creates new files** when needed
- **Runs terminal commands** (with your permission)
- **Explores your codebase** to understand context
- **Iterates on solutions** based on feedback
- **Uses tools** like search, terminal, and file creation

### Accessing Agent Mode

| Method | How |
|--------|-----|
| **Chat Dropdown** | Click the mode dropdown in Chat and select "Agent" |
| **Keyboard** | `Cmd+Shift+I` (Mac) / `Ctrl+Shift+I` (Win) → Select Agent mode |

### Agent Mode Indicators

When in Agent Mode, you'll see:
- A different icon in the chat
- Progress indicators for multi-step tasks
- Tool usage notifications (file reads, terminal commands)
- File creation proposals

---

## Exercise 1: Create a New Feature File

### Task 1.1: Create a Statistics Module

Switch to Agent Mode and give this prompt:

```
Create a new statistics module for the Todo application that provides:
1. Total count of todos
2. Completed vs active counts
3. Completion percentage
4. Average time to complete a todo (if we track completion time)
5. Most productive day of the week
6. Streak tracking (consecutive days with completed todos)

Create appropriate files for my chosen language, integrate with the existing TodoList, and add any necessary model changes.
```

**✅ Observe:**
- Agent reads existing files to understand the structure
- Agent plans the implementation
- Agent creates new files as needed
- Agent may modify existing files for integration

### Task 1.2: Create a Search Feature

```
Implement a full-text search feature for the Todo app:
1. Create a SearchService that can search todos by text, tags, or date range
2. Support fuzzy matching for typo tolerance
3. Add search result highlighting
4. Create any helper utilities needed
```

---

## Exercise 2: Generate Unit Tests

Agent Mode excels at creating comprehensive test suites!

### Task 2.1: Full Test Suite

```
Create a complete unit test suite for the TodoList class:
1. Set up the appropriate testing framework for my language
2. Test all public methods
3. Include edge cases (empty list, invalid input, etc.)
4. Add integration tests for the storage functionality
5. Include test utilities and helpers as needed
```

**For JavaScript, expect:**
- Jest or Vitest setup
- Test file(s) created
- `package.json` updates
- Mock utilities if needed

**For Python, expect:**
- pytest setup
- Test file(s) in tests/ directory
- conftest.py with fixtures
- requirements.txt updates

**For C#, expect:**
- xUnit or NUnit setup
- Test project creation
- Test file(s) created
- Solution updates

### Task 2.2: Test Coverage for Specific Features

```
Add tests specifically for:
1. The priority feature (filtering and sorting by priority)
2. The due date feature (overdue detection, today's todos)
3. Edge cases like null/undefined handling
4. Concurrent access scenarios (if applicable)
```

### Task 2.3: Run and Fix Tests

```
Run the tests and fix any failures. Then add any missing test cases you identify.
```

**✅ Observe:**
- Agent runs terminal commands
- Agent reads test output
- Agent fixes failing tests
- Agent identifies gaps in coverage

---

## Exercise 3: Multi-Step Autonomous Tasks

### Task 3.1: Add Authentication

This is a complex, multi-step task:

```
Add a simple authentication system to the Todo app:
1. Create a User model with id, username, password hash
2. Create an AuthService for login/logout/register
3. Associate todos with users
4. Add middleware/guards to protect todo operations
5. Create a simple session or token-based auth
6. Update existing code to work with authenticated users

Don't use any external auth libraries - implement from scratch for learning purposes.
```

### Task 3.2: Add Data Export/Import

```
Add data export and import functionality:
1. Export todos to JSON file
2. Export todos to CSV file
3. Import todos from JSON
4. Import todos from CSV
5. Handle conflicts during import (duplicate IDs)
6. Add validation for imported data
7. Create appropriate file handling utilities
```

### Task 3.3: Database Integration

```
Add SQLite database support to the Todo app:
1. Set up the database connection
2. Create migration scripts for the schema
3. Implement a DatabaseRepository class
4. Replace in-memory storage with database storage
5. Add proper connection handling and cleanup
6. Run the migrations and verify the setup
```

---

## Exercise 4: Building Complete Features

### Task 4.1: Notifications Feature

```
Build a complete notifications feature:
1. Create a Notification model (id, type, message, read, createdAt)
2. Create a NotificationService for managing notifications
3. Trigger notifications for:
   - Todo due soon (within 24 hours)
   - Todo overdue
   - Daily summary
4. Add methods to mark as read, clear all, get unread count
5. Create any supporting utilities
6. Add tests for the notification logic
```

### Task 4.2: Recurring Todos

```
Implement recurring todos:
1. Add recurrence pattern to Todo model (daily, weekly, monthly, custom)
2. Create a RecurrenceService that:
   - Generates next occurrence when todo is completed
   - Handles different recurrence patterns
   - Manages recurrence exceptions (skip this week)
3. Update TodoList to work with recurring todos
4. Add tests for recurrence calculations
```

---

## Exercise 5: Exploring and Understanding

### Task 5.1: Code Analysis

```
Analyze the current codebase and provide:
1. A summary of all classes/modules and their responsibilities
2. A dependency graph (what depends on what)
3. Identified code smells or improvements
4. Suggestions for better organization
5. A TODO list of technical debt to address
```

### Task 5.2: Documentation Generation

```
Generate comprehensive documentation for this project:
1. Create a README.md with setup instructions
2. Create API documentation (if web endpoints exist)
3. Create a CONTRIBUTING.md guide
4. Add inline documentation to all public methods
5. Create architecture documentation with diagrams (using Mermaid or ASCII)
```

---

## Exercise 6: Advanced Agent Tasks

### Task 6.1: Performance Optimization

```
Analyze and optimize the Todo application for performance:
1. Profile the code (suggest how to profile in my language)
2. Identify bottlenecks
3. Implement optimizations:
   - Add caching where beneficial
   - Optimize data structures
   - Reduce unnecessary operations
4. Add benchmarks to measure improvements
5. Document the optimizations made
```

### Task 6.2: Error Handling Overhaul

```
Implement comprehensive error handling:
1. Create custom error/exception classes
2. Add error handling to all methods
3. Create an error logging service
4. Add error recovery strategies
5. Create user-friendly error messages
6. Add tests for error scenarios
```

---

## Challenges

### Challenge 1: Full-Stack Feature

```
Build a complete "Collaboration" feature:
1. Add ability to share todo lists with other users
2. Implement permissions (view, edit, admin)
3. Add real-time updates when shared list changes
4. Create invitation system
5. Add activity log for shared lists
6. Write comprehensive tests
7. Document the feature
```

### Challenge 2: Plugin System

```
Create a plugin/extension system for the Todo app:
1. Define a plugin interface
2. Create a plugin loader
3. Build example plugins:
   - Pomodoro timer integration
   - Markdown support in todo text
   - Color coding by priority
4. Add plugin configuration
5. Document how to create new plugins
```

### Challenge 3: Offline Support

```
Add offline support to the Todo app:
1. Implement local storage caching
2. Add sync mechanism for when online
3. Handle conflict resolution
4. Show sync status to users
5. Queue operations when offline
6. Test offline scenarios
```

---

## Agent Mode Best Practices

### When to Use Agent Mode

| Scenario | Recommendation |
|----------|----------------|
| Quick code fix | Inline completion |
| Understanding code | Ask Mode |
| Targeted single edit | Inline Chat (`Cmd+I`) |
| **New feature (multiple files)** | Agent Mode ✓ |
| **Generating test suites** | Agent Mode ✓ |
| **Project setup** | Agent Mode ✓ |
| **Multi-step tasks** | Agent Mode ✓ |
| **Exploration tasks** | Agent Mode ✓ |

### Writing Good Agent Prompts

1. **Be clear about the goal** - State what you want to achieve
2. **List the components** - Break down into numbered steps
3. **Specify constraints** - Mention any limitations or requirements
4. **Indicate preferences** - State patterns or styles you prefer
5. **Request verification** - Ask for tests or validation

### Example of a Great Prompt

```
Create a complete reminder feature for the Todo app:

Goal: Allow users to set reminders for todos that trigger at specific times.

Requirements:
1. Add a Reminder model with: id, todoId, reminderTime, isTriggered, repeatPattern
2. Create a ReminderService that:
   - Schedules reminders
   - Triggers notifications when due
   - Handles recurring reminders
3. Integrate with the existing Todo model (add reminderId reference)
4. Use the Observer pattern for reminder triggers

Constraints:
- Use only standard library (no external scheduling libraries)
- Support reminders accurate to the minute
- Handle timezone properly

Please also:
- Add unit tests for the reminder logic
- Update the TodoList documentation
- Create a usage example
```

### Reviewing Agent Work

1. **Check file creations** - Review new files carefully
2. **Verify terminal commands** - Understand what's being run
3. **Test changes** - Run the application
4. **Review integrations** - Ensure new code works with existing
5. **Check for side effects** - Look for unintended changes

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Agent is autonomous** | Give it goals, not step-by-step instructions |
| **Multi-step capable** | Complex tasks with many files |
| **Terminal access** | Can run commands (with permission) |
| **Tool usage** | Uses search and file ops |
| **Requires review** | Always verify the work done |
| **Best for big tasks** | New features, test suites, setup |

---

## Congratulations! 🎉

You've completed the Agent Mode lab! Now let's learn to plan before we build.

👉 Continue to [Lab 04 - Plan Mode](04-plan-mode.md)

---

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Copilot Blog](https://github.blog/tag/github-copilot/)
- [Prompt Engineering Guide](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

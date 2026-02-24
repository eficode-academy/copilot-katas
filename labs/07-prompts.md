# Lab 07 - Prompt Files

## Learning Goals

By the end of this lab, you will be able to:
- Understand what prompt files are and how they differ from instructions
- Create reusable `.prompt.md` files for common tasks
- Use variables like `${file}`, `${selection}`, and `${input:name}` in prompts
- Configure prompt metadata (description, agent, model, tools)
- Build a library of prompt files for your team
- Run prompt files from Copilot Chat using `/` commands

## Introduction

**Prompt files** are reusable, version-controlled prompt templates stored as `.prompt.md` files. While instructions tell Copilot *how* to behave, prompt files define *what* to do — they are task recipes you can trigger on demand.

### Instructions vs. Prompts

| Feature | Instructions | Prompt Files |
|---------|-------------|--------------|
| **Purpose** | Define rules and conventions | Define reusable tasks |
| **When applied** | Automatically, always | On demand, when invoked |
| **Location** | `.github/copilot-instructions.md` | `.github/prompts/*.prompt.md` |
| **Invoked via** | Automatic | Type `/` in chat to see available prompts |
| **Contains** | Rules, standards, preferences | Task descriptions, variables, tool config |

### How Prompt Files Work

```
.github/
└── prompts/
    ├── new-endpoint.prompt.md     ← reusable prompt for creating API endpoints
    ├── write-tests.prompt.md      ← reusable prompt for generating tests
    ├── code-review.prompt.md      ← reusable prompt for reviewing code
    └── add-feature.prompt.md      ← reusable prompt for adding features
```

When you type `/` in Copilot Chat, your prompt files appear as available commands alongside skills. Select one and Copilot executes the prompt template.

### Prompt File Structure

Every `.prompt.md` file has two parts:

1. **YAML frontmatter** (optional) — metadata like description, agent, model, tools
2. **Body** — the actual prompt content in Markdown

````markdown
---
description: Create a new REST API endpoint
agent: agent
model: GPT-4.1
tools: ['codebase', 'terminal', 'editFiles']
---

Your prompt instructions here...
````

### Setting Up for This Lab

Make sure the Recipe API project is ready with the instructions file from Lab 06:

```bash
cd starter-code/recipe-api
npm install
```

Create the prompts directory:

```bash
mkdir -p .github/prompts
```

---

## Exercise 1: Your First Prompt File

### Task 1.1: Create a Simple Prompt File

Create the file `.github/prompts/new-endpoint.prompt.md`:

````markdown
---
description: Create a new REST API endpoint following project conventions
---

# New API Endpoint

Create a new REST API endpoint for the Recipe API.

## Requirements

- Create the route handler in `src/routes/`
- Add input validation for all parameters
- Include proper error handling with JSON error responses
- Use appropriate HTTP status codes
- Add JSDoc comments with @route, @method, and @param tags
- Follow existing code patterns in the project

## Endpoint Details

Create the endpoint as described by the user's request.

## Checklist

- [ ] Route handler created
- [ ] Input validation added
- [ ] Error handling implemented
- [ ] Route registered in server.js
- [ ] JSDoc comments added
````

### Task 1.2: Use Your Prompt File

1. Open Copilot Chat (Agent Mode recommended)
2. Type `/` to see available prompts — you should see `new-endpoint`
3. Select it and add your specific request:

```
/new-endpoint

GET /api/recipes/search?q=chicken&category=dinner

Search recipes by title (partial, case-insensitive match) with optional
category filter. Return matching recipes sorted by title.
```

**✅ Observe:**
- Copilot follows the template structure
- Input validation is included automatically
- Error handling matches the template requirements
- The checklist items are all addressed

### Task 1.3: Reuse for a Different Endpoint

Use the same prompt file for a completely different endpoint:

```
/new-endpoint

POST /api/recipes/:id/ratings

Add a rating (1-5 stars) with an optional comment to a recipe.
Body: { "stars": 4, "comment": "Delicious!" }
```

**✅ Observe:**
- The same template produces consistent output for different endpoints
- Team members can create endpoints that all follow the same patterns

---

## Exercise 2: Prompt Files with Variables

Prompt files support variables that reference context from your workspace.

### Available Variables

| Variable | Description |
|----------|-------------|
| `${file}` | The active editor file |
| `${selection}` | The currently selected text in the editor |
| `${selectedText}` | Same as `${selection}` |
| `${workspaceFolder}` | The root folder of the workspace |
| `${input:variableName}` | Prompts the user for free-text input when the prompt runs |

You can also reference other files using Markdown links: `[filename](path/to/file.js)`

### Task 2.1: Create a Prompt with File References

Create `.github/prompts/write-tests.prompt.md`:

````markdown
---
description: Generate comprehensive unit tests for a source file
agent: agent
---

# Write Tests

Generate comprehensive unit tests for the specified source file.

## Context

The source file to test: ${file}

## Test Requirements

- Use Vitest as the test framework
- Place tests in `tests/` directory mirroring the `src/` structure
- Name the test file with `.test.js` suffix
- Group tests with `describe` blocks by method/function name
- Use `it` (not `test`) for individual test cases
- Write descriptions as: "should [expected behavior] when [condition]"

## Coverage Requirements

For each exported function or method, include:
1. At least one happy path test
2. At least one error/edge case test
3. Boundary value tests where applicable

## Test Structure Template

```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('[ModuleName]', () => {
  describe('[methodName]', () => {
    it('should [expected] when [condition]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

## Additional Instructions

- Mock external dependencies
- Use `beforeEach` to reset state between tests
- Include both positive and negative test cases
````

### Task 2.2: Use the Variable-Based Prompt

1. Open `src/routes/recipes.js` in the editor (make it the active file)
2. In Copilot Chat, use the prompt:

```
/write-tests
```

**✅ Observe:**
- The `${file}` variable is automatically populated with the active editor file
- Tests are generated specifically for that file's exports
- All the template rules are followed

### Task 2.3: Try with Different Files

Open different files and run the same prompt:

1. Open `src/models/recipe.js` → run `/write-tests`
2. Open `src/data/store.js` → run `/write-tests`

**✅ Observe:** Same consistent test patterns, different file content each time.

### Task 2.4: User Input Variables

Create `.github/prompts/explain.prompt.md`:

````markdown
---
description: Explain code at a specific level of detail
argument-hint: Describe what to explain
---

# Explain Code

Explain the following code: ${file}

Explain at the following level of detail: ${input:level}

Focus your explanation at this level. Be concise but thorough.
````

**✅ Try This:**
1. Open a file and run `/explain`
2. When prompted, enter a detail level like "beginner", "senior developer", or "architecture overview"
3. Observe how the `${input:level}` variable captures your free-text input

---

## Exercise 3: Prompt Metadata — Agent, Model, and Tools

The YAML frontmatter lets you configure which agent, model, and tools a prompt uses.

### Task 3.1: Specify an Agent

The `agent` field controls which agent runs the prompt:

| Value | Description |
|-------|-------------|
| `agent` | Agent mode (can make changes, run commands) |
| `ask` | Ask mode (read-only, answers questions) |
| `plan` | Plan mode (creates an implementation plan) |
| `<custom-agent-name>` | A custom agent you defined (Lab 08) |

Create `.github/prompts/code-review.prompt.md`:

````markdown
---
description: Perform a thorough code review
agent: ask
---

# Code Review

Perform a thorough code review of the currently selected code.

## Code to Review

${selection}

## Review Checklist

### 1. Correctness
- Does the code do what it's supposed to?
- Are there any logical errors?
- Are edge cases handled?

### 2. Security
- Is user input validated and sanitized?
- Are there SQL injection or XSS vulnerabilities?
- Is sensitive data handled properly?

### 3. Performance
- Are there any N+1 query issues?
- Is there unnecessary computation?

### 4. Readability
- Are names descriptive and consistent?
- Is the code self-documenting?

## Output Format

For each issue found, provide:
- **Severity**: 🔴 Critical / 🟡 Warning / 🔵 Suggestion
- **Line(s)**: Where the issue is
- **Issue**: What's wrong
- **Fix**: How to fix it

End with a summary of the overall code quality.
````

> **Note:** This prompt uses `agent: ask` because code review is read-only — it shouldn't make changes.

### Task 3.2: Specify Tools

The `tools` field limits which tools the prompt can use. Create `.github/prompts/research.prompt.md`:

````markdown
---
description: Research a topic using codebase search and web fetch
tools: ['codebase', 'fetch', 'search']
---

# Research

Research the following topic in the context of our Recipe API project:

${input:topic}

## Steps

1. Search the codebase for related code
2. Look up relevant documentation online
3. Summarize findings with code examples

## Output

Provide a summary with:
- What exists in our codebase already
- Relevant external resources
- Recommended approach with code examples
````

### Task 3.3: Reference Files with Markdown Links

You can reference project files directly in prompts using Markdown links. These files are included as context.

Create `.github/prompts/add-feature.prompt.md`:

````markdown
---
description: Build a complete feature following project architecture
agent: agent
---

# Add Feature

Build a complete feature for the Recipe API following our project architecture.

Reference these files for existing patterns:
- [Server setup](../../src/server.js)
- [Route patterns](../../src/routes/recipes.js)
- [Data model](../../src/models/recipe.js)

## Implementation Steps

### 1. Model (if needed)
- Create in `src/models/`
- Include all relevant properties with types
- Add validation methods

### 2. Service
- Create in `src/services/`
- Implement all business logic
- Keep it independent of Express (no req/res)
- Named export only

### 3. Route Handler
- Create in `src/routes/`
- Thin handlers that delegate to the service
- Proper HTTP status codes
- Input validation

### 4. Integration
- Register routes in `src/server.js`
- Update any existing files that need changes

### 5. Tests
- Create in `tests/`
- Cover happy paths and error cases
- Mock external dependencies

### 6. Documentation
- Add JSDoc to all exported functions
- Update README.md with new endpoints
````

Test it:

```
/add-feature

Recipe collections — users can create named collections (like "Weeknight
Dinners" or "Holiday Baking") and add/remove recipes to/from them.
```

---

## Exercise 4: Specialized Prompt Files

### Task 4.1: Database Migration Prompt

Create `.github/prompts/db-migration.prompt.md`:

````markdown
---
description: Create a database migration with up and down functions
agent: agent
---

# Database Migration

Create a database migration for the Recipe API.

## Requirements

- Create a migration file in `src/migrations/` with timestamp prefix
- File name format: `YYYYMMDDHHMMSS-description.js`
- Include both `up()` and `down()` functions
- Use parameterized queries (no string interpolation for values)
- Add appropriate indexes for frequently queried columns

## Migration Template

```javascript
/**
 * Migration: [description]
 * Created: [timestamp]
 */

export async function up(db) {
  // Apply changes
}

export async function down(db) {
  // Reverse changes
}
```
````

### Task 4.2: API Documentation Prompt

Create `.github/prompts/document-api.prompt.md`:

````markdown
---
description: Generate API documentation for endpoints
agent: ask
argument-hint: Describe which endpoints to document
---

# Document API Endpoint

Generate API documentation for the specified endpoint(s).

## Source

${file}

## Documentation Format

### `[METHOD] [PATH]`

**Description:** Brief description of what the endpoint does.

**Parameters:**

| Name | In | Type | Required | Description |
|------|------|------|----------|-------------|

**Request Body** (if applicable):
```json
{
  "example": "value"
}
```

**Responses:**

| Status | Description | Body |
|--------|-------------|------|

**Example Request:**
```bash
curl -X [METHOD] http://localhost:4000[PATH] \
  -H "Content-Type: application/json"
```

**Example Response:**
```json
{
  "example": "response"
}
```
````

### Task 4.3: Use Specialized Prompts

Test each prompt to see how they produce consistent, high-quality output:

```
/db-migration

Add a 'tags' column to the recipes table as a JSON array. Also create a
'recipe_tags' junction table for normalized tag queries.
```

```
/document-api

Document all endpoints in the active file.
```

---

## Exercise 5: Prompt Chaining and Organization

### Task 5.1: Prompt Chaining

Use prompts in sequence to build a complete feature:

1. First, build the feature:
   ```
   /add-feature

   Recipe import from URL — given a URL to a recipe website, extract the
   recipe title, ingredients, and steps, and create a new recipe.
   ```

2. Then, generate tests:
   ```
   /write-tests
   ```
   (with the new service file open)

3. Then, document it:
   ```
   /document-api
   ```

4. Finally, review it:
   ```
   /code-review
   ```
   (select the implementation code)

### Task 5.2: Debug Prompt

Create `.github/prompts/debug-issue.prompt.md`:

````markdown
---
description: Debug and fix an issue in the codebase
agent: agent
tools: ['codebase', 'terminal', 'editFiles']
---

# Debug Issue

Help debug and fix an issue in the Recipe API.

## Context

${file}

## Debugging Steps

1. **Reproduce**: Identify the minimal reproduction steps
2. **Locate**: Find the relevant code causing the issue
3. **Analyze**: Determine the root cause
4. **Fix**: Implement the fix
5. **Verify**: Suggest how to verify the fix works
6. **Prevent**: Suggest a test to prevent regression

## Output Format

### Root Cause
Explain what's causing the issue.

### Fix
Show the code changes needed.

### Test
Provide a test that would catch this bug.

### Prevention
Suggest what could prevent similar issues in the future.
````

### Task 5.3: Running Prompts from the Command Palette

In addition to typing `/` in chat, you can run prompts from:
- **Command Palette**: `Cmd+Shift+P` → "Chat: Run Prompt"
- **Editor**: Click the play button when viewing a `.prompt.md` file

**✅ Try This:** Open one of your prompt files and look for the play button to run it directly.

---

## Exercise 6: Advanced Prompt Techniques

### Task 6.1: Prompt with MCP Tools

If you set up MCP servers in Lab 05, you can reference them in prompt tools:

````markdown
---
description: Fetch and analyze a web resource
tools: ['fetch/*']
---

# Analyze Web Resource

Fetch ${input:url} and analyze its structure.
````

The `fetch/*` syntax includes all tools from the `fetch` MCP server.

### Task 6.2: Team Prompt Standards

Create a `_README.md` in your prompts directory explaining each prompt:

```
/add-feature

Create a _README.md file in .github/prompts/ that documents all our prompt
files with descriptions and example usage for each one.
```

### Task 6.3: Prompt Customization on the Fly

Modify an existing prompt with additional context when running it:

```
/write-tests

Additional requirement: Also include integration tests that test the full
HTTP request/response cycle using supertest.
```

**✅ Observe:** You can extend prompts with additional context on the fly.

---

## Challenges

### Challenge 1: Full Workflow Prompt

Create a prompt that combines multiple steps into one:
- Plan the feature
- Implement it (model, service, routes, tests)
- Document it
- Review it
All from a single prompt invocation.

### Challenge 2: Language-Agnostic Prompts

Modify your prompts to work across languages (JavaScript, Python, C#) by using `${file}` to detect the language and adapt output accordingly.

### Challenge 3: Prompt Composition

Create a "meta-prompt" that generates new prompt files:
```
/add-feature

Create a prompt file for generating Express middleware with error handling,
logging, and request validation. Save it in .github/prompts/.
```

---

## Prompt File Best Practices

### Writing Effective Prompts

| Tip | Example |
|-----|---------|
| **Be specific** | Define exact output format, not vague goals |
| **Include structure** | Use headers, checklists, templates |
| **Add constraints** | Mention what NOT to do |
| **Use variables** | `${file}`, `${selection}`, `${input:name}` for dynamic context |
| **Include examples** | Show expected output format |
| **Set agent mode** | Use `agent: ask` for read-only, `agent: agent` for changes |

### YAML Frontmatter Fields

| Field | Description |
|-------|-------------|
| `description` | Brief description shown in the prompt picker |
| `agent` | Which agent to use: `ask`, `agent`, `plan`, or a custom agent name |
| `model` | AI model to use (e.g., `GPT-4.1`, `Claude Sonnet 4`) |
| `tools` | List of tools available to the prompt |
| `argument-hint` | Hint text shown in the chat input when the prompt is selected |

### Organizing Prompts

| Strategy | Benefit |
|----------|---------|
| **Name by task** | Easy to find: `write-tests`, `code-review` |
| **Keep focused** | Each prompt does one thing well |
| **Document usage** | Add a README to the prompts directory |
| **Version control** | Check prompts into Git for team sharing |
| **Iterate** | Refine prompts based on output quality |

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| **Too vague** | Add specific requirements and output format |
| **Too long** | Focus on one task per prompt |
| **No examples** | Include at least one example of expected output |
| **Wrong agent** | Use `ask` for read-only, `agent` for making changes |
| **No description** | Always add `description` in frontmatter for the picker |

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Prompts are reusable** | Write once, use for every similar task |
| **Variables add flexibility** | `${file}`, `${selection}`, `${input:name}` make prompts dynamic |
| **Metadata controls behavior** | `agent`, `model`, `tools` configure how the prompt runs |
| **Invoked with `/`** | Type `/` in chat to see and run available prompts |
| **Version-controlled** | Check prompts into `.github/prompts/` for team sharing |
| **Composable** | Chain prompts for complex workflows |

---

## What's Next?

You have reusable task templates. Now let's explore custom agents that can orchestrate complex multi-step workflows with specialized personas.

👉 Continue to [Lab 08 - Custom Agents](08-agents.md)

---

## Additional Resources

- [Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

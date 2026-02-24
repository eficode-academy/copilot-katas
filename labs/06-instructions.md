# Lab 06 - Custom Instructions

## Learning Goals

By the end of this lab, you will be able to:
- Understand how custom instructions shape Copilot's behavior
- Create workspace-level instruction files (`.github/copilot-instructions.md`)
- Create file-scoped instruction files (`.instructions.md`) with `applyTo` glob patterns
- Use the `/init` command to generate instructions automatically
- Observe and verify that instructions affect Copilot's output
- Use the diagnostics view to troubleshoot loaded instructions

## Introduction

**Custom Instructions** let you teach Copilot the rules, conventions, and preferences for your project. Instead of repeating things like "use single quotes" or "always return errors as JSON" in every prompt, you write them once and Copilot follows them automatically.

### Why Instructions?

Every team and project has its own standards:
- Naming conventions (camelCase vs. snake_case)
- Error handling patterns
- Test frameworks and styles
- Architecture decisions
- Documentation formats

Without instructions, Copilot guesses based on general patterns. With instructions, it follows **your** team's patterns.

### Types of Custom Instructions

There are two main types:

| Type | File | Scope | Applied |
|------|------|-------|---------|
| **Repository instructions** | `.github/copilot-instructions.md` | Entire workspace | Always — automatically included in every request |
| **File-scoped instructions** | `*.instructions.md` | Files matching a glob pattern | Automatically, when relevant files are open/referenced |

### How Instructions Are Loaded

```
┌───────────────────────────────────────────────────────────┐
│  GitHub Copilot resolves instructions (priority order):   │
│                                                           │
│  1. Personal instructions (VS Code settings)              │  ← highest priority
│  2. .github/copilot-instructions.md                       │  ← repo-level, always on
│  3. .instructions.md files (matching applyTo pattern)     │  ← file-scoped
│  4. Organization-level instructions (if configured)       │  ← lowest priority
└───────────────────────────────────────────────────────────┘
```

Instructions are automatically included as context whenever Copilot generates suggestions, both in chat and inline completion.

### Setting Up for This Lab

Make sure the Recipe API project is ready:

```bash
cd starter-code/recipe-api
npm install
```

---

## Exercise 1: Your First Instructions File

### Task 1.1: Create a Repo-Level Instructions File

Create the file `.github/copilot-instructions.md` in the **recipe-api** project:

```markdown
# Project Instructions for GitHub Copilot

## Project Overview
This is a Recipe Book API built with Express.js and Node.js (ESM modules).

## Code Style
- Use ES module syntax (`import`/`export`), never `require()`
- Use `const` by default, `let` only when reassignment is needed, never `var`
- Use arrow functions for callbacks and anonymous functions
- Use template literals instead of string concatenation
- Always use semicolons at the end of statements
- Use single quotes for strings

## Error Handling
- Always return JSON error responses with an `error` property
- Use appropriate HTTP status codes (400, 404, 422, 500)
- Include a meaningful error message in every error response
- Wrap async route handlers in try/catch blocks

## API Conventions
- Use plural nouns for resource endpoints (e.g., `/api/recipes`, not `/api/recipe`)
- Return 201 for successful creation, 204 for successful deletion
- Include `updatedAt` timestamp on every mutation
- Return the full updated object after PUT/PATCH operations
```

**✅ Try This:**
1. Save the file
2. Open Copilot Chat and ask: `Create a new GET endpoint that returns recipes filtered by category`
3. Observe how the generated code follows your instructions (ES modules, error handling format, etc.)

### Task 1.2: Generate Instructions with `/init`

VS Code can help you create instructions automatically:

1. Open Copilot Chat
2. Type `/init` and press Enter
3. Copilot will analyze your project and generate a suggested `.github/copilot-instructions.md`
4. Compare what it generates with what you wrote manually — note the differences

> **Tip:** `/init` is a quick way to bootstrap instructions for an existing project. You can then customize the generated file to match your exact conventions.

### Task 1.3: Test Without Instructions

1. Temporarily rename the file to `.github/copilot-instructions.md.bak`
2. Ask the same question again in a new chat
3. Compare the output — you may see different code style, error handling, etc.
4. Rename the file back

**✅ Observe:**
- With instructions: consistent code style matching your rules
- Without instructions: Copilot makes its own choices (which may vary)

---

## Exercise 2: Coding Standards in Instructions

### Task 2.1: Add Naming Conventions

Add the following section to your `.github/copilot-instructions.md` file:

```markdown
## Naming Conventions
- Route handler functions: use descriptive names like `listRecipes`, `getRecipeById`
- Variables: camelCase (e.g., `recipeList`, `totalCount`)
- Constants: UPPER_SNAKE_CASE for true constants (e.g., `MAX_PAGE_SIZE`, `DEFAULT_LIMIT`)
- File names: kebab-case (e.g., `recipe-service.js`, `auth-middleware.js`)
- Database columns: snake_case (e.g., `created_at`, `prep_time_minutes`)
```

### Task 2.2: Verify Naming Conventions

In Agent Mode, ask:

```
Create a new service file for recipe search functionality with methods
to search by title, filter by category, and sort by preparation time.
```

**✅ Observe:**
- The file name should be kebab-case (e.g., `recipe-search-service.js`)
- Variable names should be camelCase
- Constants should be UPPER_SNAKE_CASE
- The code follows your project conventions

### Task 2.3: Add Architecture Rules

Add to your instructions:

```markdown
## Architecture
- Keep route handlers thin — business logic belongs in service files under `src/services/`
- Data access goes through repository files under `src/repositories/`
- Validation logic goes in middleware files under `src/middleware/`
- Each service/repository should be a class with a clear single responsibility
- Export named exports, not default exports
```

Now test this:

```
Add input validation for the POST /api/recipes endpoint. Validate that
title is a non-empty string, servings is a positive integer, and
prepTimeMinutes is a non-negative number.
```

**✅ Observe:**
- Copilot should create a middleware file, not inline the validation in the route
- The file should be placed in `src/middleware/`
- Business logic and routing stay separate

---

## Exercise 3: File-Scoped Instructions (`.instructions.md`)

Instead of putting everything in a single repo-level file, you can create **file-scoped instructions** that apply only when working with certain files.

### How `.instructions.md` Files Work

File-scoped instructions use the `.instructions.md` extension and are stored in the `.github/instructions/` folder by default. Each file has YAML frontmatter with an `applyTo` glob pattern:

```markdown
---
applyTo: "**/*.test.js"
---

When writing test code:
- Use Vitest as the test framework
- Use `it` (not `test`) for individual test cases
```

When you're working with a file that matches the `applyTo` pattern, the instructions are automatically applied.

### Task 3.1: Create Test-Specific Instructions

Create `.github/instructions/testing.instructions.md`:

```markdown
---
applyTo: "**/*.test.js"
---

# Test Instructions

When writing test code:
- Use Vitest as the test framework
- Place tests in a `tests/` directory mirroring the `src/` structure
- Name test files with `.test.js` suffix
- Use `describe` blocks grouped by method name
- Use `it` (not `test`) for individual test cases
- Write test descriptions as: "should [expected behavior] when [condition]"
- Always use `beforeEach` to set up fresh test data
- Use factory functions for test data, never inline objects
- Mock external dependencies with `vi.fn()` and `vi.spyOn()`
- Clean up mocks in `afterEach` using `vi.restoreAllMocks()`
```

### Task 3.2: Create Route-Specific Instructions

Create `.github/instructions/routes.instructions.md`:

```markdown
---
applyTo: "src/routes/**/*.js"
---

# Route Handler Instructions

When writing route handlers:
- Every handler must validate request parameters before processing
- Always call `next(error)` instead of sending error responses directly
- Use Express Router for grouping related routes
- Add JSDoc comments with @route, @method, @param, and @returns tags
- Rate limiting considerations should be noted in comments
```

### Task 3.3: Verify File-Scoped Instructions

1. Open a file at `src/routes/recipes.js` and ask Copilot to add a new endpoint — observe the JSDoc comments and `next(error)` usage from the routes instructions
2. Ask Copilot to write a test for it — observe Vitest and the "should ... when ..." format from the testing instructions

**✅ Observe:**
- Route handlers follow the route-specific instructions (JSDoc, `next(error)`)
- Test files follow the test-specific instructions (Vitest, description format)
- Both also incorporate the repo-level instructions (ES modules, error format)

### Task 3.4: Instructions Without `applyTo`

Create `.github/instructions/security.instructions.md` **without** an `applyTo` field:

```markdown
---
description: Security guidelines applied manually
---

# Security Standards

- Never log sensitive data (passwords, tokens, personal information)
- Sanitize all user input before processing
- Use `helmet` middleware for HTTP security headers
- Validate Content-Type header on POST/PUT requests
- Set appropriate CORS origins (never use wildcard in production)
```

> **Note:** When you omit `applyTo`, the instructions are NOT applied automatically. You can still reference them manually in chat by attaching the file. This is useful for instructions you only want applied on demand.

---

## Exercise 4: Verify Instructions with Diagnostics

VS Code provides a diagnostics view to see which instructions, agents, prompts, and skills are loaded.

### Task 4.1: Open the Diagnostics View

1. Right-click in the Chat view
2. Select **Diagnostics**
3. The diagnostics view shows all loaded instruction files, any errors, and which ones apply to the current context

### Task 4.2: Troubleshoot Instructions

Review the diagnostics output:
- Are all your instruction files listed?
- Are there any errors (e.g., missing frontmatter, invalid `applyTo` pattern)?
- Which file-scoped instructions are currently active?

**✅ Try This:**
- Open different files in the editor and see how the active instructions change based on `applyTo` patterns
- Intentionally create a bad `applyTo` pattern and see if the diagnostics catches it

---

## Exercise 5: Advanced Instruction Patterns

### Task 5.1: Technology-Specific Instructions

Add detailed technology guidance to `.github/copilot-instructions.md`:

```markdown
## Express.js Patterns
- Use `express.Router()` for all route groups
- Register error-handling middleware last (4 arguments: err, req, res, next)
- Use `express.json()` middleware for JSON body parsing
- Set response content type explicitly when not using `res.json()`
```

### Task 5.2: Documentation Standards

```markdown
## Documentation
- Every exported function must have a JSDoc comment
- JSDoc must include: @param tags with types, @returns tag, @throws tag if applicable
- Add inline comments only for complex logic (not obvious code)
- Keep a CHANGELOG.md updated with notable changes
- API endpoints must be documented in the README
```

Test this by asking Copilot to create a new feature — observe how it documents the code.

### Task 5.3: Instructions for Generated Code Quality

Ask Copilot to review the existing Recipe API against your instructions:

```
Review the Recipe API code for any violations of the project instructions defined in
.github/copilot-instructions.md and suggest improvements.
```

---

## Exercise 6: Instructions for Team Consistency

### Task 6.1: Create a Comprehensive Instructions File

Combine everything into a polished, team-ready instructions file. Use Agent Mode:

```
Review all the instructions we've created in this project and consolidate them
into a single, well-organized .github/copilot-instructions.md file. Remove
any duplicates and organize by category. Keep it concise but complete.
```

### Task 6.2: Validate Consistency

Test the consolidated instructions by asking Copilot to:

```
Create a complete "recipe ratings" feature with:
1. A rating model
2. A rating service
3. API endpoints for adding and retrieving ratings
4. Input validation middleware
5. Unit tests

Follow all project conventions and instructions.
```

**✅ Observe:** Every aspect of the generated code should be consistent with your instructions — file names, code style, error handling, test patterns, documentation, and architecture.

---

## Challenges

### Challenge 1: Team Onboarding Instructions

Write instructions that would help a new team member's Copilot produce code exactly matching your team's style. Include:
- Git commit message format
- Pull request description template
- Code review checklist items
- Performance guidelines

### Challenge 2: Language-Specific File-Scoped Instructions

Create different `.instructions.md` files for different languages or areas:
- `frontend.instructions.md` with `applyTo: "**/*.{jsx,tsx}"`
- `backend.instructions.md` with `applyTo: "src/services/**/*.js"`
- `database.instructions.md` with `applyTo: "**/*migration*"`

### Challenge 3: Instruction Audit

Use Copilot to audit existing code against your instructions:
```
Read the .github/copilot-instructions.md and then review every file in src/.
List all violations of our coding standards and suggest fixes for each.
```

---

## Custom Instructions Best Practices

### What to Include

| Category | Examples |
|----------|---------|
| **Code style** | Quote style, semicolons, indentation |
| **Naming** | File names, variables, functions, classes |
| **Architecture** | Folder structure, separation of concerns |
| **Error handling** | Error format, status codes, logging |
| **Testing** | Framework, naming, patterns |
| **Documentation** | Format, required comments, README |
| **Security** | Input validation, authentication, logging |

### What to Avoid

| Don't | Why |
|-------|-----|
| **Overly long instructions** | Copilot has context limits — keep it focused |
| **Contradictory rules** | Creates confusion and inconsistent output |
| **Implementation details** | Instructions should be about *what*, not *how* |
| **Obvious rules** | Don't state things Copilot already does well |

### Tips

- Keep instructions under ~1000 words for best results
- Update instructions as your project evolves
- Use markdown formatting for clarity
- Test instructions by asking Copilot to generate code and reviewing compliance
- Check your instructions into version control so the whole team benefits
- Use `/init` to bootstrap instructions for existing projects
- Use the diagnostics view (right-click in Chat → Diagnostics) to verify instructions are loaded

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Repo-level instructions** | `.github/copilot-instructions.md` — always applied to every request |
| **File-scoped instructions** | `*.instructions.md` files with `applyTo` glob patterns in `.github/instructions/` |
| **Priority order** | Personal > Repository > Organization-level |
| **Generate with `/init`** | Quickly bootstrap instructions from your project |
| **Diagnostics** | Right-click in Chat → Diagnostics to see loaded instructions |
| **Keep them focused** | Concise, clear, and non-contradictory for best results |

---

## What's Next?

You've taught Copilot your project's rules. Now let's create reusable prompt templates to speed up common tasks.

👉 Continue to [Lab 07 - Prompt Files](07-prompts.md)

---

## Additional Resources

- [Custom Instructions Documentation](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Copilot Settings](https://code.visualstudio.com/docs/copilot/copilot-settings)

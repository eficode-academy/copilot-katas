# Lab 08 - Custom Agents

## Learning Goals

By the end of this lab, you will be able to:
- Understand what custom agents are and how they extend Copilot
- Create custom agent files (`.agent.md`) with YAML frontmatter
- Define agent tools, instructions, and behaviors
- Use handoffs to create multi-agent workflows
- Switch between agents using the agents dropdown
- Use the `/agents` command and diagnostics to manage agents

## Introduction

**Custom Agents** let you create specialized AI personas in Copilot Chat that are tuned for specific workflows. While the built-in agents (Agent, Ask, Plan) are generalists, custom agents are experts at particular tasks — each with their own instructions, tools, and behavior.

### Why Custom Agents?

Different tasks require different capabilities:

| Built-in Agents | Custom Agents |
|-----------------|---------------|
| General-purpose | Domain-specific |
| Default system prompt | Your custom instructions |
| All tools available | Curated tool selection |
| No predefined workflow | Follows defined workflows |
| One size fits all | Tailored to your team's needs |

For example, a planning agent might only need read-only tools for research, while an implementation agent needs full editing capabilities.

### How Custom Agents Work

Custom agents are defined as `.agent.md` files and stored in your workspace or user profile:

```
.github/
├── copilot-instructions.md        ← global instructions (Lab 06)
├── agents/
│   ├── api-builder.agent.md       ← custom agent
│   ├── test-writer.agent.md       ← custom agent
│   └── reviewer.agent.md          ← custom agent
└── prompts/
    └── ...                        ← prompt files (Lab 07)
```

Custom agents appear in the **agents dropdown** at the top of the Chat view, alongside the built-in agents. Select one to switch to that agent.

### Agent File Structure

Every `.agent.md` file has:

1. **YAML frontmatter** (optional) — metadata like description, tools, model, handoffs
2. **Body** — instructions and guidelines in Markdown

````markdown
---
description: Expert API developer for building endpoints
tools: ['codebase', 'terminal', 'editFiles']
---

You are an API developer. When building endpoints, always...
````

### Setting Up for This Lab

Make sure the Recipe API project is ready:

```bash
cd starter-code/recipe-api
npm install
```

Create the agents directory:

```bash
mkdir -p .github/agents
```

---

## Exercise 1: Your First Custom Agent

### Task 1.1: Create an API Builder Agent

Create the file `.github/agents/api-builder.agent.md`:

````markdown
---
description: Expert Express.js API developer for building REST endpoints
tools: ['codebase', 'terminal', 'editFiles', 'search']
---

# API Builder

You are an expert Express.js API developer specializing in RESTful API design.

## Role

You build clean, well-structured API endpoints for the Recipe Book API.
You follow REST best practices and the project's coding conventions.

## Behavior

When asked to create or modify API endpoints:

1. **Analyze** the existing routes to understand patterns
2. **Design** the endpoint following REST conventions
3. **Implement** the route handler with proper validation
4. **Add error handling** with appropriate HTTP status codes
5. **Register** the route in the server
6. **Document** the endpoint with JSDoc comments

## Rules

- Always use Express Router for route grouping
- Validate all input parameters and request body fields
- Return consistent JSON response shapes:
  - Success: `{ "data": ... }`
  - Error: `{ "error": "message" }`
- Use appropriate HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Include pagination for list endpoints (limit/offset)
- Add request logging for debugging

## Response Format

When creating a new endpoint, always present:
1. The endpoint specification (method, path, params, body)
2. The implementation code
3. A curl command to test it
4. Expected responses for success and error cases
````

### Task 1.2: Use the API Builder Agent

1. Open the **agents dropdown** at the top of the Chat view
2. Select **api-builder** from the list
3. Send your request:

```
Create a GET /api/recipes/categories endpoint that returns all unique
categories from existing recipes with a count of recipes in each category.

Example response:
{
  "data": [
    { "category": "breakfast", "count": 1 },
    { "category": "dinner", "count": 1 },
    { "category": "drinks", "count": 1 }
  ]
}
```

**✅ Observe:**
- The agent follows its defined behavior (analyze, design, implement, etc.)
- Response format matches the rules (wrapped in `{ "data": ... }`)
- Includes curl test commands
- Documentation is added automatically
- Only the tools specified in `tools` are available

### Task 1.3: Quick Agent Access with `/agents`

Type `/agents` in the chat input to quickly open the **Configure Custom Agents** menu. From here you can:
- Create new agents
- Edit existing agents
- Show/hide agents from the dropdown

---

## Exercise 2: A Testing Agent

### Task 2.1: Create a Test Writer Agent

Create `.github/agents/test-writer.agent.md`:

````markdown
---
description: Senior QA engineer who writes thorough test suites
tools: ['codebase', 'editFiles', 'search']
---

# Test Writer

You are a senior QA engineer who writes thorough, well-structured tests.

## Role

You create comprehensive test suites for the Recipe Book API, ensuring
high code coverage and catching edge cases that developers often miss.

## Behavior

When asked to write tests:

1. **Read** the source file to understand all functions and their behavior
2. **Identify** all code paths, edge cases, and error conditions
3. **Plan** the test structure before writing any code
4. **Write** tests following the AAA pattern (Arrange, Act, Assert)
5. **Review** the tests for completeness and suggest additional coverage

## Testing Standards

- Framework: Vitest
- Test file location: `tests/` directory, mirroring `src/` structure
- Naming: `[filename].test.js`
- Use `describe` for grouping, `it` for individual tests
- Description format: `should [expected] when [condition]`
- Always use `beforeEach` for setup, `afterEach` for cleanup
- Mock external dependencies with `vi.fn()` and `vi.spyOn()`

## Test Categories

For each function, always include:

### Happy Path Tests
- Normal input produces expected output
- All return values are correct

### Error Tests
- Invalid input is rejected
- Missing required fields throw errors
- Boundary values are handled

### Edge Case Tests
- Empty arrays/objects
- Very large inputs
- Special characters in strings

## Response Format

Always present tests in this structure:
1. Test plan (what will be tested and why)
2. Test code
3. Coverage summary (what percentage of code paths are covered)
4. Suggested additional tests (things not covered but should exist)

## Rules

- Never test implementation details — test behavior
- Each test should be independent (no test ordering dependencies)
- Use factory functions for test data, never inline literals
- Keep test descriptions readable by non-developers
````

### Task 2.2: Use the Test Writer Agent

Switch to your test-writer agent from the dropdown, then:

```
Write a complete test suite for src/routes/recipes.js covering all
HTTP endpoints (GET, POST, PUT, DELETE).
```

**✅ Observe:**
- The agent first reads the source file
- It creates a test plan before writing code
- Tests follow AAA pattern strictly
- Edge cases are included that you might not think of
- A coverage summary is provided

---

## Exercise 3: Agent with Handoffs

Handoffs let agents suggest transitions to other agents, creating guided workflows.

### Task 3.1: Create a Planner Agent with Handoffs

Create `.github/agents/planner.agent.md`:

````markdown
---
description: Generate an implementation plan before coding
tools: ['codebase', 'search', 'fetch']
handoffs:
  - label: Start Implementation
    agent: api-builder
    prompt: Implement the plan outlined above.
    send: false
  - label: Write Tests First
    agent: test-writer
    prompt: Write failing tests based on the plan above, then I'll implement them.
    send: false
---

# Planner

You are a senior architect who creates detailed implementation plans.

## Role

You analyze requirements and create step-by-step implementation plans.
You do NOT write code — you plan what needs to be built.

## Behavior

1. **Analyze** the requirement and break it into tasks
2. **Research** the existing codebase to understand current patterns
3. **Plan** each component that needs to be created or modified
4. **Identify** risks, edge cases, and dependencies
5. **Present** a clear, ordered implementation plan

## Plan Format

### Overview
One paragraph summary of the feature.

### Tasks
Numbered list of implementation steps with:
- What to create/modify
- File path
- Key decisions and considerations

### Risks
Potential issues and mitigation strategies.

## Rules

- Never write implementation code, only pseudo-code or interfaces
- Always reference specific files in the project
- Consider backward compatibility
- Think about testing from the start
````

### Task 3.2: Use the Handoff Workflow

1. Select the **planner** agent from the dropdown
2. Ask it to plan a feature:

```
Plan a recipe import feature that can parse recipes from a URL.
```

3. After the plan is generated, you'll see **handoff buttons** at the bottom:
   - "Start Implementation" → switches to the api-builder agent
   - "Write Tests First" → switches to the test-writer agent
4. Click one of the buttons to transition to the next agent with context

**✅ Observe:**
- The planner creates a plan without writing code
- Handoff buttons appear after the response
- Clicking a handoff switches to the target agent with the pre-filled prompt
- The target agent has context from the planning step

### Task 3.3: Auto-Send Handoffs

You can set `send: true` on a handoff to automatically submit the prompt when clicked. This creates a fully automated workflow. Try editing the planner agent to set `send: true` on one of the handoffs and observe the difference.

---

## Exercise 4: A Code Reviewer Agent

### Task 4.1: Create a Reviewer Agent

Create `.github/agents/reviewer.agent.md`:

````markdown
---
description: Meticulous code reviewer focused on quality and security
tools: ['codebase', 'search']
---

# Code Reviewer

You are a meticulous senior developer performing code reviews.

## Role

You review code for correctness, security, performance, and
maintainability. You provide actionable, constructive feedback.

## Behavior

1. **Read** the code carefully, understanding the full context
2. **Check** against the project's coding standards
3. **Evaluate** correctness, security, performance, and readability
4. **Provide** specific, actionable feedback with severity levels
5. **Suggest** improvements with code examples

## Review Checklist

### Correctness
- [ ] Logic is correct for all inputs
- [ ] Edge cases are handled
- [ ] Error paths return appropriate responses

### Security
- [ ] User input is validated and sanitized
- [ ] No SQL injection vulnerabilities
- [ ] No sensitive data in logs or responses

### Performance
- [ ] No unnecessary loops or iterations
- [ ] No memory leaks

### Maintainability
- [ ] Code is self-documenting
- [ ] Functions have single responsibility
- [ ] Consistent naming conventions

## Severity Levels

- 🔴 **Blocker**: Must fix before merge — bugs, security issues, data loss
- 🟡 **Warning**: Should fix — code smells, minor issues, missing validation
- 🔵 **Suggestion**: Nice to have — style improvements, better naming
- 💡 **Note**: Informational — alternatives to consider

## Response Format

### Summary
Brief overall assessment (1-2 sentences).

### Issues Found
For each issue:
- **Severity**: 🔴/🟡/🔵/💡
- **File**: file path and line
- **Issue**: what's wrong
- **Suggestion**: how to fix (with code)

### Verdict
APPROVE / REQUEST CHANGES / NEEDS DISCUSSION

## Rules

- Be constructive, not critical
- Explain the "why" behind every suggestion
- Acknowledge good patterns when you see them
````

### Task 4.2: Run a Code Review

Switch to the reviewer agent and ask:

```
Review the recipe routes file at src/routes/recipes.js for any issues.
```

---

## Exercise 5: Agent Configuration — Model and Visibility

### Task 5.1: Specify a Model

You can set which AI model an agent uses:

````markdown
---
description: Documentation writer using a specific model
model: GPT-4.1
tools: ['codebase', 'search']
---
````

You can also specify a **prioritized list** of models. The system tries each in order until one is available:

````markdown
---
model:
  - Claude Sonnet 4.5
  - GPT-4.1
  - Gemini 2.5 Pro
---
````

### Task 5.2: Control Agent Visibility

Use `user-invokable` and `disable-model-invocation` to control how agents appear:

| Setting | Effect |
|---------|--------|
| Default (both omitted) | Appears in dropdown + available as subagent |
| `user-invokable: false` | Hidden from dropdown, but available as subagent |
| `disable-model-invocation: true` | Visible in dropdown, but can't be used as subagent |

Create a utility agent that should only be called by other agents:

````markdown
---
description: Internal helper for code formatting tasks
user-invokable: false
tools: ['editFiles']
---

# Code Formatter (internal)

Reformat code following project conventions. This agent is used
by other agents as a subagent, not directly by users.
````

### Task 5.3: Verify with Diagnostics

1. Right-click in the Chat view → **Diagnostics**
2. Check that all your agents are listed
3. Verify tools, visibility, and any configuration errors

---

## Exercise 6: Multi-Agent Collaboration

### Task 6.1: End-to-End Workflow

Use multiple agents in sequence to build a feature completely:

**Step 1** — Plan it (switch to `planner`):
```
Plan a PATCH /api/recipes/:id/ingredients endpoint that allows adding,
removing, or updating individual ingredients without replacing the entire list.
```

**Step 2** — Build it (click "Start Implementation" handoff, or switch to `api-builder`):
```
Implement the plan from the previous step.
```

**Step 3** — Test it (switch to `test-writer`):
```
Write tests for the new ingredients endpoint that was just created.
```

**Step 4** — Review it (switch to `reviewer`):
```
Review the ingredients endpoint implementation and its tests.
```

**✅ Observe:**
- Each agent has a distinct perspective and expertise
- The workflow produces high-quality, thoroughly vetted code
- Consistent standards are maintained across all steps
- Handoffs make the transitions seamless

### Task 6.2: Agent Feedback Loop

Use the reviewer to improve code generated by other agents:

1. Have the `api-builder` create an endpoint
2. Have the `reviewer` review it
3. Feed the review comments back to `api-builder`:

```
The reviewer found these issues:
[paste reviewer feedback]

Please fix all the issues and update the implementation.
```

---

## Challenges

### Challenge 1: DevOps Agent

Create an agent that specializes in:
- Dockerfile creation
- CI/CD pipeline configuration
- Environment variable management
- Deployment strategies

Include handoffs to transition from implementation → deployment.

### Challenge 2: Agent Orchestrator

Create an agent with handoffs to all other agents, acting as a project manager:
- Accept a feature request
- Hand off to planner → api-builder → test-writer → reviewer
- Each step transitions with context

### Challenge 3: Read-Only vs. Write Agents

Create paired agents where one can only read/plan and the other can only write:
- `analyzer.agent.md` with `tools: ['codebase', 'search']`
- `implementer.agent.md` with `tools: ['editFiles', 'terminal']`
- Add handoffs between them

---

## Custom Agent Best Practices

### YAML Frontmatter Fields

| Field | Description |
|-------|-------------|
| `description` | Brief text shown as placeholder in chat input |
| `name` | Display name (defaults to filename if omitted) |
| `tools` | List of available tools/tool sets |
| `model` | AI model to use (string or prioritized array) |
| `handoffs` | List of suggested transitions to other agents |
| `user-invokable` | Whether the agent appears in the dropdown (default: `true`) |
| `disable-model-invocation` | Prevent use as a subagent (default: `false`) |
| `argument-hint` | Hint text shown in the chat input |

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Single expertise** | Each agent should do one thing well |
| **Clear instructions** | Be specific about behavior and output format |
| **Curated tools** | Only include tools the agent actually needs |
| **Defined workflow** | Agents should follow repeatable steps |
| **Consistent output** | Define exact response format for predictability |
| **Use handoffs** | Connect agents into workflows for complex tasks |

### Agent Naming

| Good Names | Why |
|------------|-----|
| `api-builder` | Action-oriented, clear purpose |
| `test-writer` | Defines the task |
| `reviewer` | Obvious role |
| `planner` | Clear workflow step |

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| **Too broad** | Split into multiple focused agents |
| **No output format** | Define exact response structure |
| **Too many tools** | Only include what the agent needs |
| **No handoffs** | Connect agents for sequential workflows |

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Agents are specialists** | Each agent excels at one specific workflow |
| **`.agent.md` files** | Stored in `.github/agents/` with YAML frontmatter |
| **Tools control capability** | Curate which tools each agent can access |
| **Handoffs create workflows** | Guide users through multi-step agent transitions |
| **Dropdown access** | Select agents from the agents dropdown in Chat |
| **`/agents` command** | Quick access to configure and manage agents |
| **Shareable** | Check agents into Git for team-wide use |

---

## What's Next?

You've built a team of specialized agents. Now let's explore how to create skills that add deep domain knowledge to Copilot.

👉 Continue to [Lab 09 - Skills](09-skills.md)

---

## Additional Resources

- [Custom Agents Documentation](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Agent Tools in VS Code](https://code.visualstudio.com/docs/copilot/agents/agent-tools)

# Trainer Guide

This guide is for trainers running the GitHub Copilot Katas workshop.

## Workshop Overview

| Lab | Duration | Focus |
|-----|----------|-------|
| Lab 00 - Getting Started | 15 min | Setup and verification |
| Lab 01 - Inline Completion | 30-45 min | Core Copilot features |
| Lab 02 - Chat Window | 30-45 min | Conversational AI |
| Lab 03 - Agent Mode | 45-60 min | Autonomous tasks |
| Lab 04 - Plan Mode | 30-45 min | Planned implementation |
| Lab 05 - MCP | 45-60 min | External tools via Model Context Protocol |
| Lab 06 - Instructions | 30-45 min | Custom coding standards |
| Lab 07 - Prompts | 30-45 min | Reusable prompt templates |
| Lab 08 - Agents | 45-60 min | Custom agent modes |
| Lab 09 - Skills | 30-45 min | Domain expertise encoding |

**Part 1 (Core Features):** 2.5 - 4 hours (Labs 00-04, Todo App)
**Part 2 (Advanced Customization):** 3 - 4.5 hours (Labs 05-09, Recipe API)
**Full Workshop:** 5.5 - 8.5 hours (can be split across two sessions)

---

## Preparation Checklist

### Before the Workshop

- [ ] Ensure all participants have GitHub Copilot access
- [ ] Verify VS Code is installed on all machines
- [ ] Clone the repository to a central location
- [ ] Test the starter code for each language (Todo App)
- [ ] Test the Recipe API project (`starter-code/recipe-api/`)
- [ ] Verify `npx` works for MCP server installation (Labs 05+)
- [ ] Prepare backup solutions in case of issues

### Room Setup

- [ ] Projector/screen for demonstrations
- [ ] Internet connectivity for all participants
- [ ] Access to this repository

---

## Teaching Tips

### Lab 01 - Inline Completion

**Key Points to Emphasize:**
- Quality of comments directly affects quality of suggestions
- Tab to accept, Esc to dismiss, Alt+] for alternatives
- Copilot learns from context (open files, patterns)

**Common Issues:**
- Participants accepting first suggestion without review
- Not providing enough context in comments
- Expecting perfect code on first try

**Demo Ideas:**
1. Show the difference between vague and specific comments
2. Demonstrate partial accept (word by word)
3. Show how opening related files improves suggestions

### Lab 02 - Chat Window

**Key Points to Emphasize:**
- Slash commands for quick actions
- Context references (@workspace, #file) are powerful
- Multi-turn conversations build understanding

**Common Issues:**
- Forgetting to use context references
- Asking overly broad questions
- Not iterating on responses

**Demo Ideas:**
1. Show `/explain` on a complex function
2. Demonstrate `@workspace` for cross-file questions
3. Show a multi-turn refactoring conversation

### Lab 03 - Agent Mode

**Key Points to Emphasize:**
- Agent works autonomously - give goals not steps
- Review terminal commands before allowing
- Best for complex, multi-step tasks

**Common Issues:**
- Giving too detailed instructions (micromanaging)
- Not reviewing changes thoroughly
- Expecting perfection on first try

**Demo Ideas:**
1. Generate a complete test suite
2. Create a new feature end-to-end
3. Show the agent exploring the codebase

### Lab 04 - Plan Mode

**Key Points to Emphasize:**
- Plan Mode helps structure complex work before execution
- Encourages thinking before coding
- Plans can be iterated on before any code is written
- Great for large features or unfamiliar codebases

**Common Issues:**
- Skipping the planning phase and jumping to execution
- Not iterating on the plan before implementing
- Plans that are too vague or too detailed

**Demo Ideas:**
1. Plan a new feature with multiple components
2. Show how to refine a plan through conversation
3. Demonstrate executing a plan step by step

---

### Lab 05 - MCP (Model Context Protocol)

**Key Points to Emphasize:**
- MCP extends Copilot with tools, resources, prompts, and apps
- Install from the gallery (`@mcp` in Extensions view) or configure in `.vscode/mcp.json`
- Two server types: `stdio` (local) and `http`/`sse` (remote)
- Use `${input:id}` for API keys — never hardcode secrets
- Trust matters — VS Code prompts before starting new servers

**Common Issues:**
- MCP server not starting (check `npx` is available, check trust dialog)
- Confusing stdio vs. HTTP server configuration
- Not understanding what tools are available (use Configure Tools button)
- Forgetting to start the local API before using fetch

**Demo Ideas:**
1. Install an MCP server from the gallery and show trust flow
2. Show the Fetch MCP tool reading live API data
3. Configure an HTTP server (e.g., GitHub MCP) alongside a stdio server
4. Show MCP Resources via Add Context menu

**Setup Note:** Participants need Node.js 18+ and `npx` available. Have them run `npm install` in `starter-code/recipe-api/` before starting.

### Lab 06 - Custom Instructions

**Key Points to Emphasize:**
- Instructions shape Copilot's output automatically
- Repo-level (`.github/copilot-instructions.md`) vs. file-scoped (`.instructions.md` with `applyTo` globs)
- Use `/init` command to auto-generate instructions from codebase
- Use diagnostics view (right-click in Chat) to verify loaded instructions
- Priority order: Personal > Repository > Organization

**Common Issues:**
- Instructions too long (hitting context limits)
- Contradictory rules causing inconsistent output
- Not testing instructions by generating code
- Forgetting to create a new chat after changing instructions

**Demo Ideas:**
1. Show the before/after of code generation with and without instructions
2. Create a file-scoped `.instructions.md` with `applyTo` targeting specific files
3. Use `/init` to generate instructions, then customize them
4. Show diagnostics view to verify which instructions are active

### Lab 07 - Prompt Files

**Key Points to Emphasize:**
- Prompts are reusable task templates stored as `.prompt.md` files
- Variables (`${file}`, `${selection}`, `${input:name}`) make prompts dynamic
- YAML frontmatter configures description, agent mode, model, and tools
- Prompts appear as `/` commands in chat
- Build a library of prompts for common team tasks

**Common Issues:**
- Confusing prompts with instructions (prompts = tasks, instructions = rules)
- Prompts that are too rigid (no room for variation)
- Not using variables for dynamic content
- Not organizing prompts with clear naming

**Demo Ideas:**
1. Create an endpoint using a prompt, then reuse for a different endpoint
2. Show `${file}` and `${input:name}` variables in action
3. Demonstrate extending a prompt with extra instructions

### Lab 08 - Custom Agents

**Key Points to Emphasize:**
- Agents are `.agent.md` files with YAML frontmatter (description, tools, model)
- Select agents from the **agents dropdown** in the Chat view
- Each agent should have one clear expertise with curated tools
- **Handoffs** enable multi-agent workflows (plan → build → test → review)
- Use `/agents` command to quickly manage agents

**Common Issues:**
- Agent scope too broad (try to do everything)
- Missing response format definition
- Not defining specific behaviors (steps 1, 2, 3)
- Confusing agents with prompts

**Demo Ideas:**
1. Switch between agents using the dropdown: planner → api-builder → test-writer → reviewer
2. Show handoff buttons appearing after a planner response
3. Compare output from custom agent vs. default Agent Mode

### Lab 09 - Custom Skills

**Key Points to Emphasize:**
- Skills are `SKILL.md` files inside named directories (e.g., `.github/skills/recipe-validation/SKILL.md`)
- **Automatic discovery** — Copilot finds relevant skills based on context
- **Progressive 3-level loading** — discovery → instructions → resources
- `name` in frontmatter must match the directory name
- Description is critical — it determines if the skill gets loaded
- Use `/skills` command to manage and inspect skills

**Common Issues:**
- `name` not matching directory name (skill won't load)
- Vague description (Copilot can't determine relevance)
- Skills too abstract (not enough concrete data like tables, schemas)
- Confusing skills with instructions

**Demo Ideas:**
1. Show automatic discovery: ask about validation and watch the skill get loaded
2. Demonstrate a skill with supporting resources (tables, templates)
3. Create a feature with an agent that automatically uses multiple skills
4. Show visibility controls (`user-invokable`, `disable-model-invocation`)

---

## Facilitation Script

### Opening (5 min)

"Welcome to GitHub Copilot Katas! Today we'll learn to be effective AI pair programmers.

Copilot isn't about replacing developers - it's about augmenting your capabilities. Think of it as a very knowledgeable pair programmer who:
- Never gets tired
- Has seen millions of code patterns
- Can generate boilerplate instantly
- Helps you learn new technologies

But remember: YOU are still the pilot. Copilot suggests, you decide."

### Between Labs

Take 2-3 minutes between labs to:
1. Ask what participants found most useful
2. Address common challenges
3. Preview the next lab

### Closing (5 min)

"Key takeaways:
1. Better prompts = better suggestions
2. Context is everything
3. Always review before accepting
4. Use the right mode for the task
5. Iterate quickly - don't accept if it's not right
6. Customize Copilot for your team (instructions, prompts, agents, skills)
7. Extend Copilot's reach with MCP tools"

---

## Troubleshooting

### Copilot Not Working

1. Check the Copilot icon in status bar
2. Verify subscription at github.com/settings/copilot
3. Try signing out and back in
4. Reload VS Code window

### No Suggestions

1. Ensure file has correct extension
2. Check Copilot is enabled for the language
3. Try typing a comment first
4. Check if file is too large (Copilot has limits)

### Chat Not Responding

1. Check internet connectivity
2. Reload VS Code window
3. Clear chat with `/clear`
4. Try a simpler prompt

---

## Extension Ideas

### For Shorter Sessions

- **Half-day (Core):** Focus on Labs 00-04 only (Todo App)
- **Half-day (Advanced):** Focus on Labs 05-09 only (Recipe API, assumes Copilot familiarity)
- Use pre-built code for later exercises
- Do demos instead of hands-on for advanced features

### For Longer Sessions

- Run the full workshop across two sessions (Part 1 + Part 2)
- Add code review exercises
- Include debugging scenarios
- Add team collaboration exercises

### For Advanced Groups

- Start from Lab 05 (skip core features if audience is familiar)
- Build custom MCP servers in Lab 05
- Create comprehensive agent teams in Lab 08
- Build a full skill library in Lab 09
- Combine all customization features into a polished team setup

---

## Solutions

Reference solutions for each exercise are available in the `solutions/` directory. Use these when:
- Participants get stuck
- Demonstrating "correct" implementations
- Comparing approaches

---

## Feedback Collection

At the end of the workshop, consider asking:

1. What was the most useful feature you learned?
2. What would you like to explore more?
3. How will you use Copilot in your daily work?
4. What challenges do you anticipate?

---

## Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Tips](https://code.visualstudio.com/docs/copilot/overview)
- [Prompt Engineering Guide](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot)

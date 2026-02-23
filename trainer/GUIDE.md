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

**Total Workshop Time:** 2.5 - 4 hours (depending on depth)

---

## Preparation Checklist

### Before the Workshop

- [ ] Ensure all participants have GitHub Copilot access
- [ ] Verify VS Code is installed on all machines
- [ ] Clone the repository to a central location
- [ ] Test the starter code for each language
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
5. Iterate quickly - don't accept if it's not right"

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

- Focus on Labs 00-02 only
- Use pre-built code for later exercises
- Do demos instead of hands-on for advanced features

### For Longer Sessions

- Add code review exercises
- Include debugging scenarios
- Add team collaboration exercises
- Explore custom instructions

### For Advanced Groups

- Explore MCP tools integration
- Build custom VS Code commands
- Integrate with CI/CD workflows
- Create coding standards with Copilot

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

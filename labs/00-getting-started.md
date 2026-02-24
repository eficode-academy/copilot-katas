# Lab 00 - Getting Started

## Learning Goals

By the end of this lab, you will:
- Have GitHub Copilot properly installed and activated
- Understand the basic Copilot interface elements
- Verify that Copilot is working correctly in your environment
- Have your project set up and ready for the exercises

## Prerequisites

### VS Code Extensions

Install the following extensions from the VS Code Marketplace:

1. **GitHub Copilot** (`GitHub.copilot`)
2. **GitHub Copilot Chat** (`GitHub.copilot-chat`)

To install, press `Cmd+Shift+X` (Mac) or `Ctrl+Shift+X` (Windows/Linux), search for the extension name, and click Install.

### Verify Your Subscription

GitHub Copilot requires an active subscription. You can verify your status by:
1. Opening VS Code
2. Looking for the Copilot icon in the status bar (bottom right)
3. The icon should be active (not grayed out or showing an error)

## Terminology

Before we begin, let's clarify some terms:

- **Inline Completion**: Code suggestions that appear directly in your editor as you type (ghost text)
- **Copilot Chat**: A chat interface for interacting with Copilot conversationally
- **Ask Mode**: Read-only chat for questions and explanations
- **Agent Mode**: Autonomous multi-step task execution
- **Plan Mode**: Plan an implementation before executing it
- **Ghost Text**: The grayed-out suggestions that appear as you type
- **Context**: Information Copilot uses to generate relevant suggestions (open files, comments, etc.)

## Setting Up Your Project

### Step 1: Choose Your Language

Navigate to the starter code for your chosen language:

| Language | Command |
|----------|---------|
| JavaScript | `cd starter-code/javascript` |
| Python | `cd starter-code/python` |
| C# | `cd starter-code/csharp` |

### Step 2: Install Dependencies

**JavaScript:**
```bash
cd starter-code/javascript
npm install
```

**Python:**
```bash
cd starter-code/python
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**C#:**
```bash
cd starter-code/csharp
dotnet restore
```

### Step 3: Verify the Setup

**JavaScript:**
```bash
npm start
# Open http://localhost:3000 in your browser
```

**Python:**
```bash
python src/main.py
# Open http://localhost:3000 in your browser
```

**C#:**
```bash
dotnet run
# Open http://localhost:3000 in your browser
```

You should see a basic page with "Todo App - Coming Soon" message.

## Exercise: Verify Copilot is Working

Let's make sure Copilot is functioning correctly.

### Task 1: Test Inline Completion

1. Open the main source file for your language:
   - JavaScript: `src/app.js`
   - Python: `src/todo.py`
   - C#: `src/Todo.cs`

2. Type the following comment and press Enter:
   ```
   // Function to add two numbers
   ```

3. Wait a moment. Copilot should suggest a function implementation.

4. Press `Tab` to accept the suggestion, or `Esc` to dismiss it.

**✅ Success Criteria:** You see a function suggestion appear as ghost text.

### Task 2: Test Copilot Chat

1. Open Copilot Chat by pressing `Cmd+Shift+I` (Mac) or `Ctrl+Shift+I` (Windows/Linux)
   - Or click the chat icon next to the search bar at the top.

2. Make sure you're in "Ask Mode" 
   <p><img src="images/ask-mode.png" alt="Ask mode"/></p>
3. Type the following prompt:
   ```
   What is a Todo application?
   ```

4. Copilot should respond with an explanation.

**✅ Success Criteria:** You receive a helpful response about Todo applications.

### Task 3: Explore Copilot Settings

1. Open VS Code Settings (`Cmd+,` or `Ctrl+,`)
2. Search for "Copilot"
3. Explore the available settings:
   - `GitHub Copilot: Enable` - Toggle Copilot on/off
   - `GitHub Copilot: Inline Suggest Enable` - Toggle inline suggestions

💡 **Tip**: You can quickly toggle Copilot in-line suggestions on/off by clicking the Copilot icon in the status bar in the bottom right corner.

## Keyboard Shortcuts Reference

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Accept suggestion | `Tab` | `Tab` |
| Dismiss suggestion | `Esc` | `Esc` |
| See next suggestion | `-` | `Alt+]` |
| See previous suggestion | `-` | `Alt+[` |
| Open Copilot Chat | `Cmd+Shift+I` | `Ctrl+Shift+I` |
| Inline Chat | `Cmd+I` | `Ctrl+I` |
| Show all suggestions | `Ctrl+Enter` | `Ctrl+Enter` |

## Troubleshooting

### Copilot Icon Shows Error
- Sign out and sign back into GitHub in VS Code
- Check your subscription status at github.com/settings/copilot

### No Suggestions Appearing
- Check that Copilot is enabled for the current language
- Ensure you're in a code file (not plain text)
- Try typing a comment or partial function

### Chat Not Responding
- Check your internet connection
- Try reloading VS Code (`Cmd+Shift+P` → "Reload Window")

## Ready for the Next Lab?

Great job setting up your environment! You're now ready to dive into the first real exercise.

👉 Continue to [Lab 01 - Inline Code Completion](01-inline-completion.md)

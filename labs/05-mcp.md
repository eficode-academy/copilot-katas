# Lab 05 - MCP (Model Context Protocol)

## Learning Goals

By the end of this lab, you will be able to:
- Understand what MCP is and why it matters for AI-assisted development
- Install MCP servers from the MCP server gallery in VS Code
- Configure MCP servers manually in the `mcp.json` file
- Understand the different server types (stdio and HTTP/SSE)
- Use MCP tools, resources, and prompts in Copilot Chat
- Use input variables to handle sensitive data like API keys
- Manage, troubleshoot, and trust MCP servers

## Introduction

**Model Context Protocol (MCP)** is an open standard for connecting AI models to external tools and services. In VS Code, MCP servers provide tools for tasks like file operations, databases, web browsing, or external APIs. MCP servers can also provide resources, prompts, and interactive apps.

### Why MCP?

Without MCP, Copilot can only see what's in your editor. With MCP, Copilot can:

- **Query databases** directly to understand your data
- **Browse web pages** and interact with websites
- **Read documentation** from external sources
- **Interact with APIs** to fetch live information
- **Access specialized tools** for your domain

### How MCP Works

```
┌─────────────┐      MCP Protocol      ┌─────────────────┐
│  GitHub      │ ◄──────────────────►   │   MCP Server    │
│  Copilot     │    (stdio / HTTP)      │   (tools,        │
│  (Client)    │                        │    resources,     │
└─────────────┘                         │    prompts, apps) │
                                        └─────────────────┘
```

1. **MCP Client** — GitHub Copilot in VS Code acts as the client
2. **MCP Server** — A program that exposes tools, resources, prompts, and apps
3. **Protocol** — They communicate via stdio (local) or HTTP/SSE (remote)

When you add an MCP server, VS Code automatically makes its tools, prompts, and resources available in chat.

### MCP Server Capabilities

MCP servers can provide more than just tools:

| Capability | Description | How to Access |
|------------|-------------|---------------|
| **Tools** | Actions like file operations, API calls, queries | Available automatically in Agent Mode |
| **Resources** | Data like files, database tables, API responses | Add Context > MCP Resources |
| **Prompts** | Preconfigured prompts for common tasks | Type `/<server>.<prompt>` in chat |
| **Apps** | Interactive UI components (forms, visualizations) | Appear inline in chat |

### Setting Up for This Lab

Make sure you have the Recipe API project ready:

```bash
cd starter-code/recipe-api
npm install
npm start
```

Verify the API is running at `http://localhost:4000`.

---

## Exercise 1: Installing MCP Servers from the Gallery

The easiest way to add MCP servers is through the built-in gallery in VS Code.

### Task 1.1: Browse the MCP Server Gallery

1. Open the **Extensions view** (`Cmd+Shift+X` / `Ctrl+Shift+X`)
2. Type `@mcp` in the search field
3. Browse the list of available MCP servers from the GitHub MCP server registry

**✅ Observe:**
- The gallery shows MCP servers alongside regular extensions
- Each server has a description of its capabilities
- You can view details by selecting a server

### Task 1.2: Install an MCP Server from the Gallery

Install the **Playwright** MCP server to give Copilot browser capabilities:

1. In the Extensions view, search for `@mcp playwright`
2. Select **Install** to install it in your user profile
3. When prompted, **confirm that you trust the server** to start it
4. VS Code discovers the server's tools and makes them available in chat

> **⚠️ Security Note:** Local MCP servers can run arbitrary code on your machine. Only add servers from trusted sources, and review the publisher and server configuration before starting.

### Task 1.3: Use the Installed MCP Server

Open the Chat view (`Ctrl+Cmd+I` / `Ctrl+Shift+I`) in Agent Mode and try:

```
Go to http://localhost:4000 and take a screenshot of the page.
Tell me what you see.
```

**✅ Observe:**
- Copilot uses the Playwright tools to open a browser
- You may be asked to confirm each tool invocation
- The server interacts with your running Recipe API

**💡 Tip:** Select the **Configure Tools** button in the chat input to see all available tools for a server and toggle specific tools on or off.

### Task 1.4: Install to Workspace vs. User Profile

You can install MCP servers in two scopes:

| Scope | How | Shared with Team? |
|-------|-----|-------------------|
| **User profile** | Click "Install" | No — personal only |
| **Workspace** | Right-click → "Install in Workspace" | Yes — updates `.vscode/mcp.json` |

Try right-clicking an MCP server and selecting **Install in Workspace**. Check that `.vscode/mcp.json` was updated.

---

## Exercise 2: Manual MCP Configuration

For more control, you can configure MCP servers by editing the `mcp.json` file directly.

### Task 2.1: Understand Configuration Locations

MCP configuration can be stored in two places:

| Location | File | Scope |
|----------|------|-------|
| **Workspace** | `.vscode/mcp.json` | Shared with team via source control |
| **User profile** | Run `MCP: Open User Configuration` | Personal, available across all workspaces |

### Task 2.2: Configure a Stdio Server

Create or edit `.vscode/mcp.json` in the **recipe-api** project:

```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch@latest"]
    }
  }
}
```

**Stdio servers** run locally and communicate via standard input/output. This is the most common type for local MCP servers.

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"stdio"` for local servers |
| `command` | Yes | Command to start the server (`npx`, `node`, `python`, `docker`) |
| `args` | No | Arguments passed to the command |
| `env` | No | Environment variables for the server |
| `envFile` | No | Path to a `.env` file to load variables |

### Task 2.3: Configure an HTTP Server

Add a remote MCP server that communicates over HTTP:

```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch@latest"]
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    }
  }
}
```

**HTTP servers** are remote and communicate over the network. VS Code tries HTTP Stream first and falls back to SSE if needed.

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"http"` or `"sse"` |
| `url` | Yes | URL of the remote server |
| `headers` | No | HTTP headers for authentication |

### Task 2.4: Verify MCP Server Connection

1. Open Copilot Chat in **Agent Mode**
2. Select the **Configure Tools** button (🔧) in the chat input
3. You should see tools from all configured MCP servers
4. Toggle specific tools on or off as needed

### Task 2.5: Server Naming Conventions

When naming servers in `mcp.json`, follow these conventions:

| Convention | Example |
|------------|---------|
| Use camelCase | `"uiTesting"`, `"githubIntegration"` |
| No whitespace or special characters | `"myServer"` not `"my server"` |
| Unique names | Avoid conflicts between servers |
| Descriptive | `"database"` not `"s1"` |

---

## Exercise 3: Using MCP Tools in Practice

Now let's use MCP tools with the Recipe API.

### Task 3.1: Fetch Data from Your API

With the Recipe API running and the fetch server configured, switch to **Agent Mode**:

```
Use the fetch tool to get all recipes from http://localhost:4000/api/recipes
and summarize what's in the database.
```

**✅ Observe:**
- Copilot uses the MCP Fetch tool to make the HTTP request
- It receives the JSON response and summarizes the data
- You'll see a tool usage notification in the chat

### Task 3.2: Fetch External Documentation

```
Use the fetch tool to read the Express.js error handling guide at
https://expressjs.com/en/guide/error-handling.html
and then add proper error handling middleware to our Recipe API server.
```

**✅ Observe:**
- Copilot fetches live documentation from the web
- It applies real-world best practices to your code
- The result is grounded in actual, up-to-date documentation

### Task 3.3: Research and Implement

```
Fetch the content from https://jsonapi.org/format/ and refactor our Recipe
API responses to follow the JSON:API specification format.
```

---

## Exercise 4: Input Variables for Sensitive Data

Input variables let you use API keys and secrets without hardcoding them in configuration files.

### Task 4.1: Understand Input Variables

When a server needs credentials, use `${input:variable-id}` references. VS Code prompts you for the value on first use and stores it securely.

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "api-key",
      "description": "API key for the nutrition service",
      "password": true
    }
  ],
  "servers": {
    "nutritionApi": {
      "type": "http",
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${input:api-key}"
      }
    }
  }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `type` | Yes | `"promptString"` for text input |
| `id` | Yes | Unique identifier (referenced as `${input:id}`) |
| `description` | Yes | User-friendly prompt text |
| `password` | No | Hide typed input (default: `false`) |

### Task 4.2: Use Environment Variables

You can also pass environment variables to servers:

```json
{
  "servers": {
    "myServer": {
      "type": "stdio",
      "command": "node",
      "args": ["server.js"],
      "env": {
        "API_KEY": "${input:api-key}",
        "NODE_ENV": "development"
      },
      "envFile": "${workspaceFolder}/.env"
    }
  }
}
```

**✅ Key Point:** Never hardcode sensitive information. Use `${input:...}` for API keys so they're prompted securely and not committed to source control.

---

## Exercise 5: MCP Resources and Prompts

MCP servers provide more than just tools. Let's explore resources and prompts.

### Task 5.1: Browse MCP Resources

MCP Resources give you access to data from servers as context in your prompts:

1. In the Chat view, select **Add Context** (📎 or `#`)
2. Choose **MCP Resources** from the menu
3. Browse available resources from your configured servers

You can also use the **MCP: Browse Resources** command from the Command Palette.

Resources can include things like:
- Database tables
- API response schemas
- File system listings
- Configuration data

### Task 5.2: Use MCP Prompts

MCP servers can provide preconfigured prompts for common tasks. Use them by typing:

```
/<server-name>.<prompt-name>
```

For example, if an MCP server named `myServer` provides a prompt called `analyze`, you would type:

```
/myServer.analyze
```

**✅ Observe:**
- MCP prompts appear alongside your own prompt files when you type `/`
- They provide task-specific workflows defined by the server

---

## Exercise 6: Managing MCP Servers

VS Code provides several ways to manage your MCP servers.

### Task 6.1: Manage from the Extensions View

1. Open the Extensions view (`Cmd+Shift+X` / `Ctrl+Shift+X`)
2. Look for the **MCP SERVERS - INSTALLED** section
3. Right-click a server or select the gear icon to:
   - Start / Stop / Restart the server
   - View server logs
   - Uninstall the server
   - Clear cached tools

### Task 6.2: Manage from the Configuration File

1. Open `.vscode/mcp.json` (or run `MCP: Open Workspace Folder MCP Configuration`)
2. Use the **inline actions** (code lenses) that appear above each server:
   - Start / Stop / Restart
   - Show Output (logs)

### Task 6.3: Manage from the Command Palette

Run `MCP: List Servers` from the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`), select a server, and choose an action.

### Useful MCP Commands

| Command | Description |
|---------|-------------|
| `MCP: Add Server` | Add a server via guided flow |
| `MCP: Browse MCP Servers` | Open the gallery |
| `MCP: Browse Resources` | Browse resources from servers |
| `MCP: List Servers` | List all servers and manage them |
| `MCP: Open User Configuration` | Edit user-level `mcp.json` |
| `MCP: Open Workspace Folder MCP Configuration` | Edit workspace `mcp.json` |
| `MCP: Reset Cached Tools` | Clear cached tools when they change |
| `MCP: Reset Trust` | Re-require trust confirmation |

---

## Exercise 7: MCP Server Trust and Security

### Task 7.1: Understand Trust

When you add a new MCP server or change its configuration, VS Code shows a **trust dialog** asking you to confirm before starting it. This protects you from running untrusted code.

- Select the link in the dialog to review the server configuration
- If you don't trust the server, it won't start
- Chat requests continue without that server's tools

**⚠️ Important:** If you start a server directly from the `mcp.json` file (via code lens), you will **not** be prompted to trust the configuration.

### Task 7.2: Reset Trust

If you need to re-evaluate your trust decisions:

1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run **MCP: Reset Trust**
3. All servers will require re-confirmation on next start

### Security Best Practices

| Practice | Why It Matters |
|----------|---------------|
| **Only use trusted servers** | Local servers run arbitrary code on your machine |
| **Review tool calls** | Always check what MCP tools are doing before approving |
| **Use input variables** | Keep API keys out of config files |
| **Use `envFile`** | Load secrets from `.env` files (add to `.gitignore`) |
| **Limit scope** | Grant minimum necessary access to file systems and databases |

---

## Exercise 8: Combining Multiple MCP Servers

The real power of MCP comes from combining multiple servers together.

### Task 8.1: Multi-Server Configuration

Set up a configuration with multiple servers:

```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch@latest"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    },
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    }
  }
}
```

### Task 8.2: Cross-Tool Workflow

Use multiple MCP tools together in a single task:

```
1. Use the fetch tool to read the Express.js best practices from
   https://expressjs.com/en/advanced/best-practice-security.html
2. Review the current Recipe API code for security issues
3. Implement the recommended security improvements
```

### Task 8.3: Research and Implement

```
Use the fetch tool to get recipe data from
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
and add those recipes to our Recipe API by making POST requests
to http://localhost:4000/api/recipes with the mapped data.
```

---

## Exercise 9: Build a Custom MCP Server (Bonus)

### Task 9.1: Plan a Custom Server

Ask Copilot to help you plan a custom MCP server:

```
I want to create a custom MCP server that provides a "nutrition lookup" tool.
Given an ingredient name, it should return estimated nutritional information
(calories, protein, carbs, fat per 100g).

Plan the MCP server structure using the @modelcontextprotocol/sdk package.
```

### Task 9.2: Implement the Server

```
Create the custom nutrition MCP server based on our plan. It should:
1. Use the MCP SDK (@modelcontextprotocol/sdk)
2. Expose a 'lookup_nutrition' tool that accepts an ingredient name
3. Return nutritional data from a built-in dataset
4. Follow MCP server best practices
```

### Task 9.3: Enable Development Mode

Add development mode to your custom server config for easier iteration:

```json
{
  "servers": {
    "nutritionLookup": {
      "type": "stdio",
      "command": "node",
      "args": ["./mcp-servers/nutrition/server.js"],
      "dev": {
        "watch": "./mcp-servers/nutrition/**/*.js",
        "debug": true
      }
    }
  }
}
```

The `dev` key enables:
- **`watch`** — Automatically restart the server when matched files change
- **`debug`** — Enable debugger attachment for Node.js or Python servers

### Task 9.4: Register and Test

Add your custom server to `.vscode/mcp.json` and test:

```
Use the nutrition lookup tool to calculate the total nutritional information
for the Classic Pancakes recipe by looking up each ingredient.
```

---

## Challenges

### Challenge 1: API Documentation Generator

Configure MCP servers and use them to:
1. Fetch the OpenAPI specification format from the official docs
2. Read all route handlers in the Recipe API
3. Generate a complete OpenAPI spec for the Recipe API
4. Save it as `openapi.yaml`

### Challenge 2: Multi-Server Workflow

Design a workflow that uses at least 3 different MCP servers together:
1. One for fetching external data
2. One for interacting with a service
3. Your custom nutrition server
4. Orchestrate them to build a complete feature

### Challenge 3: Team MCP Configuration

Create a workspace-level `.vscode/mcp.json` that:
- Uses input variables for all secrets
- Includes an `envFile` reference
- Has multiple servers for different team needs
- Is ready to commit to source control (no hardcoded secrets)

---

## MCP Configuration Reference

### Configuration Structure

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "unique-id",
      "description": "Human-readable prompt",
      "password": true
    }
  ],
  "servers": {
    "serverName": {
      "type": "stdio | http | sse",
      "command": "...",
      "args": ["..."],
      "env": {},
      "envFile": "...",
      "url": "...",
      "headers": {},
      "dev": {
        "watch": "glob-pattern",
        "debug": true
      }
    }
  }
}
```

### Server Types

| Type | Use Case | Required Fields |
|------|----------|-----------------|
| `stdio` | Local servers | `command` (+ optional `args`, `env`, `envFile`) |
| `http` | Remote servers (HTTP Stream, fallback to SSE) | `url` (+ optional `headers`) |
| `sse` | Remote servers (SSE only) | `url` (+ optional `headers`) |

### Predefined Variables

You can use VS Code predefined variables in configuration:

| Variable | Description |
|----------|-------------|
| `${workspaceFolder}` | Path to the workspace folder |
| `${input:id}` | Securely prompted input value |

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **MCP extends Copilot** | Connect to tools, databases, APIs, and web browsers |
| **Gallery + manual config** | Install from the gallery or edit `mcp.json` directly |
| **Two server types** | `stdio` for local, `http`/`sse` for remote servers |
| **Beyond tools** | MCP also provides resources, prompts, and interactive apps |
| **Input variables** | Use `${input:id}` for API keys — never hardcode secrets |
| **Trust matters** | VS Code prompts for trust before starting any server |
| **Dev mode** | Use `watch` and `debug` for custom server development |
| **Combine servers** | Multiple MCP servers work together seamlessly |

---

## What's Next?

Now that you can extend Copilot with external tools, let's learn how to give it consistent instructions about your project.

👉 Continue to [Lab 06 - Custom Instructions](06-instructions.md)

---

## Additional Resources

- [Add and Manage MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [MCP Configuration Reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Use Tools with Agents](https://code.visualstudio.com/docs/copilot/agents/agent-tools)

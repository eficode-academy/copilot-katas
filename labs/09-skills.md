# Lab 09 - Skills

## Learning Goals

By the end of this lab, you will be able to:
- Understand what skills are and how they add domain expertise to Copilot
- Create skill files (`SKILL.md`) with the correct directory structure
- Write effective skill descriptions for automatic discovery
- Use progressive 3-level loading for optimal performance
- Include resources (scripts, templates, examples) alongside skills
- Control skill visibility with `user-invokable` and `disable-model-invocation`
- Use the `/skills` command to manage skills

## Introduction

**Skills** give Copilot deep domain knowledge for specific tasks. While instructions (Lab 06) give general guidelines and agents (Lab 08) define personas, skills provide focused expertise on a particular domain — like a team member who is the go-to expert on a specific topic.

### Why Skills?

| Feature | Purpose |
|---------|---------|
| **Instructions** | Project-wide conventions and preferences |
| **Prompt Files** | Reusable multi-step task templates |
| **Agents** | Specialized personas with curated tools |
| **Skills** | Deep domain expertise with supporting resources |

Skills are different because they:
- Are **automatically discovered** based on context relevance
- Use **progressive loading** — Copilot reads only what it needs
- Can include **supporting resources** like scripts, templates, and examples
- Follow an **open standard** (agentskills.io) that works across tools

### How Skills Work

Skills live inside named directories with a `SKILL.md` file:

```
.github/
└── skills/
    ├── recipe-validation/
    │   └── SKILL.md
    ├── unit-conversion/
    │   ├── SKILL.md
    │   ├── conversion-tables.json
    │   └── examples/
    │       └── imperial-to-metric.md
    └── api-design/
        ├── SKILL.md
        ├── templates/
        │   └── endpoint-template.js
        └── checklists/
            └── security-checklist.md
```

### Progressive 3-Level Loading

Copilot uses a three-level loading strategy to keep context efficient:

```
Level 1: Discovery
  ↓ Read YAML frontmatter (name + description)
  ↓ Is this skill relevant to the user's request?
  
Level 2: Instructions
  ↓ Read the full SKILL.md body (instructions, guidelines)
  ↓ Does the skill have additional resources?
  
Level 3: Resources
  ↓ Read referenced files (scripts, templates, examples)
  ↓ Use resources as needed
```

This means the `description` field is critical — it's the first thing Copilot reads to decide whether to load the skill.

### Skill Storage Locations

Skills can be stored in multiple locations:

| Location | Scope |
|----------|-------|
| `.github/skills/<name>/` | Repository (shared with team) |
| `.vscode/skills/<name>/` | Repository (VS Code specific) |
| `~/.copilot/skills/<name>/` | User-level (personal, all repos) |

### Setting Up for This Lab

```bash
cd starter-code/recipe-api
npm install
mkdir -p .github/skills
```

---

## Exercise 1: Your First Skill

### Task 1.1: Create a Recipe Validation Skill

Create the directory and skill file:

```bash
mkdir -p .github/skills/recipe-validation
```

Create `.github/skills/recipe-validation/SKILL.md`:

````markdown
---
name: recipe-validation
description: >
  Validates recipe data for the Recipe Book API. Knows all required fields,
  valid ranges, and business rules for recipe objects. Use when creating,
  updating, or reviewing recipe data validation logic.
---

# Recipe Validation

You are an expert at validating recipe data for the Recipe Book API.

## Recipe Object Schema

A valid recipe must have:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `title` | string | ✅ | 3-100 characters, no special characters at start |
| `description` | string | ✅ | 10-500 characters |
| `ingredients` | array | ✅ | At least 1 ingredient |
| `instructions` | array | ✅ | At least 1 step |
| `prepTime` | number | ✅ | 1-1440 minutes (max 24 hours) |
| `cookTime` | number | ✅ | 0-1440 minutes (0 for no-cook recipes) |
| `servings` | number | ✅ | 1-100 |
| `category` | string | ✅ | One of: breakfast, lunch, dinner, snack, dessert, drinks |
| `tags` | array | ❌ | Max 10 tags, each 2-30 characters |

## Ingredient Schema

Each ingredient must have:

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `name` | string | ✅ | 2-50 characters |
| `amount` | number | ✅ | Greater than 0 |
| `unit` | string | ✅ | One of: g, kg, ml, l, tsp, tbsp, cup, oz, lb, piece, pinch, bunch |

## Validation Rules

### Business Rules
- Total time (prepTime + cookTime) should not exceed 24 hours
- No-cook recipes (cookTime = 0) must have `prepTime > 0`
- Recipe titles must be unique (case-insensitive)
- Ingredients should not contain duplicates (same name + unit)

### Common Mistakes
- Missing or empty ingredients array
- cookTime set to negative values
- Category not matching allowed values
- Tags with only whitespace

## Validation Function Pattern

When writing validation code, follow this pattern:

```javascript
function validateRecipe(data) {
  const errors = [];
  
  // Check required fields
  if (!data.title || typeof data.title !== 'string') {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (data.title.length < 3 || data.title.length > 100) {
    errors.push({ field: 'title', message: 'Title must be 3-100 characters' });
  }
  
  // ... more validations
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

Always return an object with `valid` (boolean) and `errors` (array) — never throw exceptions for validation failures.
````

### Task 1.2: Test the Skill

The skill is automatically discovered. Try asking Copilot (using the default agent):

```
Create a POST /api/recipes endpoint with full input validation.
```

**✅ Observe:**
- Copilot finds and loads the `recipe-validation` skill automatically
- Validation logic follows the exact schema defined in the skill
- All business rules are applied
- The validation function returns `{ valid, errors }` as specified

### Task 1.3: Verify with the `/skills` Command

Type `/skills` in the chat input to see all available skills and their status. You should see `recipe-validation` listed.

---

## Exercise 2: Skill with Resources

Skills can include additional files alongside `SKILL.md`. These are loaded at Level 3 when the skill needs them.

### Task 2.1: Create a Unit Conversion Skill with Resources

```bash
mkdir -p .github/skills/unit-conversion/tables
mkdir -p .github/skills/unit-conversion/examples
```

Create `.github/skills/unit-conversion/SKILL.md`:

````markdown
---
name: unit-conversion
description: >
  Converts between measurement units (imperial/metric) for recipe ingredients.
  Handles volume, weight, and temperature conversions with proper precision.
  Use when converting recipes between measurement systems.
---

# Unit Conversion

You are an expert at converting measurement units for recipes.

## Conversion Tables

Reference the conversion table at [tables/conversions.json](tables/conversions.json)
for exact conversion factors.

## Volume Conversions

| From | To | Factor |
|------|----|--------|
| 1 tsp | ml | 4.929 |
| 1 tbsp | ml | 14.787 |
| 1 cup | ml | 236.588 |
| 1 fl oz | ml | 29.574 |

## Weight Conversions

| From | To | Factor |
|------|----|--------|
| 1 oz | g | 28.3495 |
| 1 lb | g | 453.592 |
| 1 kg | lb | 2.20462 |

## Temperature Conversions

- Fahrenheit to Celsius: `(F - 32) × 5/9`
- Celsius to Fahrenheit: `(C × 9/5) + 32`
- Common oven temps:
  - 350°F = 175°C (moderate)
  - 375°F = 190°C (moderate-high)
  - 400°F = 200°C (high)
  - 425°F = 220°C (very high)

## Precision Rules

- **Volume**: Round to nearest 0.25 for cups/tbsp/tsp; whole numbers for ml
- **Weight**: Round to nearest whole gram; 1 decimal for oz
- **Temperature**: Round to nearest 5°C; nearest 5°F

## Code Pattern

```javascript
function convertUnit(value, fromUnit, toUnit) {
  const conversions = getConversionTable();
  const key = `${fromUnit}_to_${toUnit}`;
  
  if (!conversions[key]) {
    throw new Error(`No conversion from ${fromUnit} to ${toUnit}`);
  }
  
  return roundToUnit(value * conversions[key].factor, toUnit);
}
```

See [examples/imperial-to-metric.md](examples/imperial-to-metric.md)
for complete conversion examples.
````

Create the supporting resource file `.github/skills/unit-conversion/tables/conversions.json`:

```json
{
  "volume": {
    "tsp_to_ml": { "factor": 4.929 },
    "tbsp_to_ml": { "factor": 14.787 },
    "cup_to_ml": { "factor": 236.588 },
    "fl_oz_to_ml": { "factor": 29.574 },
    "ml_to_tsp": { "factor": 0.2029 },
    "ml_to_tbsp": { "factor": 0.0676 },
    "ml_to_cup": { "factor": 0.00423 },
    "l_to_cup": { "factor": 4.227 }
  },
  "weight": {
    "oz_to_g": { "factor": 28.3495 },
    "lb_to_g": { "factor": 453.592 },
    "lb_to_kg": { "factor": 0.4536 },
    "g_to_oz": { "factor": 0.03527 },
    "kg_to_lb": { "factor": 2.20462 }
  }
}
```

Create the example file `.github/skills/unit-conversion/examples/imperial-to-metric.md`:

```markdown
# Imperial to Metric Conversion Example

## Original Recipe (Imperial)

- 2 cups all-purpose flour
- 1/2 cup butter
- 3/4 tsp salt
- 2 tbsp sugar
- 1 lb chicken breast
- Bake at 375°F

## Converted Recipe (Metric)

- 473 ml (≈475 ml) all-purpose flour
- 118 ml (≈120 ml) butter
- 3.75 ml (≈3.5 ml) salt
- 30 ml sugar
- 454 g chicken breast
- Bake at 190°C

## Notes

- Round ml to nearest 5 for practicality
- For baking, precision matters more than cooking
- Common substitution: 1 cup = 250 ml (approximate)
```

### Task 2.2: Test with Resources

```
Convert the Classic Pancakes recipe to metric units.
```

**✅ Observe:**
- The skill is automatically loaded when unit conversion is relevant
- Level 3 loading fetches the conversion tables and examples
- Conversions use the exact factors from the resource files
- Precision rules are followed

---

## Exercise 3: Skill Visibility and Control

### Task 3.1: User-Invokable Skills

By default, skills are discoverable and loadable. Use `user-invokable` to control whether users can explicitly invoke the skill:

Create `.github/skills/api-patterns/SKILL.md`:

````markdown
---
name: api-patterns
description: >
  REST API design patterns and conventions for Express.js. Covers routing,
  error handling, pagination, filtering, and response formatting.
user-invokable: true
---

# API Design Patterns

## Routing Conventions

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/resources` | List all (with pagination) |
| GET | `/api/resources/:id` | Get one by ID |
| POST | `/api/resources` | Create new |
| PUT | `/api/resources/:id` | Replace entirely |
| PATCH | `/api/resources/:id` | Update partially |
| DELETE | `/api/resources/:id` | Remove |

## Pagination

All list endpoints must support:

```
GET /api/recipes?limit=10&offset=0
```

Response format:
```json
{
  "data": [...],
  "pagination": {
    "total": 42,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

## Error Handling

Use consistent error response shapes:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Recipe title is required",
    "details": [
      { "field": "title", "message": "Required field missing" }
    ]
  }
}
```

## HTTP Status Codes

| Code | When to Use |
|------|-------------|
| 200 | Successful GET, PUT, PATCH |
| 201 | Successful POST (created) |
| 204 | Successful DELETE (no content) |
| 400 | Validation error |
| 404 | Resource not found |
| 409 | Conflict (duplicate) |
| 500 | Unexpected server error |

## Filtering

Support query parameter filtering:

```
GET /api/recipes?category=dinner&maxTime=30
```
````

### Task 3.2: Internal-Only Skills

Use `disable-model-invocation: true` to make a skill that users can request but Copilot won't automatically discover:

````markdown
---
name: debug-helper
description: Debugging utilities and common issue resolutions
disable-model-invocation: true
---
````

Or use `user-invokable: false` to hide from users but allow agents to use it:

````markdown
---
name: internal-formatter
description: Code formatting rules used by automation agents
user-invokable: false
---
````

### Visibility Summary

| Setting | Manual invocation | Auto-discovery |
|---------|-------------------|----------------|
| Default (both omitted) | ✅ | ✅ |
| `user-invokable: false` | ❌ | ✅ |
| `disable-model-invocation: true` | ✅ | ❌ |
| Both set | ❌ | ❌ |

---

## Exercise 4: Writing Effective Skill Descriptions

The `description` field is the single most important part of a skill. It's what Copilot reads at Level 1 to decide whether to load the skill.

### Task 4.1: Description Best Practices

**Bad descriptions** (too vague):
```yaml
description: Helps with recipes
description: Validation stuff
description: API helper
```

**Good descriptions** (specific and contextual):
```yaml
description: >
  Validates recipe data for the Recipe Book API. Knows all required fields,
  valid ranges, and business rules for recipe objects. Use when creating,
  updating, or reviewing recipe data validation logic.
```

A good description answers:
1. **What** does this skill do?
2. **What domain** does it cover?
3. **When** should it be used?

### Task 4.2: Practice Writing Descriptions

Write descriptions for these hypothetical skills and check if Copilot correctly discovers them:

1. A skill for database migration patterns
2. A skill for error logging and monitoring
3. A skill for authentication and authorization

### YAML Frontmatter Rules

| Field | Required | Constraint |
|-------|----------|------------|
| `name` | Yes | Must match directory name, max 64 characters |
| `description` | Yes | Max 1024 characters |
| `argument-hint` | No | Hint text for the chat input |
| `user-invokable` | No | Boolean, default `true` |
| `disable-model-invocation` | No | Boolean, default `false` |

---

## Exercise 5: Combining Skills with Agents and Prompts

Skills become even more powerful when combined with agents and prompt files.

### Task 5.1: Agent That References Skills

Create an agent that relies on skills for expertise:

Create `.github/agents/recipe-expert.agent.md`:

````markdown
---
description: Full-stack recipe API expert with validation and conversion knowledge
tools: ['codebase', 'editFiles', 'terminal', 'search']
---

# Recipe Expert

You are a full-stack expert for the Recipe Book API.

You have access to specialized skills including:
- Recipe validation rules and schemas
- Unit conversion between measurement systems
- API design patterns and conventions

When building features, always check your skills for domain-specific rules.
Use the recipe validation skill for any data validation logic.
Use the unit conversion skill when dealing with measurements.
Use the API patterns skill for route design.
````

### Task 5.2: Test Combined Usage

Switch to the recipe-expert agent and try:

```
Create a recipe import endpoint that accepts a recipe in imperial units
and stores it converted to metric. Include full validation.
```

**✅ Observe:**
- The agent uses its instructions for overall behavior
- Skills are loaded for validation rules and conversion factors
- The combined result follows both agent guidelines and skill expertise

---

## Challenges

### Challenge 1: Testing Standards Skill

Create a `testing-standards` skill that defines:
- Test file naming conventions
- Required test categories (unit, integration, edge cases)
- Mocking patterns for the Recipe API
- Coverage requirements

### Challenge 2: Skill with Scripts

Create a skill that includes executable scripts:

```
.github/skills/data-seeder/
├── SKILL.md
├── seed-data.js
└── templates/
    └── recipe-template.json
```

The skill should explain how to use the seed script and when to apply it.

### Challenge 3: Shared Personal Skill

Create a personal skill in `~/.copilot/skills/` that works across all your repositories. Ideas:
- Your preferred code style conventions
- Common debugging steps you always follow
- Documentation templates you use everywhere

---

## Skills Best Practices

### Directory Structure

```
.github/skills/
└── skill-name/          ← directory name = skill name
    ├── SKILL.md          ← required (instructions + frontmatter)
    ├── examples/          ← optional example files
    ├── templates/         ← optional code templates
    ├── scripts/           ← optional utility scripts
    └── data/              ← optional reference data
```

### Writing Good Skills

| Principle | Description |
|-----------|-------------|
| **Focused scope** | One skill = one domain area |
| **Rich description** | Description determines discovery accuracy |
| **Structured data** | Use tables and schemas for reference data |
| **Code patterns** | Include example implementations |
| **Business rules** | Capture rules that code alone can't express |
| **Resources** | Put supporting files alongside SKILL.md |

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| **Vague description** | Be specific about what, when, and how |
| **Name mismatch** | Directory name must exactly match `name` field |
| **Too broad** | Split into multiple focused skills |
| **No code patterns** | Include example code for common tasks |
| **Missing resources** | Put reference data in files, not just prose |

### Skills vs. Instructions vs. Agents

| Use Case | Best Tool |
|----------|-----------|
| Project-wide coding standards | Instructions (Lab 06) |
| Reusable task templates | Prompt Files (Lab 07) |
| Specialized AI persona | Custom Agent (Lab 08) |
| Deep domain expertise | Skill (Lab 09) |
| Complex workflows | Agent + Skills + Prompts |

---

## Key Takeaways

| Concept | Takeaway |
|---------|----------|
| **Skills add expertise** | Domain knowledge in structured `SKILL.md` files |
| **Directory = identity** | `name` in frontmatter must match directory name |
| **Description is critical** | It determines whether the skill is loaded (Level 1) |
| **Progressive loading** | 3 levels — discovery → instructions → resources |
| **Resources enhance skills** | Include scripts, templates, and data alongside SKILL.md |
| **Visibility controls** | `user-invokable` and `disable-model-invocation` |
| **`/skills` command** | Quickly manage and inspect available skills |
| **Open standard** | Skills follow the agentskills.io specification |
| **Combine with agents** | Skills + agents + prompts = powerful workflows |

---

## Workshop Complete! 🎉

You've completed all the labs in the GitHub Copilot Katas workshop!

### Your Copilot Toolkit

| Lab | Skill Learned |
|-----|---------------|
| **Lab 00** | Getting started with Copilot |
| **Lab 01** | Inline code completions |
| **Lab 02** | Chat window interactions |
| **Lab 03** | Agent mode for autonomous tasks |
| **Lab 04** | Plan mode for structured changes |
| **Lab 05** | MCP servers for external integrations |
| **Lab 06** | Custom instructions for team standards |
| **Lab 07** | Prompt files for reusable tasks |
| **Lab 08** | Custom agents for specialized workflows |
| **Lab 09** | Skills for domain expertise |

### What's Next?

- Review the [CHEATSHEET.md](../CHEATSHEET.md) for a quick reference
- Explore the [VS Code Copilot Documentation](https://code.visualstudio.com/docs/copilot)
- Visit [agentskills.io](https://agentskills.io) for the open skills standard
- Share your agents and skills with your team by committing them to your repos!

---

## Additional Resources

- [Agent Skills Documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Agentskills.io — Open Standard](https://agentskills.io)
- [Custom Agents Documentation](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

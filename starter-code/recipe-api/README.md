# Recipe Book API

Starter project for the **advanced GitHub Copilot labs** (Labs 05–09).

## Quick Start

```bash
cd starter-code/recipe-api
npm install
npm start
```

The API runs at **http://localhost:4000**.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/recipes` | List all recipes |
| GET | `/api/recipes/:id` | Get a single recipe |
| POST | `/api/recipes` | Create a recipe |
| PUT | `/api/recipes/:id` | Update a recipe |
| DELETE | `/api/recipes/:id` | Delete a recipe |

## Project Structure

```
recipe-api/
├── package.json
├── README.md
└── src/
    ├── server.js          # Express app entry point
    ├── models/
    │   └── recipe.js      # Recipe model
    ├── routes/
    │   └── recipes.js     # API route handlers
    └── data/
        └── store.js       # In-memory store with sample data
```

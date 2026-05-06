# Todo App — JavaScript Starter

The starter code for **Labs 00–04** of the GitHub Copilot Katas, in JavaScript.

## Requirements

- Node.js 18+

## Run

```bash
cd starter-code/javascript
npm install
npm start            # serves http://localhost:3000
# or:
npm run dev          # auto-reload on changes
```

Then open <http://localhost:3000> in your browser. You should see a placeholder page — you'll build out the rest with Copilot during the labs.

## What's here

```
javascript/
├── index.html        # served at /
├── src/
│   ├── app.js        # tiny static file server (entry point)
│   ├── todo.js       # empty — you'll implement the Todo model in Lab 01
│   └── todoList.js   # empty — you'll implement the TodoList in Lab 01
└── package.json
```

## Tests

```bash
npm test             # runs node:test on src/**/*.test.js (you'll add tests in Lab 03)
```

Head back to [Lab 00](../../labs/00-getting-started.md) to begin.

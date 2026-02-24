/**
 * Recipe Book API - Server Entry Point
 *
 * A simple Express API for managing recipes.
 * Used as a starter project for GitHub Copilot advanced labs
 * covering MCP, Instructions, Prompts, Agents, and Skills.
 *
 * To run:
 *   npm install
 *   npm start
 *
 * Then visit http://localhost:4000
 */

import express from 'express';
import { recipeRoutes } from './routes/recipes.js';

const app = express();
const PORT = 4000;

app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    name: 'Recipe Book API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      recipes: '/api/recipes',
      health: '/'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Recipe Book API running at http://localhost:${PORT}`);
});

export default app;

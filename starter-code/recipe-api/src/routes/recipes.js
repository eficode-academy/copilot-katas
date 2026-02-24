/**
 * Recipe Routes
 *
 * API endpoints for managing recipes.
 * Some endpoints are intentionally left incomplete for exercises.
 */

import { Router } from 'express';
import { recipes, findRecipeById } from '../data/store.js';
import { Recipe } from '../models/recipe.js';

export const recipeRoutes = Router();

// GET /api/recipes — list all recipes
recipeRoutes.get('/', (req, res) => {
  res.json(recipes);
});

// GET /api/recipes/:id — get a single recipe
recipeRoutes.get('/:id', (req, res) => {
  const recipe = findRecipeById(Number(req.params.id));
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  res.json(recipe);
});

// POST /api/recipes — create a new recipe
recipeRoutes.post('/', (req, res) => {
  const { title, description, ingredients, steps, category, servings, prepTimeMinutes, cookTimeMinutes } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const recipe = new Recipe({ title, description, ingredients, steps, category, servings, prepTimeMinutes, cookTimeMinutes });
  recipes.push(recipe);
  res.status(201).json(recipe);
});

// PUT /api/recipes/:id — update a recipe
recipeRoutes.put('/:id', (req, res) => {
  const recipe = findRecipeById(Number(req.params.id));
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  const allowedFields = ['title', 'description', 'ingredients', 'steps', 'category', 'servings', 'prepTimeMinutes', 'cookTimeMinutes'];
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      recipe[field] = req.body[field];
    }
  }
  recipe.updatedAt = new Date().toISOString();
  res.json(recipe);
});

// DELETE /api/recipes/:id — delete a recipe
recipeRoutes.delete('/:id', (req, res) => {
  const index = recipes.findIndex(r => r.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Recipe not found' });
  }
  recipes.splice(index, 1);
  res.status(204).send();
});

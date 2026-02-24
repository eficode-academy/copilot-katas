/**
 * Recipe Model
 *
 * Represents a single recipe with ingredients, steps, and metadata.
 */

let nextId = 100;

export class Recipe {
  constructor({ title, description, ingredients = [], steps = [], category = 'uncategorized', servings = 1, prepTimeMinutes = 0, cookTimeMinutes = 0 }) {
    this.id = nextId++;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
    this.category = category;
    this.servings = servings;
    this.prepTimeMinutes = prepTimeMinutes;
    this.cookTimeMinutes = cookTimeMinutes;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

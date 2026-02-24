/**
 * In-memory data store with sample recipes.
 */

export const recipes = [
  {
    id: 1,
    title: 'Classic Pancakes',
    description: 'Fluffy American-style pancakes perfect for weekend breakfasts.',
    ingredients: [
      { name: 'flour', amount: '1.5', unit: 'cups' },
      { name: 'milk', amount: '1.25', unit: 'cups' },
      { name: 'egg', amount: '1', unit: 'whole' },
      { name: 'butter', amount: '3', unit: 'tbsp' },
      { name: 'sugar', amount: '2', unit: 'tbsp' },
      { name: 'baking powder', amount: '2', unit: 'tsp' },
      { name: 'salt', amount: '0.5', unit: 'tsp' }
    ],
    steps: [
      'Mix dry ingredients in a large bowl.',
      'Whisk milk, egg, and melted butter together.',
      'Combine wet and dry ingredients until just mixed (lumps are OK).',
      'Heat a non-stick pan over medium heat.',
      'Pour 1/4 cup batter per pancake.',
      'Cook until bubbles form on top, then flip.',
      'Serve with maple syrup and fresh berries.'
    ],
    category: 'breakfast',
    servings: 4,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    createdAt: '2025-01-15T08:00:00.000Z',
    updatedAt: '2025-01-15T08:00:00.000Z'
  },
  {
    id: 2,
    title: 'Spaghetti Aglio e Olio',
    description: 'A simple yet delicious Italian pasta dish with garlic and olive oil.',
    ingredients: [
      { name: 'spaghetti', amount: '400', unit: 'g' },
      { name: 'garlic', amount: '6', unit: 'cloves' },
      { name: 'olive oil', amount: '0.5', unit: 'cup' },
      { name: 'red pepper flakes', amount: '1', unit: 'tsp' },
      { name: 'parsley', amount: '0.25', unit: 'cup' },
      { name: 'parmesan', amount: '0.5', unit: 'cup' }
    ],
    steps: [
      'Cook spaghetti according to package directions, reserve 1 cup pasta water.',
      'Slice garlic thinly.',
      'Heat olive oil in a large pan over medium-low heat.',
      'Add garlic and red pepper flakes, cook until garlic is golden.',
      'Add drained pasta to the pan with a splash of pasta water.',
      'Toss to coat, adding more pasta water if needed.',
      'Garnish with parsley and parmesan.'
    ],
    category: 'dinner',
    servings: 4,
    prepTimeMinutes: 5,
    cookTimeMinutes: 20,
    createdAt: '2025-02-01T12:00:00.000Z',
    updatedAt: '2025-02-01T12:00:00.000Z'
  },
  {
    id: 3,
    title: 'Green Smoothie',
    description: 'A healthy and refreshing green smoothie packed with nutrients.',
    ingredients: [
      { name: 'spinach', amount: '2', unit: 'cups' },
      { name: 'banana', amount: '1', unit: 'whole' },
      { name: 'almond milk', amount: '1', unit: 'cup' },
      { name: 'peanut butter', amount: '1', unit: 'tbsp' },
      { name: 'honey', amount: '1', unit: 'tbsp' }
    ],
    steps: [
      'Add all ingredients to a blender.',
      'Blend on high until smooth.',
      'Pour into a glass and enjoy immediately.'
    ],
    category: 'drinks',
    servings: 1,
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    createdAt: '2025-03-10T07:30:00.000Z',
    updatedAt: '2025-03-10T07:30:00.000Z'
  }
];

export function findRecipeById(id) {
  return recipes.find(r => r.id === id);
}

import { createContext, useState } from 'react';

import { Recipe } from '#/api/openai';

export const RecipesCtxt = createContext({ recipes: [] } as {
  recipes: Recipe[];
});

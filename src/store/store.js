import { configureStore } from '@reduxjs/toolkit';

import recipesReducer from '../features/recipesSlice';
import ingredientsReducer from '../features/ingredientsSlice';

export default configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer
  }
})

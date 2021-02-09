import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import initialIngredients from '../store/initialIngredients';

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredients,
  reducers: {
    remove: (state, action) => {
      return state.filter(item => item.id !== action.payload.wid);
    },
    reset: (state, action) => {
      return [];
    }
  }
})

//Actions
export const { upsert:saveRecipe, reset:resetRecipe, remove: removeRecipe } = ingredientsSlice.actions;

//Selectors
export const selectIngredients = state => state.ingredients;
const getIngredientId = (state, props) => props && props.id;

// reselectors
export const selectIngredientById = createSelector(
  [selectIngredients, getIngredientId],
  (ingredients, id) => ingredients.find(item => item.id === id)
);

export default ingredientsSlice.reducer

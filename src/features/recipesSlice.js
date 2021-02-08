import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import initialRecipesState from '../store/initialRecipes';

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState: initialRecipesState,
  reducers: {
    upsert: (state, action) => {
      if(action.payload) {
        const { id, name, slug, ingredients, hero, tags=[]} = action.payload;
        if(!state.length || !state.some(item => item.id === id)) {
          state.push({id, name, slug, ingredients, hero, tags});
        } else {
          //console.log("slice update")
          return state.map(obj => {
            if(obj.id === id) {
              return { ...action.payload };
            }
            return obj
          });
        }
      }
    },
    remove: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    reset: (state, action) => {
      return [];
    }
  }
})

//Actions
export const { upsert:saveRecipe, reset:resetRecipe, remove: removeRecipe } = recipesSlice.actions;

//Selectors
export const selectRecipes = state => state.recipes;
const getRecipeId = (state, props) => props && props.id;
const getRecipeSlug = (state, props) => props && props.slug;

// reselectors
export const selectRecipesLength = createSelector(
  [selectRecipes],
  recipes => recipes.length
);

export const selectRecipeById = createSelector(
  [selectRecipes, getRecipeId],
  (recipes, id) => recipes.find(item => item.id === id)
);

export const selectRecipeBySlug = createSelector(
  [selectRecipes, getRecipeSlug],
  (recipes, slug) => recipes.find(item => item.slug === slug)
);

export default recipesSlice.reducer

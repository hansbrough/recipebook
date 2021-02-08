/*
* Renders a stylized list of ingredient images (without text) from a given recipe
*/
import React from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { makeStyles } from "@material-ui/core/styles";
//= ==== Store ===== //
import { selectIngredients } from '../features/ingredientsSlice';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';

//material-ui jss
const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: '2px solid #dfdfdf',
    padding: '.25rem'
  }
}));

const Ingredients = ({recipe}) => {
  const ingredients = useSelector(selectIngredients);
  const classes = useStyles();

  const getIngredient = (id) => {
    return ingredients.find(item => id === item.id)
  };

  return (
    <section className="recipe-ingredients" >
    {
      recipe.ingredients.map((recipeIngredient, idx, arr) => {
        const ingredient = getIngredient(recipeIngredient.id)
        return (
          <React.Fragment key={`overview_${recipeIngredient.id}`}>
          <Avatar
            className={classes.large}
            alt={ingredient.name}
            src={`${UrlPaths.INGREDIENT_IMG_PATH}${ingredient.image}`}
          />
          {(idx < arr.length -1) && <AddRoundedIcon color="action" fontSize="large" />}
          </React.Fragment>
        )
      })
    }
    </section>
  )
}

export default Ingredients;

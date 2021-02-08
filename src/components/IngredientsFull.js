/*
* Renders a list of ingredients with details from a given recipe.
*/
import {React} from 'react';
import {useSelector} from 'react-redux';
import {Avatar,Typography} from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';
//= ==== Store ===== //
import { selectIngredients } from '../features/ingredientsSlice';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';
import MeasureAmounts from '../constants/MeasureAmounts';

//material-ui jss
const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: '2px solid #dfdfdf',
    padding: '.25rem',
    marginRight: '.5rem'
  },
  ingredient: {
    color: grey[800]
  },
}));

const IngredientsFull = ({recipe}) => {
  const ingredients = useSelector(selectIngredients);
  const classes = useStyles();

  const getIngredient = (id) => {
    return ingredients.find(item => id === item.id)
  };

  return (
    <section className="recipe-ingredients" >
    {
      recipe && recipe.ingredients.map((recipeIngredient) => {
        const {name, image} = getIngredient(recipeIngredient.id);
        const {id, amount} = recipeIngredient;

        return (
          <div key={`ingredient_${id}`} className="ingredient-detail">
            <Avatar
              className={classes.large}
              alt={name}
              src={`${UrlPaths.INGREDIENT_IMG_PATH}${image}`}
            />
            <Typography className={classes.ingredient} variant="body1" noWrap>{name}</Typography>
            &nbsp;-&nbsp;
            <Typography className={classes.ingredient} variant="body1" noWrap>{MeasureAmounts[amount]}</Typography>
          </div>
        )
      })
    }
    </section>
  )
}

export default IngredientsFull;

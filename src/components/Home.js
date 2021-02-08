import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
//= ==== MaterialUI ===== //
import { Button, ButtonGroup, Divider, Typography } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import { makeStyles } from "@material-ui/core/styles";
//= ==== Store ===== //
import { selectRecipes, removeRecipe } from '../features/recipesSlice';
//= ==== Components ===== //
import Ingredients from './IngredientsOverview';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';

//material-ui jss
const useStyles = makeStyles(theme => ({
  title: {
    color: pink[800]
  },
  linkTitle: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: pink[800],
    '&:hover': {
      textDecoration: 'underline',
      color: '#a94166',
    }
  },
  controlsSection: {
    margin: theme.spacing(3)
  },
  verticalSpace: {
    margin: '1rem 0'
  }
}));

const HomePage = () => {
  const history   = useHistory();
  const dispatch  = useDispatch();
  const recipes   = useSelector(selectRecipes);
  const classes   = useStyles();

  const handleDelete = id => dispatch(removeRecipe({id}));

  const handleEdit = (slug) => {
    console.log("handleEdit:",slug)
    history.push({pathname: `${UrlPaths.EDIT_PATH}${slug}`})
  };

  return (
    <>
      <Typography className={classes.title} variant="h5" noWrap>Recipes</Typography>
      <Typography className={classes.verticalSpace} variant="body1" noWrap >
        Use one of the starter Smoothie recipes or create your own.
      </Typography>

      <div className="recipes-list-container">
      {recipes.map( recipe =>
        (
          <div className="recipe-summary" key={recipe.id}>
            <Link className="recipe-link-title" to={`${UrlPaths.DETAILS_PATH}${recipe.slug}`}>
              <Typography className={classes.linkTitle} variant="h6" noWrap >
                {recipe.name}
                <KeyboardArrowRightIcon color="inherit" />
              </Typography>
            </Link>
            <Ingredients key={`summary_${recipe.id}`} recipe={recipe} />
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button startIcon={<DeleteIcon />} aria-label="delete" onClick={() => handleDelete(recipe.id)} >Delete</Button>
              <Button startIcon={<EditIcon />} aria-label="edit" onClick={() => handleEdit(recipe.slug)}>Edit</Button>
            </ButtonGroup>
            <Divider className={classes.verticalSpace} variant="middle" />
          </div>
        )
      )}
      </div>

      <Button
        className={classes.controlsSection}
        variant="contained"
        color="primary"
        startIcon={<LocalDrinkIcon />}
        onClick={() => history.push({pathname: UrlPaths.CREATE_PATH})}
      >
          Design Your Own Smoothie
      </Button>
    </>
  )
};

export default HomePage;

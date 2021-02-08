import React from "react";
import {useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import {Chip, Typography} from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
//import Image from 'material-ui-image';
import { makeStyles } from "@material-ui/core/styles";
//= ==== Components ===== //
import Ingredients from './IngredientsFull';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';
//= ==== Store ===== //
import { selectRecipeBySlug } from '../features/recipesSlice';

//material-ui jss
const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: '2px solid #dfdfdf',
    padding: '.25rem'
  },
  title: {
    color: pink[800]
  },
  tag: {
    margin: '.25rem'
  },
  heroContainer: {
    maxWidth: '20rem'
  },
  hero: {
    height: '20rem',
    borderRadius: '1rem'
  }
}));

const DetailsPage = () => {
  const { recipe_slug } = useParams();
  const recipe          = useSelector(
    (state) => selectRecipeBySlug(state, { slug: recipe_slug })//pass along props for reselector
  );
  const {name:recipeName, hero, tags} = recipe || {};
  const classes = useStyles();
  
  const handleDelete = () => {
    console.log("handleDelete")
  }

  return (
    <>
      <Typography className={classes.title} variant="h5" noWrap>{recipeName}</Typography>
      <section className="recipe-details-container">
        <div className={classes.heroContainer} >
          <img className={classes.hero} src={`${UrlPaths.SMOOTHIE_IMG_PATH}${hero}`} alt="smoothie" />
          <section className="recipe-tags-container">
            {tags && tags.map(tag => <Chip key={`chip_${tag}`} variant="outlined" size="small" label={tag} onDelete={handleDelete} className={classes.tag} /> )}
          </section>
        </div>
        <div>
          <Ingredients recipe={recipe} />
        </div>
      </section>

    </>
  )
};

export default DetailsPage;

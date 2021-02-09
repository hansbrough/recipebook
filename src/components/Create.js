import React, {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Divider, TextField, Typography } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from "@material-ui/core/styles";
//= ==== Store ===== //
import { selectIngredients } from '../features/ingredientsSlice';
import { selectRecipes, selectRecipesLength, selectMostRecentRecipe, saveRecipe } from '../features/recipesSlice';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';
import IngredientCategories from '../constants/IngredientCategories';
//= ==== Components ===== //
import PantryItem from './PantryItem';
import PantryItemSelected from './PantryItemSelected';
//= ==== Custom Hooks ===== //
import usePrevious from '../hooks/usePrevious';
//= ==== Utils ===== //
import {strToSlug, strToInputName} from '../utils/strUtils';
//material-ui jss
const useStyles = makeStyles(theme => ({
  title: {
    color: pink[800]
  },
  placeholder: {
    color: grey[300]
  },
  p: {
    color: grey[700],
    margin: '1rem 0'
  },
  pantry: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  recipe: {
    marginTop: '2rem',
    width: '20rem'
  },
  verticalSpace: {
    margin: '1rem 0'
  }
}));

const CreatePage = () => {
  const [checkboxState, setCheckboxState] = useState({});
  const [recipeItems, setRecipeItems] = useState([]);
  const [amtSelectState, setAmtSelectState] = useState({});
  const [recipeName, setRecipeName] = useState();

  //where possible avoid rerenders.
  const formValid = useMemo(() => !!recipeName && recipeItems.length, [recipeName, recipeItems]);

  const dispatch        = useDispatch();
  const history         = useHistory();
  const appRecipes      = useSelector(selectRecipes);
  const ingredients     = useSelector(selectIngredients);
  const recipeCnt       = useSelector(selectRecipesLength);
  const latestRecipe    = useSelector(selectMostRecentRecipe);
  const prevIsRecipeCnt = usePrevious(recipeCnt);
  const classes         = useStyles();

  //redirect after recipe created
  useEffect(() => {
    if(prevIsRecipeCnt < recipeCnt) {
      history.push({pathname: `${UrlPaths.DETAILS_PATH}${strToSlug(recipeName)}`})
    }
  },[prevIsRecipeCnt, recipeCnt, history, recipeName]);

  //persist when recipes change
  useEffect(() => {
    if(appRecipes) {
      localStorage.setItem('recipes', JSON.stringify(appRecipes));
    }
  },[appRecipes]);

  //update local state based on checkbox selection
  const handleCheckboxChange = (evt) => {
      const { name, id, checked } = evt.target;
      //UI state
      setCheckboxState({ ...checkboxState, [name]: checked });
      //selected recipe objects
      if(checked) {
        const ingredient = ingredients.find(item => item.id === id);
        setRecipeItems([...recipeItems, ingredient]);
        setAmtSelectState({...amtSelectState, [name]:ingredient.default_amt });
      } else {
        //remove the unchecked ingredient and associated amt from local state
        setRecipeItems(recipeItems.filter(item => item.id !== id));
        setAmtSelectState(
          Object.fromEntries(
            Object.entries(amtSelectState).filter(([key, val]) => key !== name)
          )
        )
      }
  };

  //
  const handleAmtChange = (evt) => {
    const { name, value } = evt.target;
    setAmtSelectState({...amtSelectState, [name]:value })
  };

  //save a recipe to the store
  const handleSaveClick = () => dispatch(saveRecipe( createRecipePayload() ));

  const createRecipePayload = () => {
    let latestId = latestRecipe ? parseInt(latestRecipe.id, 10) : 0;
    const id = (latestId+1).toString();
    const payload = {
      id,
      name: recipeName,
      slug: strToSlug(recipeName),
      ingredients: recipeItems.map(item => {
        const key = strToInputName(item.name);
        return { id: item.id, amount: amtSelectState[key] }
      }),
      hero: "choco_smoothie.jpg",
      tags: []
    }
    return payload;
  };

  return(
    <>
      <Typography className={classes.title} variant="h5" noWrap>Design Your Smoothie</Typography>
      <Typography className={classes.p} variant="body1" noWrap>
        You can make a healthy smoothie at home no matter which combination of ingredients you use.
      </Typography>
      <section className={classes.pantry} >
        {
          Object.values(IngredientCategories).map(category => {
            return (
              <div key={`cat_${category}`} className="category-list}">
                <Typography className={classes.title} variant="h6" noWrap>{category}</Typography>
                {
                  ingredients
                    .filter(item => item.category === category)
                    .map(ingredient => <PantryItem
                        key={`pantry_${ingredient.id}`}
                        ingredient={ingredient}
                        handleCheckboxChange={handleCheckboxChange}
                        checkboxState = {checkboxState}
                      />
                    )
                }
              </div>
            )
          })
        }
      </section>
      <Divider />
      <section className={classes.recipe} >
        <form>
          <TextField
            id="outlined-basic"
            label="Enter Recipe Name"
            variant="outlined"
            fullWidth
            onChange={(evt) => setRecipeName(evt.target.value)}
          />
          <Divider className={classes.verticalSpace} variant="middle" />
          {
            !!recipeItems.length && recipeItems.map(item => <PantryItemSelected
                key={`selected_${item.id}`}
                ingredient={item}
                amtSelectState={amtSelectState}
                handleAmtChange={handleAmtChange}
              />
            )
          }
          {
            !recipeItems.length && <Typography className={classes.placeholder} variant="h6" noWrap>Select Ingredients to Start</Typography>
          }
          <Divider className={classes.verticalSpace} variant="middle" />
          <Button
            variant="contained"
            color="primary"
            disabled={!formValid}
            onClick={handleSaveClick}
          >
            Save Recipe
          </Button>
        </form>
      </section>
    </>
  )
};

export default CreatePage;

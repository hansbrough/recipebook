/*
* An Ingredient to choose from a list
*/
import React from 'react';
import { Avatar, Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
//= ==== Utils ===== //
import {strToInputName} from '../utils/strUtils';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';
//material-ui jss
const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    border: '2px solid #dfdfdf',
    padding: '.25rem',
    marginRight: '.25rem'
  },
  horizontal: {
    display:'flex',
    alignItems:'center'
  }
}));

const PantryItem = ({ingredient, handleCheckboxChange, checkboxState}) => {
  const {id, name, image} = ingredient;
  const inputName         = strToInputName(name);
  const classes           = useStyles();

  return(
    <div className={classes.horizontal}>
      <Avatar
        className={classes.small}
        alt={name}
        src={`${UrlPaths.INGREDIENT_IMG_PATH}${image}`}
      />

      <FormControlLabel
        control={
          <Checkbox
            key={`checkbox_${id}`}
            checked={!!checkboxState[`${inputName}`]}
            id={id}
            onChange={handleCheckboxChange}
            name={`${inputName}`}
          />
        }
        label={name}
      />
    </div>
  )
};

export default PantryItem;

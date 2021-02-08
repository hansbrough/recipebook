/*
* Ingredient that has been choosen for a recipe
*/
import React from 'react';
import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';
//= ==== Utils ===== //
import {strToInputName} from '../utils/strUtils';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';
import MeasureAmounts from '../constants/MeasureAmounts';
//material-ui jss
const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    border: '3px solid #dfdfdf',
    padding: '.25rem',
    marginRight: '.25rem'
  },
  ingredient: {
    color: grey[800]
  },
  horizontalSpaced: {
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
  }
}));

const PantryItemSelected = ({ingredient, amtSelectState, handleAmtChange}) => {
  const {name, image, default_amt}  = ingredient;
  const inputName                   = strToInputName(name);
  const classes                     = useStyles();

  return(
    <div className={classes.horizontalSpaced}>
      <Avatar
        className={classes.large}
        alt={name}
        src={`${UrlPaths.INGREDIENT_IMG_PATH}${image}`}
      />
      <Typography className={classes.ingredient} variant="body1" noWrap>{name}</Typography>
      <FormControl className={classes.formControl}>
        <Select
          labelId={`${inputName}-amt-select-label`}
          id={`${inputName}-amt-select`}
          name={inputName}
          value={amtSelectState[`${inputName}`]}
          defaultValue={default_amt}
          onChange={handleAmtChange}
        >
          {
            Object.entries(MeasureAmounts).map(
              ([key, val]) => <MenuItem key={key} value={key}>{val}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    </div>
  )
};

export default PantryItemSelected;

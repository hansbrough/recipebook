import { useHistory } from 'react-router-dom';
import {AppBar, Button, InputBase, Toolbar, Typography} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
//= ==== Constants ===== //
import UrlPaths from '../constants/UrlPathConstants';

const HeaderBar = () => {
  const useStyles = makeStyles((theme) => ({
    title: {
      cursor: 'pointer',
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      }
    },
    nav: {
      flexGrow:1,
      marginLeft: '2rem'
    }
  }));

  const classes = useStyles();
  const history = useHistory();

  return(
    <AppBar position="static">
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h5"
          noWrap
          onClick={() => history.push({pathname: UrlPaths.HOME_PATH})} >
            SmoothieBook
        </Typography>
        <nav className={classes.nav}>
          <Button color="inherit" onClick={() => history.push({pathname: UrlPaths.HOME_PATH})} >Recipes</Button>
          <Button color="inherit" onClick={() => history.push({pathname: UrlPaths.CREATE_PATH})} >Create</Button>
        </nav>
        <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar;

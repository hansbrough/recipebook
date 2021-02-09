import {Typography} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

//material-ui jss
const useStyles = makeStyles((theme) => ({
  title: {
    color: grey[500]
  }
}));

const Footer = () => {
  const classes = useStyles();

  return(
    <footer style={{padding: `2rem`}}>
      <Typography
        className={classes.title}
        variant="h6"
      >
        © {new Date().getFullYear()}, Built with all natural ingredients.
      </Typography>
    </footer>
  )
}

export default Footer;

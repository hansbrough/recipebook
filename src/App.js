import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {Container, Typography} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';

import store from './store/store';

/*--Components--*/
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import Details from './components/Details';
import HeaderBar from './components/HeaderBar';

function App() {
  //material-ui jss
  const useStyles = makeStyles((theme) => ({
    base: {
      marginTop: theme.spacing(2)
    },
    title: {
      color: grey[500]
    }
  }));
  const classes = useStyles();

  return (
    <>
    <Provider store={store} >
      <Router>
        <div className="App">
          <HeaderBar />
          <Container component="main" className={classes.base}>
            <Route render={(props) => {
              const { location } = props;
              return (
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/create" component={Create} />
                  <Route path="/details/:recipe_slug" component={Details} />
                  <Route path="/edit/:recipe_slug" component={Edit} />
                </Switch>
              )}
            }
            />
          </Container>
          <footer style={{padding: `2rem`}}>
            <Typography
              className={classes.title}
              variant="h6"
            >
              © {new Date().getFullYear()}, Built with all natural ingredients.
            </Typography>
          </footer>
        </div>
      </Router>
    </Provider>
    </>
  );
}

export default App;

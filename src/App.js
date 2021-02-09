import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
/*--Redux--*/
import store from './store/store';
/*--Components--*/
import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import Details from './components/Details';
import HeaderBar from './components/HeaderBar';
import Footer from './components/footer'

function App() {
  //material-ui jss
  const useStyles = makeStyles((theme) => ({
    base: {
      marginTop: theme.spacing(2),
      overflow: 'scroll'
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
          <Footer />
        </div>
      </Router>
    </Provider>
    </>
  );
}

export default App;

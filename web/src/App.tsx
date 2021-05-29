import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import AuthStore from './contexts/AuthStore';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme/theme';
// screens
import Login from '../src/screens/auth/Login';
import Home from './components/Home';
// paths
import { PATH_AUTH } from './routes/paths';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthStore>
        <Router>
          <Switch>
            <Route exact path={PATH_AUTH.login} component={Login} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </AuthStore>
    </ThemeProvider>
  );
}

export default App;

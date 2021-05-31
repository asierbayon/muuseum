import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
// contexts
import AuthStore from './contexts/AuthStore';
import NotistackProvider from './contexts/NotistackProvider';
import theme from './theme/theme';
// screens
import Login from './screens/auth/Login';
import Home from './components/Home';
// paths
import { PATH_AUTH } from './routes/paths';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthStore>
        <NotistackProvider>
          <Router>
            <Switch>
              <Route exact path={PATH_AUTH.login} component={Login} />
              <Route exact path="/" component={Home} />
              <Redirect to="/" />
            </Switch>
          </Router>
        </NotistackProvider>
      </AuthStore>
    </ThemeProvider>
  );
}

export default App;

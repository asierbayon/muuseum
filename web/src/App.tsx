import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
// contexts
import AuthStore from './contexts/AuthStore';
import NotistackProvider from './contexts/NotistackProvider';
import theme from './theme/theme';
// components
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './components/Home';
import ResetPassword from './screens/auth/ResetPassword';

// paths
import { PATH_AUTH, PATH_COMMON, PATH_USERS } from './routes/paths';
import Settings from './screens/Settings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthStore>
        <NotistackProvider>
          <Router>
            <Switch>
              <Route exact path={PATH_AUTH.login} component={Login} />
              <Route exact path={PATH_AUTH.register} component={Register} />
              <Route exact path={PATH_AUTH.resetPassword} component={ResetPassword} />
              <Route exact path={PATH_USERS.settings} component={Settings} />
              <Route exact path={PATH_COMMON.home} component={Home} />
              <Redirect to={PATH_COMMON.home} />
            </Switch>
          </Router>
        </NotistackProvider>
      </AuthStore>
    </ThemeProvider>
  );
}

export default App;

import { combineReducers } from 'redux';
// slices
import assetsReducer from './slices/assets';
import usersReducer from './slices/users';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  assets: assetsReducer,
  users: usersReducer
});

export { rootReducer };

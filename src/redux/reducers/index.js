// import {combineReducers} from 'redux'


// import user from './user'
// import houses from './houses'

// export default combineReducers({user, houses})

import { combineReducers } from 'redux';

import user from './user'
import houses from './houses'


const appReducer = combineReducers({
  /* your app’s top-level reducers */
  user: user,
  houses: houses
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT_USER_FULFILLED') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
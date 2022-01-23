import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { withReduxStateSync } from 'redux-state-sync';

import authenticationReducer from './auth/authenticationReducers';
import failedAuthenticationReducer from './auth/failedAuthenticationReducer';

const rootReducer = combineReducers({ 
    session: sessionReducer,
    authentication: authenticationReducer,
    failedAuthenticationReducer: failedAuthenticationReducer,
})

export default withReduxStateSync(rootReducer)
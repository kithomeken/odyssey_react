import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { withReduxStateSync } from 'redux-state-sync';

import authenticationReducer from './auth/authenticationReducers';
import postAuthenticationReducer from './auth/postAuthenticationReducer';

const rootReducer = combineReducers({ 
    session: sessionReducer,
    authentication: authenticationReducer,
    postAuthentication: postAuthenticationReducer,
})

export default withReduxStateSync(rootReducer)
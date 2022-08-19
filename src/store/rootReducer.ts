import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { withReduxStateSync } from 'redux-state-sync';

import authenticationReducer from './auth/authenticationReducers';
import failedAuthenticationReducer from './auth/failedAuthenticationReducer';
import checkInvitationsReducer from './invitations/checkInvitationsReducer';

const rootReducer = combineReducers({ 
    session: sessionReducer,
    invitations: checkInvitationsReducer,
    authentication: authenticationReducer,
    failedAuthenticationReducer: failedAuthenticationReducer,
})

export default withReduxStateSync(rootReducer)
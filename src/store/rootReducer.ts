import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { withReduxStateSync } from 'redux-state-sync';

import authenticationReducer from './auth/authenticationReducers';
import failedAuthenticationReducer from './auth/failedAuthenticationReducer';
import { postAuthReducer } from './auth/postAuthReducer';
import { acceptInvitationsReducer } from './invitations/acceptInvitationReducer';
import checkInvitationsReducer from './invitations/checkInvitationsReducer';
import { postInvitationAuthReducer } from './invitations/postInvitationAuthReducer';

const rootReducer = combineReducers({ 
    session: sessionReducer,
    autoAuth: postInvitationAuthReducer,
    postAuth: postAuthReducer,
    invitations: checkInvitationsReducer,
    authentication: authenticationReducer,
    acceptedInvitation: acceptInvitationsReducer,
    failedAuthenticationReducer: failedAuthenticationReducer,
})

export default withReduxStateSync(rootReducer)
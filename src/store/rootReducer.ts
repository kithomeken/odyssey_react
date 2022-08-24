import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import { withReduxStateSync } from 'redux-state-sync';

import { accountAuthenticationReducer } from './auth/accountAuthenticationReducer';
import { acceptInvitationsReducer } from './invitations/acceptInvitationReducer';
import checkInvitationsReducer from './invitations/checkInvitationsReducer';

const rootReducer = combineReducers({ 
    session: sessionReducer,
    auth: accountAuthenticationReducer,

    invitations: checkInvitationsReducer,
    acceptedInvitation: acceptInvitationsReducer,
})

export default withReduxStateSync(rootReducer)
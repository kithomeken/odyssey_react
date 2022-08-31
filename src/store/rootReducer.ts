import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import { accountAuthenticationReducer } from './auth/accountAuthenticationReducer';
import invitationReducer from './invitations/invitationReducer';

const rootReducer = combineReducers({
    invite: invitationReducer,
    auth: accountAuthenticationReducer,
})

export default withReduxStateSync(rootReducer)
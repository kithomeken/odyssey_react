import { sessionService } from 'redux-react-session';
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import authenticationReducer from './auth/authenticationReducers';
import locationRecuder from './routing/locationReducer';
import checkInvitationsReducer from './invitations/checkInvitationsReducer';
import { acceptInvitationsReducer } from './invitations/acceptInvitationReducer';

const middlewares = [
    createStateSyncMiddleware(),
];

export const store = configureStore({
    reducer: {
        acceptedInvitation: acceptInvitationsReducer,
        checkInvitations: checkInvitationsReducer,
        authentication: authenticationReducer,
        locationRouting: locationRecuder,
    },
    middleware: [...getDefaultMiddleware(), ...middlewares],
});

initStateWithPrevTab(store);
sessionService.initSessionService(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

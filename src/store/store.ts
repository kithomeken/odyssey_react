import * as rp from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { sessionReducer, sessionService } from 'redux-react-session';
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, ThunkAction, Action, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import locationRecuder from './routing/locationReducer';
import checkInvitationsReducer from './invitations/checkInvitationsReducer';
import { acceptInvitationsReducer } from './invitations/acceptInvitationReducer';
import { accountAuthenticationReducer } from './auth/accountAuthenticationReducer';

const middlewares = [
    createStateSyncMiddleware(),
];

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    session: sessionReducer,
    locationRouting: locationRecuder,
    auth: accountAuthenticationReducer,

    acceptedInvitation: acceptInvitationsReducer,
    checkInvitations: checkInvitationsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
        },
      }), ...middlewares],
});


initStateWithPrevTab(store);
sessionService.initSessionService(store);

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

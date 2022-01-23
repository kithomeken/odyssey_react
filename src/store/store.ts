import { sessionService } from 'redux-react-session';
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import rootReducer from './rootReducer';
import authenticationReducer from './auth/authenticationReducers';
import locationRecuder from './routing/locationReducer';

const middlewares = [
    createStateSyncMiddleware(),
];

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        locationRouting: locationRecuder
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

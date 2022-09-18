/*
 * Standard routes countroller accessible 
 * by all account types, provided that they 
 * are authenticated.
*/
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { accountSignOutActions } from "../../store/auth/accountSignOutActions";

export default function ErrorRoutesController() {
    const dispatch = useDispatch()
    const location = useLocation()
    const currentLocation = location.pathname

    const authenticationState = useAppSelector(state => state.auth)
    const sessionState = Auth.checkAuthentication(authenticationState)

    const state = {
        from: currentLocation
    }
    
    
    if (!sessionState.isAuthenticated) {
        if (sessionState.resetAccountSession) {
            /* 
             * Redux session state is authenticated
             * but cookies are not set.
             * 
             * Reset session and start all-over again
            */

            dispatch(accountSignOutActions())
        }

        return <Navigate to="/auth/sign-in" replace state={state} />
    }

    return (
        <Outlet />
    )
}

import { Navigate, Outlet, useLocation } from "react-router-dom";

import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { postAuthRoute } from "../../routes/auth/protectedRoutes";
import { accountSignOutActions } from "../../store/auth/accountSignOutActions";
import { standardErrorRoutes } from "../../routes/errorRoutes";

export default function AuthRouteController() {
    const dispatch = useDispatch()
    const location = useLocation()
    const locationState: any = location.state

    const authenticationState = useAppSelector(state => state.auth)
    const sessionState = Auth.checkAuthentication(authenticationState)

    if (sessionState.isAuthenticated) {
        if (!sessionState.accountInfoExists) {
            const currentLocation = location.pathname

            const postAuthenticationRoute: any = (postAuthRoute.find((routeName) => routeName.name === 'POST_AUTH_'))?.path        
            const redirectRoute = postAuthenticationRoute + '?auid=' + authenticationState.uaid

            const state = {
                from: currentLocation
            }
            return <Navigate to={redirectRoute} replace state={state} />
        }

        if (sessionState.suspendedAccount) {
            const suspendedAccountRoute: any = (standardErrorRoutes.find((routeName) => routeName.name === 'SSPND_ACC'))?.path
            return <Navigate to={suspendedAccountRoute} replace />;
        }

        if (sessionState.accountAccessExpired) {
            // Account access right has expired
            const accountAccessExpired: any = (standardErrorRoutes.find((routeName) => routeName.name === 'EXPRD_ACC_'))?.path
            return <Navigate to={accountAccessExpired} replace />;
        }

        // Redirect to home or the previous location
        if (locationState === null || locationState === undefined) {
            return <Navigate to="/home" replace />;
        } else {
            return <Navigate to={locationState.from} replace />;
        }
    } else {
        // Not authenticated
        if (sessionState.resetAccountSession) {
            /* 
             * Redux session state is authenticated
             * but cookies are not set.
             * 
             * Reset session and start all-over again
            */

            dispatch(accountSignOutActions())
        }

        // Proceed to authentication pages
    }

    return (
        <Outlet />
    )
}
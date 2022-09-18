/*
 * Standard routes countroller accessible 
 * by all account types, provided that they 
 * are authenticated.
*/
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Auth from "./Auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { postAuthRoute } from "../../routes/auth/protectedRoutes";
import { TopNavigation } from "../../components/standard/TopNavigation";
import { accountSignOutActions } from "../../store/auth/accountSignOutActions";
import { standardErrorRoutes } from "../../routes/errorRoutes";

export default function StandardRoutesController() {
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
    } else {
        if (!sessionState.accountInfoExists) {
            // Account information does not exists
            const postAuthenticationRoute: any = (postAuthRoute.find((routeName) => routeName.name === 'POST_AUTH_'))?.path        
            const redirectRoute = postAuthenticationRoute + '?auid=' + authenticationState.uaid

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
    }

    const marginTop = {marginTop: '64px'}

    return (
        <div>
            <div className="flex h-screen">
                
                <TopNavigation />

                <div className="flex flex-col w-full mb-5">
                    <div className="w-full overflow-y-auto">
                        <div className="kiOAkj" style={marginTop}>

                            <Outlet />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

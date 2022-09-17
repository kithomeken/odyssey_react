/*
 * Master authenticated routes accessible 
 * By master account types ONLY, provided that they 
 * are authenticated.
*/

import { Navigate, Outlet, useLocation } from "react-router-dom";

import Auth from "./Auth";
import { useDispatch } from "react-redux";
import Crypto from "../../encryption/Crypto";
import { useAppSelector } from "../../store/hooks";
import Error500 from "../../pages/errors/Error500";
import CookieServices from "../../services/CookieServices";
import Navigation from "../../components/settings/Navigation";
import { ACCOUNT_INFO_COOKIE } from "../../global/CookieNames";
import { postAuthRoute } from "../../routes/auth/protectedRoutes";
import { accountSignOutActions } from "../../store/auth/accountSignOutActions";
import { TopHeader } from "../../components/layouts/TopHeader";
import { standardErrorRoutes } from "../../routes/errorRoutes";

export default function MasterAuthorizedRoutesController() {
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

    const enAccountInfo = CookieServices.get(ACCOUNT_INFO_COOKIE)
    const deAccountInfo = Crypto.decryptDataUsingAES256(enAccountInfo)
    const accountInfo = JSON.parse(deAccountInfo)

    const marginLeft = { marginLeft: '288px' }
    const marginTop = { marginTop: '64px' }

    return (
        <div>
            {
                accountInfo.account_type !== 'WM' ? (
                    <div className="flex h-screen">
                        <Navigation
                            activeMenu={'activeMenu'}
                        />

                        <TopHeader
                            showSettings={false}
                        />

                        <div className="flex flex-col w-full" style={marginLeft}>
                            <div className="w-full overflow-y-auto">
                                <div className="kiOAkj" style={marginTop}>

                                    <Outlet />

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Error500 />
                )
            }
        </div>
    )
}

import React from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

import { useAppSelector } from "../../store/hooks"
import { guestRoutes } from "../../routes/auth/guestRoutes"
import postSignInWait from '../../assets/images/post_sign_in_wait.png'
import { accountAuthenticationActions } from "../../store/auth/accountAuthenticationActions"
import { postAccountAuthenticationActions } from "../../store/auth/postAccountAuthenticationActions"

export const PostInvitationAuth = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const authenticationState = useAppSelector(state => state.auth)

    let searchParams: any = {};
    let searchKey = location.search?.split("?")[1]?.split("&");

    searchKey?.forEach((el) => {
        let [k, v] = el?.split("=");
        searchParams[k] = v.replaceAll("%20", " ");
    });

    React.useEffect(() => {
        autoAuthenticateVerifiedAccount()
    }, []);

    function redirectToSignIn() {
        const signInRoute = (guestRoutes.find((routeName) => routeName.name === 'SIGN_IN'))?.path
        return <Navigate replace to={signInRoute} />
    }

    const autoAuthenticateVerifiedAccount = () => {
        const props = {
            auto: true,
            urlParams: searchParams,
            locationState: location.state
        }

        dispatch(accountAuthenticationActions(props))
    }

    if (authenticationState.error !== null && authenticationState.error !== undefined) {
        return redirectToSignIn()
    }

    if (authenticationState.isAuthenticated) {
        dispatch(postAccountAuthenticationActions())
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Signing you in... </title>
            </Helmet>

            <div className="wrapper">
                <section className="gx-container">
                    <div className="w-full">
                        <img src={postSignInWait} width="50px" className="block text-center m-auto" aria-details="https://www.flaticon.com/free-icons/login" alt="Login icons created by Eucalyp - Flaticon" />

                        <p className="text-center mb-0 text-sm mt-4 text-green-600">
                            Please wait as we sign you in. <br/> Do not close your browser
                        </p>
                    </div>

                    <div className="flex flex-col align-middle mt-5 mb-6 h-5">
                        <span className="fad text-green-500 fa-spinner-third fa-2x m-auto block fa-spin"></span>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
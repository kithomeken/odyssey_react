import React from "react"
import { Helmet } from "react-helmet"
import { useDispatch } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

import postSignInWait from '../../assets/images/post_sign_in_wait.png'
import { guestRoutes } from "../../routes/auth/guestRoutes"
import { postInvitationAuthActions } from "../../store/invitations/postInvitationAuthActions"
import { useAppSelector } from "../../store/hooks"
import { postAuthActions } from "../../store/auth/postAuthActions"

export const PostInvitationAuth = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const autoAuthState = useAppSelector(state => state.autoAuth)
    const postAuthState = useAppSelector(state => state.postAuth)

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
        dispatch(postInvitationAuthActions(location.state, searchParams))
    }

    if (autoAuthState.redirectToAuth) {
        return redirectToSignIn()
    }

    if (autoAuthState.isAuthenticated) {
        dispatch(postAuthActions())
    }

    if (postAuthState.redirect) {
        return <Navigate replace to="/home" />
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
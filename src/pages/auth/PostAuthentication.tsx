import React from 'react'
import {Helmet} from "react-helmet"
import {useDispatch} from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../store/hooks';
import postSignInWait from '../../assets/images/post_sign_in_wait.png'
import { postAccountAuthenticationActions } from '../../store/auth/postAccountAuthenticationActions';

export const PostAuthentication = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const authenticationState = useAppSelector(state => state.auth)
    
    React.useEffect(() => {
        fetchAuthenticateAccountDetails()
    }, []);

    const fetchAuthenticateAccountDetails = () => {
        dispatch(postAccountAuthenticationActions())
    }

    if (authenticationState.isAuthenticated) {
        if (authenticationState.accountName !== null && authenticationState.accountName !== undefined) {
            const locationState: any = location.state

            if (locationState.from === null || locationState.from === undefined) {
                return <Navigate replace to="/home" />
            } else {
                return <Navigate replace to={locationState.from} />
            }
        }
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
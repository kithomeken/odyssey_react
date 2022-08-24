import React from 'react'
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet"

import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import postSignInWait from '../../assets/images/post_sign_in_wait.png'
import { postAccountAuthenticationActions } from '../../store/auth/postAccountAuthenticationActions';

export const PostAuthentication = () => {
    const dispatch = useDispatch()
    const authenticationState = useAppSelector(state => state.auth)
    console.log('Post authentication');
    

    React.useEffect(() => {
        fetchAuthenticateAccountDetails()
    }, []);

    const fetchAuthenticateAccountDetails = () => {
        'Dispatched post auth actions'
        dispatch(postAccountAuthenticationActions())
    }

    const redirectToSignIn = () => {
        console.log('Back to sign in - post auth');
        
        return <Navigate replace to="/auth/sign-in" />
    }

    if (!authenticationState.isAuthenticated) {
        redirectToSignIn()
    } else {
        if (authenticationState.accountName !== null && authenticationState.accountName !== undefined) {            
            return <Navigate replace to="/home" />
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
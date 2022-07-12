import React from 'react'
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet"

import postSignInWait from '../../assets/images/post_sign_in_wait.png'
import Crypto from '../../encryption/Crypto';
import HttpServices from '../../services/HttpServices';
import CookieServices from '../../services/CookieServices';
import { COOKIE_OPTIONS } from '../../global/ConstantsRegistry';

import { Navigate } from 'react-router-dom';
import { usePromiseEffect } from '../../lib/hooks/usePromiseEffect';
import { ACCOUNT_EMAIL_COOKIE, ACCOUNT_NAME_COOKIE } from '../../global/CookieNames';

const PostAuthentication = () => {
    const dispatch = useDispatch()
    const postAuthenticationProcess = usePromiseEffect(async () => {
        const response: any = await HttpServices.httpGet('auth/account/agent/info')

        if (response.status !== 200) {
            throw new Error("Something went wrong while signing user in.");
        }

        console.log(response);
        const accountName = response.data.first_name + ' ' + response.data.last_name
        const accountEmail = response.data.email

        const encryptedAccountName = Crypto.encryptDataUsingAES256(accountName)
        const encryptedAccountEmail = Crypto.encryptDataUsingAES256(accountEmail)
                
        CookieServices.set(ACCOUNT_NAME_COOKIE, encryptedAccountName, COOKIE_OPTIONS)
        CookieServices.set(ACCOUNT_EMAIL_COOKIE, encryptedAccountEmail, COOKIE_OPTIONS)

        return {response}
    }, [dispatch])
    
    if (postAuthenticationProcess.status === 'fulfilled') {
        return <Navigate replace to="/home" />
    }

    return(
        <React.Fragment>
            <Helmet>
                <title>Signing you in... </title>
            </Helmet>

            <div className="wrapper">
                <section className="gx-container">
                    <div className="w-full">
                        <img src={postSignInWait} width="70px" className="block text-center m-auto" aria-details="https://www.flaticon.com/free-icons/login" alt="Login icons created by Eucalyp - Flaticon" />

                        <p className="text-center mb-0 mt-4 text-green-600">
                            Please wait as we sign you in...
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

export default PostAuthentication
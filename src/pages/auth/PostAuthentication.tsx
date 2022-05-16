import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet"

import postSignInWait from '../../assets/images/post_sign_in_wait.png'
import ApiServices from '../../api/ApiServices';
import Crypto from '../../encryption/Crypto';
import Loading from '../../components/layouts/Loading'
import HttpServices from '../../services/HttpServices';
import CookieServices from '../../services/CookieServices';
import ConstantsRegistry from '../../global/ConstantsRegistry';

import { Navigate, useLocation } from 'react-router-dom';
import { usePromiseEffect } from '../../lib/hooks/usePromiseEffect';

const PostAuthentication = () => {
    // const [state, setstate] = useState({
    //     requestFailed: false,
    //     isLoading: true,
    //     data: null
    // })

    // const dispatch = useDispatch()
    // const location = useLocation()

    // const postAuthenticationProcess = usePromiseEffect(async () => {
    //     const apiDomain = ApiServices.apiDomain()
    //     const apiCall = apiDomain + `auth/account/agent/info`
    //     const response: any = await HttpServices.httpGet(apiCall)

    //     if (response.status !== 200) {
    //         throw new Error("Something went wrong while signing user in.");
    //     }

    //     const accountName = response.first_name + ' ' + response.last_name
    //     const accountEmail = response.email
    //     const options = {path: '/', secure: true, sameSite: 'none'}

    //     const encryptedAccountName = Crypto.encryptDataUsingAES256(accountName)
    //     const encryptedAccountEmail = Crypto.encryptDataUsingAES256(accountEmail)
        
    //     const cookieNameForAccountName = ConstantsRegistry.cookieNameForAccountName()
    //     const cookieNameForAccountEmail = ConstantsRegistry.cookieNameForAccountEmail()
        
    //     CookieServices.set(cookieNameForAccountName, encryptedAccountName, options)
    //     CookieServices.set(cookieNameForAccountEmail, encryptedAccountEmail, options)

    //     return {response}
    // }, [dispatch])
    
    // if (postAuthenticationProcess.status === 'fulfilled') {
    //     return <Navigate replace to="/home" />
    // }

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
                            Signing you in...
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
import React, {useState, useEffect} from 'react'
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet"

import Crypto from '../../encryption/Crypto';
import CookieServices from '../../services/CookieServices';
import Loading from '../../lib/layouts/Loading'
import ConstantsRegistry from '../../global/ConstantsRegistry';

import { useAppSelector } from '../../store/hooks';
import { postAuthentication } from '../../store/auth/postAuthenticationActions';
import { Navigate, useLocation } from 'react-router-dom';
import { failedAuthentication } from '../../store/auth/failedAuthenticationActions';

const PostAuthentication = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const locationState = location.state

    const postAuthState = useAppSelector((state) => state.postAuthentication);

    const [loadingState, setLoadingState] = useState({
        isLoading: true
    })

    const accountName = ConstantsRegistry.cookieNameForAccountName()
    const accountEmail = ConstantsRegistry.cookieNameForAccountEmail()

    const postAuthActions = () => async (dispatch: any) => {
        try {
            const encryptedSanctumToken = CookieServices.get(ConstantsRegistry.cookieNameForSanctumToken())
            const sanctumToken = Crypto.decryptDataUsingAES256(encryptedSanctumToken)
            dispatch(postAuthentication(sanctumToken))
        } catch (error) {
            console.log(error)
            dispatch(failedAuthentication())
        }
    }

    useEffect(() => {
        dispatch(postAuthActions())
    }, [dispatch])

    const loadData = () => {
        // if (agentCarter === null || agentCartersEmail === null) {
            // const encryptedSanctumToken = CookieServices.get(ConstantsRegistry.cookieNameForSanctumToken())
            // const sanctumToken = Crypto.decryptDataUsingAES256(encryptedSanctumToken)

            // let g3 = dispatch(postAuthentication(sanctumToken))
            // console.log("G3", g3)
        // }
    }

    if (postAuthState.isAuthenticated) {
        if (locationState) {
            alert('TODO:// Tried to navigate back to page but failed...')
            // return <Navigate replace to={fromLocation} />;
        } else {
            return <Navigate replace to="/home" />;
        }
    }
    
    if (postAuthState.errorMode) {
        dispatch(failedAuthentication())
    }

    return(
        <React.Fragment>
            <Helmet>
                <title>Signing you in... </title>
            </Helmet>

            {
                postAuthState.isLoading ? (
                    <Loading />
                ) : (
                    <div className="mb-3 pt-3 px-10 w-full">
                        <button className="auth-submit-button" type="button" onClick={loadData}>
                            <span>
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="w-5 h-5 text-white group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>

                                Load Page
                            </span>
                        </button>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default PostAuthentication
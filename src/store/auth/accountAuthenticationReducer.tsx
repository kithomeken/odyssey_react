import Crypto from "../../encryption/Crypto";
import CookieServices from "../../services/CookieServices";
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry";
import { ACCOUNT_INFO_COOKIE, SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames";

const initialState = {
    uaid: null,
    error: null,
    email: null,
    redirect: false, /* Redirects back to sign in */
    accountName: null,
    processing: false,
    isAuthenticated: false,
}

export const accountAuthenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'DATA_INTEGRITY_COMPROMISED_':
            return {
                ...initialState,
                uaid: null,
                error: null,
                redirect: true,
                processing: false,
                isAuthenticated: false,
            }
    
        case 'ACCOUNT_AUTHENTICATION_PENDING_':
            return {
                ...initialState,
                uaid: null,
                error: null,
                redirect: false,
                processing: true,
                isAuthenticated: false,
            }
    
        case 'ACCOUNT_AUTHENTICATION_COMPLETED_':
            /* Create cookie sessions for account */
            const enSanctumToken = Crypto.encryptDataUsingAES256(action.response.token)
            CookieServices.set(SANCTUM_COOKIE_NAME, enSanctumToken, COOKIE_OPTIONS)

            const enUuidToken = Crypto.encryptDataUsingAES256(action.response.uuid)
            CookieServices.set(UUID_COOKIE_NAME, enUuidToken, COOKIE_OPTIONS)

            return {
                ...initialState,
                uaid: enUuidToken,
                error: null,
                redirect: false,
                processing: false,
                isAuthenticated: true,
            }

        case 'ACCOUNT_AUTHENTICATION_FAILED_':
        case 'ACCOUNT_AUTHENTICATION_RUNTIME_EXCEPTION_':
            return {
                ...initialState,
                uaid: null,
                redirect: false,
                processing: false,
                isAuthenticated: false,
                error: "Credentials provided did not match our records",
            }

        case 'ACCOUNT_INFO_LOADING_':
            return {
                ...initialState,
                email: null,
                accountName: null,
                processing: false,
            }

        case 'ACCOUNT_INFO_LOADING_':
            const accountDetails = action.response.account
            const enAccountDetails = Crypto.encryptDataUsingAES256(accountDetails)
            CookieServices.set(ACCOUNT_INFO_COOKIE, enAccountDetails, COOKIE_OPTIONS)

            return {
                ...initialState,
                email: accountDetails.email,
                accountName: accountDetails.account_name,
            }

        case 'ACCOUNT_INFO_ERROR_':
        case 'ACCOUNT_INFO_EXCEPTION_':
            return {
                ...initialState,
                uaid: null,
                email: null,
                redirect: true,
                accountName: null,
                isAuthenticated: false,
                error: "User account is not signed in"
            }

        case 'ACCOUNT_SIGN_OUT_PROCESSING_':
            return {
                ...initialState,
                error: null,
                redirect: false,
                processing: true,
            }

        case 'ACCOUNT_SIGNED_OUT_':
        case 'ACCOUNT_SIGN_OUT_EXCEPTION_':
            return {
                ...initialState,
                uaid: null,
                email: null,
                error: null,
                redirect: true,
                accountName: null,
                processing: false,
                isAuthenticated: false,
            }
       
        default:
            return state;
    }
}
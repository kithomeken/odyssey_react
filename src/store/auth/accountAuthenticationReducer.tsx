import Crypto from "../../encryption/Crypto";
import CookieServices from "../../services/CookieServices";
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry";
import { ACCOUNT_EMAIL_COOKIE, ACCOUNT_NAME_COOKIE, SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames";

const initialState = {
    uaid: null,
    error: null,
    email: null,
    accountName: null,
    processing: false,
    isAuthenticated: false,
}

export const accountAuthenticationReducer = (state = initialState, action: any) => {
    const uaidString = CookieServices.get(UUID_COOKIE_NAME)

    switch (action.type) {
        case 'DATA_INTEGRITY_COMPROMISED_':
            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: 'Auto-sign in failed',
            }
    
        case 'ACCOUNT_AUTHENTICATION_PENDING_':
            return {
                ...initialState,
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
                processing: false,
                isAuthenticated: true,
            }

        case 'ACCOUNT_AUTHENTICATION_FAILED_':
        case 'ACCOUNT_AUTHENTICATION_RUNTIME_EXCEPTION_':
            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: "Credentials provided did not match our records",
            }

        case 'ACCOUNT_INFO_LOADING_':
            return {
                ...initialState,
                uaid: uaidString,
                processing: false,
                isAuthenticated: true
            }

        case 'ACCOUNT_INFO_LOADED_':
            const accountDetails = action.response.account
            const enAccountName = Crypto.encryptDataUsingAES256(accountDetails.account_name)
            CookieServices.set(ACCOUNT_NAME_COOKIE, enAccountName, COOKIE_OPTIONS)
            
            const enAccountEmail = Crypto.encryptDataUsingAES256(accountDetails.email)
            CookieServices.set(ACCOUNT_EMAIL_COOKIE, enAccountEmail, COOKIE_OPTIONS)

            return {
                ...initialState,
                uaid: uaidString,
                processing: false,
                isAuthenticated: true,
                email: accountDetails.email,
                accountName: accountDetails.account_name,
            }

        case 'ACCOUNT_INFO_ERROR_':
        case 'ACCOUNT_INFO_EXCEPTION_':
            CookieServices.remove(ACCOUNT_NAME_COOKIE)
            CookieServices.remove(ACCOUNT_EMAIL_COOKIE)
            CookieServices.remove(UUID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: "User account is not signed in"
            }

        case 'ACCOUNT_SIGN_OUT_PROCESSING_':
            let ckAccountName = CookieServices.get(ACCOUNT_NAME_COOKIE)
            ckAccountName = Crypto.decryptDataUsingAES256(ckAccountName)
            
            let ckAccountEmail = CookieServices.get(ACCOUNT_EMAIL_COOKIE)
            ckAccountEmail = Crypto.decryptDataUsingAES256(ckAccountEmail)

            return {
                ...initialState,
                processing: true,
                uaid: uaidString,
                isAuthenticated: true,
                email: ckAccountEmail,
                accountName: ckAccountName,
            }

        case 'ACCOUNT_SIGNED_OUT_':
        case 'ACCOUNT_SIGN_OUT_EXCEPTION_':
            // Revoke authentication access
            CookieServices.remove(ACCOUNT_NAME_COOKIE)
            CookieServices.remove(ACCOUNT_EMAIL_COOKIE)
            CookieServices.remove(UUID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
            }
       
        default:
            return state;
    }
}
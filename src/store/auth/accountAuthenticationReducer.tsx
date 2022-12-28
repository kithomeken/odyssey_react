import Auth from "../../lib/router/Auth";
import Crypto from "../../encryption/Crypto";
import CookieServices from "../../services/CookieServices";
import StorageServices from "../../services/StorageServices";
import {COOKIE_OPTIONS, KEY_ACCOUNT_INFO} from "../../global/ConstantsRegistry";
import { ACCOUNT_INFO_COOKIE, SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames";

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
            const jsonAccountInfo = action.response.account
            const stringAccountInfo = JSON.stringify(jsonAccountInfo)

            const enAccountInfo = Crypto.encryptDataUsingAES256(stringAccountInfo)
            StorageServices.setLocalStorage(KEY_ACCOUNT_INFO, enAccountInfo)

            return {
                ...initialState,
                uaid: uaidString,
                processing: false,
                isAuthenticated: true,
                email: jsonAccountInfo.email,
                accountName: jsonAccountInfo.account_name,
            }

        case 'ACCOUNT_INFO_ERROR_':
        case 'ACCOUNT_INFO_EXCEPTION_':
            CookieServices.remove(UUID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
                error: "User account is not signed in"
            }

        case 'ACCOUNT_SIGN_OUT_PROCESSING_':
            const encryptedAccountInfo = Auth.isCookieSet(ACCOUNT_INFO_COOKIE)
            let reduxState = null

            if (encryptedAccountInfo !== null) {
                const decryptedAccountInfo = Crypto.decryptDataUsingAES256(encryptedAccountInfo)
                const accountInfo = JSON.parse(decryptedAccountInfo)  

                reduxState = {
                    ...initialState,
                    processing: true,
                    uaid: uaidString,
                    isAuthenticated: true,
                    email: accountInfo.email,
                    accountName: accountInfo.account_name,
                }  
            } else {
                reduxState = {
                    ...initialState,
                    processing: true,
                    uaid: uaidString,
                    isAuthenticated: true,
                    email: null,
                    accountName: null,
                }  
            }

            return reduxState

        case 'ACCOUNT_SIGNED_OUT_':
            // Revoke authentication access
            // Remove token cookie only
            CookieServices.remove(SANCTUM_COOKIE_NAME)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
            }

        case 'SPECIAL_ACCOUNT_SIGNED_OUT_':
        case 'ACCOUNT_SIGN_OUT_EXCEPTION_':
            /* 
             * Special account sign out
             * for suspended account and 
             * expired accounts.
             * 
             * This is to facilitate fetching 
             * of the updated account information
             * once user logs in once again.
            */
            CookieServices.remove(UUID_COOKIE_NAME)
            CookieServices.remove(SANCTUM_COOKIE_NAME)
            CookieServices.remove(ACCOUNT_INFO_COOKIE)

            return {
                ...initialState,
                processing: false,
                isAuthenticated: false,
            }

        default:
            return state;
    }
}
import Crypto from "../../encryption/Crypto";
import CookieServices from "../../services/CookieServices";
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry";
import { SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames";

const initialState = {
    uaid: null,
    error: null,
    redirect: false, /* Redirects back to sign in */
    authenticating: false,
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
                authenticating: false,
                isAuthenticated: false,
            }
    
        case 'ACCOUNT_AUTHENTICATION_PENDING_':
            return {
                ...initialState,
                uaid: null,
                error: null,
                redirect: false,
                authenticating: true,
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
                authenticating: false,
                isAuthenticated: true,
            }

        case 'ACCOUNT_AUTHENTICATION_FAILED_':
        case 'ACCOUNT_AUTHENTICATION_RUNTIME_EXCEPTION_':
            return {
                ...initialState,
                uaid: null,
                redirect: false,
                authenticating: false,
                isAuthenticated: false,
                error: "Credentials provided did not match our records",
            }

        default:
            return state;
    }
}
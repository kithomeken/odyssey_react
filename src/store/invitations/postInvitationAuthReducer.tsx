import Crypto from "../../encryption/Crypto"
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry"
import { SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames"
import CookieServices from "../../services/CookieServices"

const initialState = {
    redirectToAuth: false,
    isAuthenticated: false,
}

export const postInvitationAuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'DATA_INTEGRITY_COMPROMISED_':
            return {
                ...initialState,
                redirectToAuth: true,
                isAuthenticated: false,
            }

        case 'AUTO_AUTH_COMPLETED_':
            console.log('AUTO_AUTH_COMPLETED_', action.response);
            
            // Create cookie sessions for account
            const encryptedSanctumToken = Crypto.encryptDataUsingAES256(action.response.token)
            const encryptedUuidToken = Crypto.encryptDataUsingAES256(action.response.uuid)
            CookieServices.set(SANCTUM_COOKIE_NAME, encryptedSanctumToken, COOKIE_OPTIONS)
            CookieServices.set(UUID_COOKIE_NAME, encryptedUuidToken, COOKIE_OPTIONS)

            return {
                ...initialState,
                redirectToAuth: false,
                isAuthenticated: true,
            }

        case 'AUTO_AUTH_FAILED_':
        case 'AUTO_AUTH_EXCEPTION_':
            return {
                ...initialState,
                redirectToAuth: true,
                isAuthenticated: false,
            }

        default:
            return state
    }
}
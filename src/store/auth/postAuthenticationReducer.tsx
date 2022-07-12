import Crypto from "../../encryption/Crypto"
import CookieServices from "../../services/CookieServices"
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry"
import { ACCOUNT_EMAIL_COOKIE, ACCOUNT_NAME_COOKIE } from "../../global/CookieNames"

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    errorMode: false,
    first_name: '',
    last_name: '',
    uuid: '',
    email: '',
    msisdn: '',
    teams_id: '',
}

const postAuthenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'POST_AUTH_LOADING_':
            return {
                ...initialState,
                isLoading: true,
                isAuthenticated: false,
            }

        case 'POST_AUTH_DETAILS_':
            const response = action.response
            const agentCarter = response.first_name + ' ' + response.last_name
            const agentCarterEmail = response.email

            const encryptedAgentCarter = Crypto.encryptDataUsingAES256(agentCarter)
            const encryptedAgentCarterEmail = Crypto.encryptDataUsingAES256(agentCarterEmail)

            CookieServices.set(ACCOUNT_NAME_COOKIE, encryptedAgentCarter, COOKIE_OPTIONS)
            CookieServices.set(ACCOUNT_EMAIL_COOKIE, encryptedAgentCarterEmail, COOKIE_OPTIONS)

            return {
                ...initialState,
                isLoading: false,
                isAuthenticated: true,
                first_name: response.first_name,
                last_name: response.last_name,
                uuid: response.uuid,
                email: response.email,
            }

        case 'POST_AUTH_INVALID_TOKEN_':
        case 'POST_AUTH_CATCH_EXCEPTION_':
        default:
            console.log('error state - 0000000')
            return {
                ...initialState,
                errorMode: true,
                isAuthenticated: false,
            }
    }
}

export default postAuthenticationReducer
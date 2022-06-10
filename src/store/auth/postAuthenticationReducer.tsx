import CookieServices from "../../services/CookieServices"
import Crypto from "../../encryption/Crypto"
import ConstantsRegistry, { COOKIE_OPTIONS } from "../../global/ConstantsRegistry"

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
            
            const accountNameCookie = ConstantsRegistry.accountNameCookie()
            const accountEmailCookie = ConstantsRegistry.accountEmailCookie()
            
            CookieServices.set(accountNameCookie, encryptedAgentCarter, COOKIE_OPTIONS)
            CookieServices.set(accountEmailCookie, encryptedAgentCarterEmail, COOKIE_OPTIONS)

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
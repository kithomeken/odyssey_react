import CookieServices from "../../services/CookieServices";
import Crypto from "../../encryption/Crypto";
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry";
import { SANCTUM_COOKIE_NAME, UUID_COOKIE_NAME } from "../../global/CookieNames";

const initialState = {
    loading: false,
    error: '',
    uuid: ''
};

const authenticationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "AUTHENTICATION_":
            // Create a new session in successful sign in
            const encryptedAccessToken = Crypto.encryptDataUsingAES256(action.response.data.token)
            const encryptedUuidToken = Crypto.encryptDataUsingAES256(action.response.data.uuid)
            
            CookieServices.set(SANCTUM_COOKIE_NAME, encryptedAccessToken, COOKIE_OPTIONS)
            CookieServices.set(UUID_COOKIE_NAME, encryptedUuidToken, COOKIE_OPTIONS)

            return {
                ...initialState,
                error: '',
                loading: true,
                uuid: action.response.data.uuid
            };

        case "AUTHENTICATION_FAILED_CREDENTIALS_":
            // Wrong credentials provided when signing in
            const apiResponse = action.response.data

            return {
                ...initialState,
                error: apiResponse.message,
                loading: false,
                uuid: ''
            };

        case "AUTHENTICATION_CATCH_EXCEPTION_":
            return {
                ...initialState,
                error: 'Failed. Credentials did not match our records.',
                loading: false,
                uuid: ''
            };

        default: 
            return state

    }
}

export default authenticationReducer;
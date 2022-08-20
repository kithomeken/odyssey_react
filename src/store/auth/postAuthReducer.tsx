import CookieServices from "../../services/CookieServices";
import Crypto from "../../encryption/Crypto";
import { COOKIE_OPTIONS } from "../../global/ConstantsRegistry";
import { ACCOUNT_NAME_COOKIE, ACCOUNT_EMAIL_COOKIE } from "../../global/CookieNames";

const initialState = {
    error: null,
    redirect: false
};

export const postAuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "ACCOUNT_INFO_":
            console.log('ACCOUNT_INFO_', action.response);

            const accountName = action.response.account.account_name
            const enAccountName = Crypto.encryptDataUsingAES256(accountName)
            CookieServices.set(ACCOUNT_NAME_COOKIE, enAccountName, COOKIE_OPTIONS)

            const accountEmail = action.response.account.email
            const enAccountEmail = Crypto.encryptDataUsingAES256(accountEmail)
            CookieServices.set(ACCOUNT_EMAIL_COOKIE, enAccountEmail, COOKIE_OPTIONS)

            return {
                ...initialState,
                error: null,
                redirect: true,
            };

        case "NO_ACCOUNT_INFO":
        case "ACCOUNT_INFO_EXCEPTION":
            return {
                ...initialState,
                error: null,
                redirect: true,
            };

        default: 
            return state
    }
}
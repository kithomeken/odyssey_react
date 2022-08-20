import axios from "axios";

import Crypto from "../../encryption/Crypto";
import CookieServices from "../../services/CookieServices";
import { SANCTUM_COOKIE_NAME } from "../../global/CookieNames";
import { API_DOMAIN_PREFIX, AUTH_ACCOUNT_INFO } from "../../api/ApiRegistry";

export const postAuthActions = () => {
    return async (dispatch: (argo: {type: string, response: any}) => void) => {
        const enSanctumToken = CookieServices.get(SANCTUM_COOKIE_NAME)
        const deSanctumToken = Crypto.decryptDataUsingAES256(enSanctumToken)

        const accountInfoRoute = API_DOMAIN_PREFIX + AUTH_ACCOUNT_INFO
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + deSanctumToken,
            }
        }

        axios
        .get(accountInfoRoute, authorizationBearer)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "ACCOUNT_INFO_",
                    response: response.data.payload,
                });
            } else {
                dispatch({
                    type: "NO_ACCOUNT_INFO",
                    response: null,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: "ACCOUNT_INFO_EXCEPTION",
                response: "Account is not authenticated",
            });
        })
    }
}
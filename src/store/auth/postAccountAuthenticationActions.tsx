import axios from "axios";

import Crypto from "../../encryption/Crypto";
import CookieServices from "../../services/CookieServices";
import { SANCTUM_COOKIE_NAME } from "../../global/CookieNames";
import { AUTHENTICATED_ACCOUNT_INFO } from "../../api/ApiRegistry";

export const postAccountAuthenticationActions = () => {
    return (dispatch: (argo: {type: string, response: any}) => void) => {
        dispatch({
            type: "ACCOUNT_INFO_LOADING_",
            response: null,
        });

        const enSanctumToken = CookieServices.get(SANCTUM_COOKIE_NAME)
        const deSanctumToken = Crypto.decryptDataUsingAES256(enSanctumToken)
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + deSanctumToken,
            }
        }

        axios
        .get(AUTHENTICATED_ACCOUNT_INFO, authorizationBearer)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "ACCOUNT_INFO_LOADED_",
                    response: response.data.payload,
                });
            } else {
                dispatch({
                    type: "ACCOUNT_INFO_ERROR_",
                    response: null,
                });
            }
        })
        .catch((error) => {
            console.log(error);
            

            dispatch({
                type: "ACCOUNT_INFO_EXCEPTION_",
                response: "User account is not authenticated",
            });
        })
    }
}
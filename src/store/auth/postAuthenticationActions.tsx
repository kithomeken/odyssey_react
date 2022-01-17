import axios from "axios";
import { Navigate } from "react-router";

import ApiServices from "../../api/ApiServices";

export const postAuthentication = (token: any) => {
    return async (dispatch: (argo: {type: string, response: any}) => void) => {
        dispatch({
            type: "POST_AUTH_LOADING_",
            response: null,
        });
        
        let apiDomain = ApiServices.apiDomain()
        apiDomain = apiDomain + `auth/account/agent/info`

        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }

        axios
        .get(`${apiDomain}`, authorizationBearer)
        .then((resp) => {
            if (resp.status === 200) {
                dispatch({
                    type: "POST_AUTH_DETAILS_",
                    response: resp.data,
                });
                
                return <Navigate to="/home" replace />
            } else {
                dispatch({
                    type: "POST_AUTH_INVALID_TOKEN_",
                    response: resp.data,
                });
                
                return <Navigate to="/auth/sign-in" replace />
            }
        })
        .catch((error) => {
            dispatch({
                type: "POST_AUTH_CATCH_EXCEPTION_",
                response: "Agent not found",
            });

            <Navigate to="/auth/sign-in" replace />
        })
    }
}

export const postAuthenticationFailure = () => {
    
}
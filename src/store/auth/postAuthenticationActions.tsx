import axios from "axios";
import { Navigate } from "react-router";

export const postAuthentication = (token: any) => {
    return async (dispatch: (argo: {type: string, response: any}) => void) => {
        dispatch({
            type: "POST_AUTH_LOADING_",
            response: null,
        });
        
        const authorizationBearer = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }

        axios
        .get(`auth/account/agent/info`, authorizationBearer)
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
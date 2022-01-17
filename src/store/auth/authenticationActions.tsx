import axios from "axios"
import { useLocation } from "react-router";
import ApiServices from "../../api/ApiServices";

export const accountAuthentication = (email: string, password: string) => {
    return (dispatch: (arg0: { type: string; response: any; }) => void) => {      
        axios
        .post(ApiServices.signInApi(), { email, password })
        .then((apiResponse) => {
            console.log(apiResponse.data)

            if (apiResponse.data.status === 403) {
                dispatch({
                    type: "AUTHENTICATION_FAILED_CREDENTIALS_",
                    response: apiResponse.data,
                });
            } else {
                dispatch({
                    type: "AUTHENTICATION_",
                    response: apiResponse.data,
                });
            }
        })
        .catch((error) => {
            console.log(error.response)

            dispatch({
                type: "AUTHENTICATION_CATCH_EXCEPTION_",
                response: "No response. Error while signing in",
            });
        });
    };
};


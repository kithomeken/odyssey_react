import axios from "axios";

import { AUTHENTICATED_ACCOUNT_SIGN_OUT } from "../../api/ApiRegistry";

export const accountSignOutActions = () => {
    return (dispatch: (arg0: { type: string; response: any; }) => void) => {
        dispatch({
            type: "ACCOUNT_SIGN_OUT_PROCESSING_",
            response: null,
        });

        dispatch({
            type: "ACCOUNT_SIGNED_OUT_",
            response: null,
        });

        invalidateSanctumToken(dispatch)
    }
}

export const specialAccountSignOutAction = () => {
    return (dispatch: (arg0: { type: string; response: any; }) => void) => {
        dispatch({
            type: "ACCOUNT_SIGN_OUT_PROCESSING_",
            response: null,
        });

        dispatch({
            type: "SPECIAL_ACCOUNT_SIGNED_OUT_",
            response: null,
        });
        
        invalidateSanctumToken(dispatch)
    }
}

function invalidateSanctumToken(dispatch: any) {
    axios
        .post(AUTHENTICATED_ACCOUNT_SIGN_OUT, null)
        .then((response) => {
            dispatch({
                type: "ACCOUNT_SIGNED_OUT_",
                response: response.data,
            });
        })
        .catch((error) => {
            dispatch({
                type: "ACCOUNT_SIGN_OUT_EXCEPTION_",
                response: "Error occured when signing out",
            });
        });
}
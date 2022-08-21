import axios from "axios";

import Crypto from "../../encryption/Crypto";
import { SIGN_IN_API_SUFFIX } from "../../api/ApiRegistry";

interface Props {
    auto: false,
    urlParams?: any,
    credentials?: any,
    locationState?: any,
}

export function accountAuthenticationActions(propsIn: Props) {
    return (dispatch: (arg0: { type: string; response: any; }) => void) => {
        const props = { ...propsIn }

        if (props.auto) {
            /*
             * Auto account authentication
             * When an invitation has been accepted
             * And the account has been verfied
            */

            // Verify data to be used in auto sign in
            const locationState = props.locationState
            const urlParams = props.urlParams

            if (locationState === null || locationState === undefined) {
                dispatch({
                    type: "DATA_INTEGRITY_COMPROMISED_",
                    response: {
                        'redirect': true
                    }
                })
            } else {
                const decryptedEmailAddr = Crypto.decryptDataUsingAES256(urlParams.auid)

                if (locationState.email !== decryptedEmailAddr) {
                    dispatch({
                        type: "DATA_INTEGRITY_COMPROMISED_",
                        response: null,
                    })
                } else {
                    /*
                     * Data integrity is maintained, meaning that
                     * Auto authentication process flows from acceptance
                     * Of the invitation sent to user
                    */
                    dispatch({
                        type: "ACCOUNT_AUTHENTICATION_PENDING_",
                        response: null,
                    });

                    let formData = new FormData
                    formData.append("email", locationState.email)
                    formData.append("password", locationState.password)

                    accountSignIn(formData, dispatch)
                }
            }
        } else {
            /* 
             * Standard account authentication method 
             * Of inputing email and password by the
             * Account holder
            */
            dispatch({
                type: "ACCOUNT_AUTHENTICATION_PENDING_",
                response: {
                    redirect: false,
                },
            });

            let formData = new FormData
            formData.append("email", props.credentials.email)
            formData.append("password", props.credentials.password)

            accountSignIn(formData, dispatch)
        }
    }
}

function accountSignIn(formData: any, dispatch: any) {
    axios
        .post(SIGN_IN_API_SUFFIX, formData)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "ACCOUNT_AUTHENTICATION_COMPLETED_",
                    response: response.data.payload,
                });
            } else {
                dispatch({
                    type: "ACCOUNT_AUTHENTICATION_FAILED_",
                    response: response.data.error,
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: "ACCOUNT_AUTHENTICATION_RUNTIME_EXCEPTION_",
                response: "Error occured while signing in account",
            });
        });
}
import axios from "axios"
import Crypto from "../../encryption/Crypto"
import { SIGN_IN_API_SUFFIX } from "../../api/ApiRegistry"

export const postInvitationAuthActions = (locationState: any, urlParams: any) => {
    return (dispatch: (arg0: {type: string, response: any}) => void) => {
        // Data verification
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
                    response: {
                        'redirect': true
                    }
                })
            } else {
                // Data integrity is maintained
                // Proceed and auto sign in
                dispatch({
                    type: "AUTO_AUTH_PENDING_",
                    response: {
                        'redirect': false
                    }
                })

                let formData = new FormData
                formData.append("email", locationState.email)
                formData.append("password", locationState.password)

                axios
                .post(SIGN_IN_API_SUFFIX, formData)
                .then((response) => {
                    if (response.data.success) {
                        dispatch({
                            type: "AUTO_AUTH_COMPLETED_",
                            response: response.data.payload,
                        });
                    } else {
                        dispatch({
                            type: "AUTO_AUTH_FAILED_",
                            response: response.data.error,
                        });
                    }
                })
                .catch((error) => {
                    console.log('Error occured while auto signing in')

                    dispatch({
                        type: "AUTO_AUTH_EXCEPTION_",
                        response: "Error occured while auto signing in",
                    });
                });
            }
        }
    }
}
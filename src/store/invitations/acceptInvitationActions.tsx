import axios from "axios"

export const acceptInvitationActions = (input: any, email: any, encodedEndpointApi: string) => {
    return (dispatch: (arg0: {type: string, response: any}) => void) => {
        dispatch({
            type: "ACCEPTING_INVITE",
            response: null
        })

        const decodedEndpointApi = decodeURIComponent(encodedEndpointApi)
        let formData = new FormData
        formData.append("first_name", input.first_name)
        formData.append("last_name", input.last_name)
        formData.append("password", input.password)
        
        axios
        .post(decodedEndpointApi, formData)
        .then((response) => {
            if (response.data.success) {
                const postVerificationResponse = {
                    'email': email,
                    'payload': response.data,
                    'password': input.password,
                }

                dispatch({
                    type: "INVITATION_ACCEPTED",
                    response: postVerificationResponse
                })
            } else {
                dispatch({
                    type: "INVITATION_ACCEPTANCE_FAILED",
                    response: response.data
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: "INVITATION_EXCEPTION_ERROR",
                response: "Error while posting the invitation acceptance",
            });
        })
    }
}
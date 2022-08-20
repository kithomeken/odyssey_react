import axios from "axios"

export const acceptInvitationActions = (input: any, encodedEndpointApi: string) => {
    return (dispatch: (arg0: {type: string, response: any}) => void) => {
        dispatch({
            type: "ACCOUNT_VERIFICATION_PENDING_",
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
                dispatch({
                    type: "ACCOUNT_VERIFICATION_COMPLETED_",
                    response: response.data
                })
            } else {
                dispatch({
                    type: "ACCOUNT_VERIFICATION_FAILED_",
                    response: response.data
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: "ACCOUNT_VERIFICATION_EXCEPTION_",
                response: "Error while posting the invitation acceptance",
            });
        })
    }
}
import axios from "axios"

export const checkInvitationsActions = (encodedEndpointApi: any) => {
    return (dispatch: (arg0: {type: string, response: any}) => void) => {
        const decodedEndpointApi = decodeURIComponent(encodedEndpointApi)
        
        axios
        .get(decodedEndpointApi)
        .then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "INVITATION_IS_VALID",
                    response: response.data
                })
            } else {
                dispatch({
                    type: "INVITATION_IS_NOT_VALID",
                    response: response.data
                })
            }
        })
        .catch((error) => {
            dispatch({
                type: "INVITATION_EXCEPTION_ERROR",
                response: "Error while checking invitation link status",
            });
        })
    }
}
import axios from "axios"

interface Props {
    input?: any,
    action: any,
    encodedEndPoint: any,
}

export const invitationActions = (propsIn: Props) => {
    return (dispatch: (arg0: {type: string, response: any}) => void) => {
        const props = {...propsIn}
        const decodedEndpointApi = decodeURIComponent(props.encodedEndPoint)
        
        if (props.action === 'checking') {
            /* 
             * Checking validity of invitation link 
             * before allowing user to finish account setup
            */

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
        } else {
            /* 
             * Acceptance of the invitation, account
             * verification and final account setup
            */

            dispatch({
                type: "ACCOUNT_VERIFICATION_PENDING_",
                response: null
            })

            let formData = new FormData
            formData.append("first_name", props.input.first_name)
            formData.append("last_name", props.input.last_name)
            formData.append("password", props.input.password)

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
}
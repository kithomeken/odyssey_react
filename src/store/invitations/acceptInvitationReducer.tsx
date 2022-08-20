import { postVerificationAuthAction } from "./postVerificationAuthAction"

const initialState = {
    response: null,
    isPostingInvite: true,
    acceptedInvitation: false 
}

export const acceptInvitationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ACCOUNT_VERIFICATION_PENDING_':
            return {
                ...initialState,
                response: null,
                isPostingInvite: true,
                acceptedInvitation: false 
            }
        
        case 'ACCOUNT_VERIFICATION_COMPLETED_':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                acceptedInvitation: true 
            }
        
        case 'ACCOUNT_VERIFICATION_FAILED_':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                acceptedInvitation: false 
            }
    
        case 'ACCOUNT_VERIFICATION_EXCEPTION_':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                acceptedInvitation: false 
            }

        default:
            return state
    }
}

function dispatch(arg0: (dispatch: (arg0: { type: string; response: any }) => void) => void) {
    throw new Error("Function not implemented.")
}

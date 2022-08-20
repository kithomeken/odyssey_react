import { postVerificationAuthAction } from "./postVerificationAuthAction"

const initialState = {
    response: null,
    isPostingInvite: true,
    acceptedInvitation: false 
}

export const acceptInvitationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ACCEPTING_INVITE':
            return {
                ...initialState,
                response: null,
                isPostingInvite: true,
                acceptedInvitation: false 
            }
        
        case 'INVITATION_IS_VALID':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                acceptedInvitation: true 
            }
        
        case 'INVITATION_IS_NOT_VALID':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                acceptedInvitation: false 
            }
    
        case 'INVITATION_EXCEPTION_ERROR':
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

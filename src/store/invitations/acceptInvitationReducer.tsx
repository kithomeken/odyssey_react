const initialState = {
    response: null,
    isPostingInvite: false,
    authenticate: false 
}

export const acceptInvitationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'ACCOUNT_VERIFICATION_PENDING_':
            return {
                ...initialState,
                response: null,
                authenticate: false,
                isPostingInvite: true,
            }
        
        case 'ACCOUNT_VERIFICATION_COMPLETED_':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                authenticate: true,
            }
        
        case 'ACCOUNT_VERIFICATION_FAILED_':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                authenticate: false,
            }
    
        case 'ACCOUNT_VERIFICATION_EXCEPTION_':
            return {
                ...initialState,
                response: action.response,
                isPostingInvite: false,
                authenticate: false,
            }

        default:
            return state
    }
}

function dispatch(arg0: (dispatch: (arg0: { type: string; response: any }) => void) => void) {
    throw new Error("Function not implemented.")
}

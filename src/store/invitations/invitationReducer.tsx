const initialState = {
    valid: false,
    response: null,
    verified: false,
    processing: true,
}

const invitationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'INVITATION_IS_VALID':
            /* 
             * Save password policies on session
             * or local storage for cleaner redux state
            */

            return {
                ...initialState,
                response: action.response,
                processing: false,
                valid: true,
            }

        case 'INVITATION_IS_NOT_VALID':
            return {
                ...initialState,
                processing: false,
                response: null,
                valid: false,
            }

        case 'INVITATION_EXCEPTION_ERROR':
            return {
                ...initialState,
                processing: false,
                valid: false,
                response: 'Unauthorised Access',
            }
    
        case 'ACCOUNT_VERIFICATION_PENDING_':
            return {
                ...initialState,
                processing: true,
                response: null,
                valid: true,
            }
        
        case 'ACCOUNT_VERIFICATION_COMPLETED_':
            return {
                ...initialState,
                response: action.response,
                processing: false,
                verified: true,
                valid: true,
            }
        
        case 'ACCOUNT_VERIFICATION_FAILED_':
        case 'ACCOUNT_VERIFICATION_EXCEPTION_':
            return {
                ...initialState,
                response: 'Unauthorized Access',
                processing: false,
                valid: false,
            }

        default:
            return state
    }
}

export default invitationReducer
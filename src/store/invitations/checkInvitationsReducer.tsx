import { APPLICATION_NAME } from "../../global/ConstantsRegistry"

const initialState = {
    loading: true,
    response: null,
    title: 'Welcome to ' + APPLICATION_NAME,
    isInvitationValid: false 
}

const checkInvitationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'INVITATION_IS_VALID':
            return {
                ...initialState,
                loading: false,
                isInvitationValid: true,
                response: action.response,
            }
        
        case 'INVITATION_IS_NOT_VALID':
            return {
                ...initialState,
                loading: false,
                isInvitationValid: false,
                response: action.response,
                title: 'Unauthorised Access',
            }
    
        case 'INVITATION_EXCEPTION_ERROR':
            return {
                ...initialState,
                loading: false,
                isInvitationValid: false,
                response: action.response,
                title: 'Unauthorised Access',
            }

        default:
            return state
    }
}

export default checkInvitationsReducer
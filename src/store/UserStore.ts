const initializeActivityState = {
    currentUser: {}
}

const userState = (state = initializeActivityState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'USER_SET':
            return {...state, currentUser: action.payload}

        case "USER_GET":
            return state.currentUser
    
        default:
            return state
    }
}

export default userState
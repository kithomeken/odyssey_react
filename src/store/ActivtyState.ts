const initializeActivityState = {
    activties: []
}

const activityState = (state = initializeActivityState, action: {type: any; payload: any}) => {
    switch (action.type) {
        case 'ACTIIVITIES_SET':
            return {...state, activities: action.payload}
            
        case 'ACTIVITIES_GET':
            return state.activties

        default:
            return state
    }
}

export default activityState
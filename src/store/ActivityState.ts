const initializeActivityState = {
    activities: []
}

const activityState = (state = initializeActivityState, action) => {
    switch (action.type) {
        case 'ACTIIVITIES_SET':
            return {...state, activities: action.payload}

        case 'ACTIVITIES_GET':
            return state.activities
    
        default:
            return state;
    }
}

export default activityState
const initialState = {
    from: '',
    currentpage: '',
}

const locationRecuder = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TO_FROM_LOCATION_ROUTING_':
            const currentpage = action.payload.pathname
            const frompage = state.currentpage

            return {
                ...initialState,
                from: frompage,
                currentpage: currentpage
            }
    
        default:
            return state
    }
}

export default locationRecuder
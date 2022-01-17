export const locationActions = (location: any) => {
    return (dispatch: (arg0: {type: string; payload: any}) => void) => {
        console.log(location)

        dispatch({
            type: "TO_FROM_LOCATION_ROUTING_",
            payload: location,
        });
    }
}
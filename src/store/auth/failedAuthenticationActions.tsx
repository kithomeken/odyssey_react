export const failedAuthentication = () => {
    return async (dispatch: (arg0: {type: any}) => void) => {
        dispatch({
            type: 'REVOKE_AUTH_ACCESS_'
        })
    }
}
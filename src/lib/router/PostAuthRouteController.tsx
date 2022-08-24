import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

export default function PostAuthRouteController() {
    const authenticationState = useAppSelector(state => state.auth)

    if (authenticationState.isAuthenticated) {
        /* Check if account details are present */
        if (authenticationState.accountName !== null && authenticationState.accountName !== undefined) {
            /* Redirect to home */
            return <Navigate to="/home" replace />;
        }
    } else {
        /* Redirect to sign in */
        return <Navigate replace to="/auth/sign-in" />
    }
    
    return (
        <Outlet />
    )
}
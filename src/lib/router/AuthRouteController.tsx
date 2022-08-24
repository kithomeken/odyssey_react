import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../store/hooks";
import { postAuthRoute } from "../../routes/auth/protectedRoutes";

export default function AuthRouteController() {
    const authenticationState = useAppSelector(state => state.auth)

    if (authenticationState.isAuthenticated) {
        const POST_AUTH_RT: any = (postAuthRoute.find((routeName) => routeName.name === 'POST_AUTH_'))?.path
        const redirectRoute = POST_AUTH_RT + '?auid=' + authenticationState.uaid
        
        return <Navigate replace to={redirectRoute} />;
    }

    return (
        <Outlet />
    )
}
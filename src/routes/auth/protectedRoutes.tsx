import Home from "../../pages/home/Home";
import FromIndexToHome from "../../lib/redirects/FromIndexToHome";
import { PostAuthentication } from "../../pages/auth/PostAuthentication";

interface ProtectedRouteInterface {
    name: string,
    path: string;
    element: any;
    activeMenu: any,
    caseSensitive?: boolean;
}

export const protectedRoutes: Array<ProtectedRouteInterface> = [
    { path: "/home", element: <Home />, activeMenu: 'Y', caseSensitive: true, name: 'HOME_' },
    { path: "/", element: <FromIndexToHome />, activeMenu: 'N', caseSensitive: true, name: 'INDEX_' },
]

export const postAuthRoute: Array<ProtectedRouteInterface> = [
    { path: "/post-auth/account/access", element: <PostAuthentication />, activeMenu: 'N', caseSensitive: true, name: 'POST_AUTH_' },
]